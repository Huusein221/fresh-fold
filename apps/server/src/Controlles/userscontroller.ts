import { userGetModel, userPostModel } from '../Models/usersmodel'
import { Request, Response } from 'express'
export async function usersPostController(req: Request, res: Response) {
  const { username, address } = req.body
  if (!username || !address) {
    res.status(400).json({ error: 'Missing username or address' })
  }
  if (username.length > 20) {
    res.status(400).json({ error: 'Username too long' })
  }
  try {
    const users = await userPostModel(username, address)
    if (users) {
      res
        .status(201)
        .json({ message: 'user created successfully', user: users })
    } else {
      res.status(400).json({ error: 'Something went wrong' })
    }
  } catch (error) {
    console.error('Error in usersPostController', error)
  }
}

export async function userGetController(req: Request, res: Response) {
  try {
    const users = await userGetModel()

    res.status(200).json(users)
  } catch (error) {
    console.error('Error in userGetController', error)
  }
}
