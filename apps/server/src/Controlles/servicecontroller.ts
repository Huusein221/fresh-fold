import { Request, Response } from 'express'
import { userPostModel } from '../Models/usersmodel'
import { ordersPostModel } from '../Models/ordersmodel'

export async function postServiceController(
  req: Request,
  res: Response
): Promise<void> {
  const {
    username,
    address,
    serviceType,
    status,
    pickUpDateTime,
    deliveryDateTime,
  } = req.body
  if (
    !username ||
    !address ||
    !serviceType ||
    !status ||
    !pickUpDateTime ||
    !deliveryDateTime
  ) {
    res.status(400).json({ error: 'Missing fields' })
  }
  try {
    const user = await userPostModel(username, address)
    if (!user) {
      res.status(400).json({ error: 'Failed to create user' })
    }
    const order = await ordersPostModel({
      serviceType,
      status,
      userId: user.id,
      pickupDateTime: new Date(pickUpDateTime),
      deliveryDateTime: new Date(deliveryDateTime),
    })

    if (!order) {
      res.status(400).json({ error: 'Failed to create order' })
    }
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        address: user.address,
        order: {
          id: order.id,
          serviceType: order.serviceType,
          status: order.status,
          pickUpTime: order.pickupDateTime,
          deliveryTime: order.deliveryDateTime,
        },
      },
    })
  } catch (error) {
    console.error('Error in postServiceController', error)
  }
}
