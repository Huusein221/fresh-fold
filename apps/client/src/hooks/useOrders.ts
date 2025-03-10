import { useState, useEffect, useCallback } from "react";

export interface Order {
  id: number;
  status: string;
  serviceType: string;
  pickUpDateTime: Date;
  deliveryDateTime: Date;
}

const OrdersApi = {
  async getOrders(): Promise<Order[]> {
    const response = await fetch(`http://localhost:3000/order`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data;
  },
  async postOrder(
    serviceType: string,
    pickUpDateTime: Date,
    deliveryDateTime: Date
  ): Promise<Order> {
    const response = await fetch(`http://localhost:3000/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceType,
        pickUpDateTime: pickUpDateTime.toISOString(),
        deliveryDateTime: deliveryDateTime.toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    const data = await response.json();
    return data;
  },
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    try {
      const fetchedOrders = await OrdersApi.getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error in fetchOrders", error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const addOrder = useCallback(
    async (
      serviceType: string,
      pickUpDateTime: Date,
      deliveryDateTime: Date
    ) => {
      try {
        await OrdersApi.postOrder(
          serviceType,
          pickUpDateTime,
          deliveryDateTime
        );
        await fetchOrders();
      } catch (error) {
        console.error("Error in addOrder", error);
      }
    },
    [fetchOrders]
  );

  return { orders, addOrder };
}
