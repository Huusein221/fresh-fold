import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function userGetModel() {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    console.error('Error in userGetModel', error)
  }
}
export async function userPostModel(username: string, address: string) {
  try {
    const users = await prisma.user.create({
      data: {
        username,
        address,
      },
    })
    return users
  } catch (error) {
    console.error('Error in userPostModel', error)
  }
}
