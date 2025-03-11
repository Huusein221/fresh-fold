import { PrismaClient, Type } from '@prisma/client'
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
  try {
    const orders = await prisma.order.create({
      data: {
        serviceType: data.serviceType,
        status: 'pending',
        user: {
          connect: { id: data.userId },
        },
        pickupDateTime: data.pickupDateTime,
        deliveryDateTime: data.deliveryDateTime,
      },
    })
    return orders
  } catch (error) {
    console.error('Error in orderPostModel', error)
  }
}
