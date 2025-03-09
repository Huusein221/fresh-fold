import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {
  userGetController,
  usersPostController,
} from './Controlles/userscontroller.js'
import {
  ordersPostController,
  ordersGetController,
} from './Controlles/orderscontroller.js'
import { postServiceController } from './Controlles/servicecontroller.js'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.post('/user', usersPostController)
app.get('/user', userGetController)
app.post('/order', ordersPostController)
app.get('/order', ordersGetController)
app.post('/service', postServiceController)

export default app

// {
//     "user": {
//       "id": 1,
//       "username": "Hussein",
//       "address": "Barcelona",
//       "order": {
//         "id": 1,
//         "serviceType": "Wash",
//         "status": "pending",
//         "pickUpTime": "2025-05-21",
//         "deliveryTime": "2025-05-21"
//       }
//     }
//   }
