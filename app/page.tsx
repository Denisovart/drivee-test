import Order from "@/components/Order"
import { IOrder } from "@/interfaces/order"

const getOrders = async() => {
  
  const res = await fetch("http://127.0.0.1:8090/api/collections/orders/records", {cache: "no-store"})
  const data = await res.json()

  return data
}

const HomePage = async() => {

  const orders = await getOrders()

  return(
    <div className="container items-center flex flex-col">
      <div className="my-9 text-2xl font-semibold text-center">Список заказов</div>
      <div className="rounded-xl lg:w-2/3 w-full flex flex-col gap-2">
        {
          orders.items.map((order: IOrder) => {
            return <Order key={order.id} order={order}/>
          })
        }
      </div>
    </div>
  )
}

export default HomePage;
