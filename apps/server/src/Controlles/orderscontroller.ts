import { Request, Response } from 'express'
import { ordersGetModel, ordersPostModel } from '../Models/ordersmodel'

export async function ordersGetController(req: Request, res: Response) {
  try {
    const orders = await ordersGetModel()
    res.status(200).json(orders)
  } catch (error) {
    console.error('Error in ordersGetController', error)
    res.status(500).json({ error: 'Failed due to internal server error' })
  }
}

export async function ordersPostController(
  req: Request,
  res: Response
): Promise<void> {
  const { serviceType, userId, pickupDateTime, deliveryDateTime } = req.body
  console.log('Request Body', req.body)
  try {
    const orders = await ordersPostModel({
      serviceType,
      userId,
      pickupDateTime,
      deliveryDateTime,
    })
    if (orders) {
      res.status(201).json({ message: 'Order created successfully' })
    } else {
      res.status(400).json({ error: 'Something went wrong' })
    }
  } catch (error) {
    console.error('Error in ordersPostController', error)
    res
      .status(500)
      .json({ error: 'Failed to create order due to internal server error' })
  }
}
