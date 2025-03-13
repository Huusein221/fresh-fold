import { PrismaClient, Type } from '@prisma/client'
import moment from 'moment'
const prisma = new PrismaClient()

export async function ordersGetModel() {
  try {
    const orders = await prisma.order.findMany()
    return orders
  } catch (error) {
    console.error('Error in ordersGetModel', error)
  }
}
export async function ordersPostModel(data: {
  serviceType: Type
  userId: number
  pickupDateTime: any
  deliveryDateTime: any
}) {
  console.log(data)
  const formattedPickupDateTime = moment(data.pickupDateTime).toISOString()
  const formattedDeliveryDateTime = moment(data.deliveryDateTime).toISOString()

  try {
    const orders = await prisma.order.create({
      data: {
        serviceType: data.serviceType,
        status: 'pending',
        user: {
          connect: { id: data.userId },
        },
        pickupDateTime: formattedPickupDateTime,
        deliveryDateTime: formattedDeliveryDateTime,
      },
    })
    return orders
  } catch (error) {
    console.error('Error in orderPostModel', error)
  }
}
