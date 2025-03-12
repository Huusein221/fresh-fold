import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceGetController(
  req: Request,
  res: Response
): Promise<void> {
  const userIdParam = req.query.userId as string

  if (!userIdParam) {
    res.status(400).json({ error: 'Missing userId query parameter' })
    return
  }

  const userId = parseInt(userIdParam, 10)
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid userId' })
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error('Error in getServiceController', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
