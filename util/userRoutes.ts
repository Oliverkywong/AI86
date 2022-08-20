import express from 'express'
import { userController } from '../controllers/userController'

export const userRoutes = express.Router()

export function createUserRoutes(usercontroller: userController) {
	const userRoutes = express.Router()

	userRoutes.post('/login',usercontroller.login)
	userRoutes.post('/register',usercontroller.register)
	userRoutes.get('/logout',usercontroller.logout)
	userRoutes.get('/user/getInfo', usercontroller.getInfo)
	
	return userRoutes
}
