"use client"

import Link from "next/link";

const Order = ({order}: any) => {

  return (
    <div className="flex items-center bg-white justify-between px-4 py-2 border-2 border-black rounded-xl">
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-xl">
          {order.name}
        </span>
        <div className="flex gap-4">
          <div>
            <span className="font-semibold">Откуда:</span> {order.startX}, {order.startY}
          </div>
          <div>
            <span className="font-semibold">Куда:</span> {order.endX}, {order.endY}
          </div>
        </div>
      </div>
      <Link
        href={`/orders/${order.id}`} 
        className="px-4 py-2 border-2 rounded-xl border-black hover:bg-black hover:text-white duration-300 cursor-pointer"
      >
        Взять заказ
      </Link>
    </div>
  );
}
 
export default Order;