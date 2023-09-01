import { IOrder } from "@/interfaces/order";

async function getOrder(orderId: string) {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/orders/records/${orderId}`,{cache: "no-store"});
  const data: IOrder = await res.json();

  const res2 = await fetch("http://127.0.0.1:8090/api/collections/orders/records", {cache: "no-store"})
  const orders = await res2.json()

  const startZoneCenter = {
    x: (data.startX + data.endX) / 4,
    y: (data.startY + data.endY) / 4,
  }

  const driveLength = Math.sqrt((data.startX - data.endX) ** 2 + (data.startY - data.endY) ** 2)

  const startZoneRad = driveLength/4
  const endZoneRad = driveLength/2

  let candidates: IOrder[] = []

  orders.items.map((order: IOrder) => {

    if (order.id == data.id) {
      return
    }

    let startCheck = (order.startX - startZoneCenter.x) ** 2 + (order.startY - startZoneCenter.y) ** 2 <= startZoneRad ** 2
    let endCheck = (order.endX - data.endX) ** 2 + (order.endY - data.endY) ** 2 <= endZoneRad ** 2
    if(startCheck && endCheck) {
      candidates.push(order)
    }
  })

  return {data, candidates};
}

const OrderPage = async({params}: any) => {

  const order = await getOrder(params.id)

  console.log(order)

  return (
    <div className="container flex flex-col items-center">
      <div className="text-3xl font-semibold my-9">
        Заказ №{order.data.id}
      </div>
      <div className="bg-white rounded-xl px-7 py-4 w-full border-2 border-black">
        <div className="pb-4">
          <span className="font-semibold">Пассажир:</span> {order.data.name}
        </div>
        <div>
          <span className="font-semibold">Откуда:</span> {order.data.startX}, {order.data.startY}
        </div>
        <div>
          <span className="font-semibold">Куда:</span> {order.data.endX}, {order.data.endY}
        </div>
      </div>
      <div className="text-3xl font-semibold my-9">
        Возможные попутчики
      </div>
      {
        order.candidates.length > 0
          ? order.candidates.map((order) => (
            <div className="bg-white rounded-xl px-7 py-4 w-full border-2 border-black mb-4">
              <div className="pb-4">
                <span className="font-semibold">Пассажир:</span> {order.name}
              </div>
              <div>
                <span className="font-semibold">Откуда:</span> {order.startX}, {order.startY}
              </div>
              <div>
                <span className="font-semibold">Куда:</span> {order.endX}, {order.endY}
              </div>
            </div>
          ))
          : "Нет подходящих заказов"
      }
    </div>
  );
}
 
export default OrderPage;