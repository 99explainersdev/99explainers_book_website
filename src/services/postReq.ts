//Step : 2 (Client side post is 1, api/v1/whatever route is 3 for business logic)

import { Order } from "@/types";


export const postOrder = async (newOrder: Order) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/v1/order`,
    {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
