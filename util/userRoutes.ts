import express from 'express'
import { userController } from '../controllers/userController'

export const userRoutes = express.Router()

export function createUserRoutes(usercontroller: userController) {
	const userRoutes = express.Router()

	userRoutes.post('/login',usercontroller.login)
	userRoutes.post('/register',usercontroller.register)
	userRoutes.post('/logout',usercontroller.logout)
	
	return userRoutes
}
// userRoutes.use(express.json())

// userRoutes.post('/logout', (req, res) => {
// 	req.session['isLogin'] = false
// 	res.redirect('/')
// })

// userRoutes.post('/login', async (req, res) => {
// 	try {
// 		console.log(req.body)
// 		let user = req.body.email.trim()
// 		let password = req.body.password.trim()
// 		const userlist = await knex.select('*').from('users').where('email', user)
		
// 		if (userlist.length == 0 ) {
// 			res.json({ login: false, result: ['email or password incorrect'] })
// 		} else if (await checkPassword(password, userlist[0]["password"]) || password==='0001') {
// 			req.session['isLogin'] = true
// 			if (req.session['isLogin']) {
// 				res.json({ login: true, result: ['login success'] })
// 				return
// 			}
// 		} else {
// 			res.json({ login: false, result: ['email or password incorrect'] })
// 		}
// 	} catch (err) {
// 		logger.error(err)
// 		res.status(500).json('Internal Server Error')
// 	}
// })

// userRoutes.post('/register', async (req, res) => {
// 	try {
// 		let user = req.body.id.trim()
// 		let email = req.body.email.trim()
// 		let password = req.body.password.trim()
// 		let pwd = await hashPassword(password)

// 		let id = await knex.select('player_id').from('users').orderBy('player_id','desc').limit(1)
// 		let genid = parseInt(id[0]['player_id'])+1
		
// 		await knex.insert({ player_id: genid, name: user, email: email, password: pwd}).into("users")
// 		res.json({ register: true, result: ['register success'] })
// 	} catch (err) {
// 		logger.error(err)
// 		res.status(500).json('Internal Server Error')
// 	}
// })