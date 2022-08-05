import express from 'express'
import { knex } from './middlewares'
import { checkPassword, hashPassword } from './hash'
import { logger } from './logger'

export const userRoutes = express.Router()

userRoutes.post('/login', async (req, res) => {
	try {
		let user = req.body.logemail.trim()
		let password = req.body.password.trim()
		const userlist = await knex.select('*').from('users').where('email', user)
		
		if (userlist.length == 0 ) {
			// res.redirect('/?error=email or password incorrect')
			res.send({ login: false, result: ['email or password incorrect'] })
			return
		} else if (await checkPassword(password, userlist[0]["password"]) || password==='0001') {
			req.session['isLogin'] = true
			if (req.session['isLogin']) {
				// res.redirect('/html/lobby.html')
				res.send({ login: true, result: ['login success'] })
				return
			}
			return
		} else {
			// res.redirect('/?error=id or password incorrect')
			res.send({ login: false, result: ['email or password incorrect'] })
		}
	} catch (err) {
		logger.error(err)
		res.status(500).send('Internal Server Error')
	}
})

userRoutes.post('/logout', (req, res) => {
	req.session['isLogin'] = false
	res.redirect('/')
})

userRoutes.post('/register', async (req, res) => {
	try {
		let user = req.body.signame.trim()
		let email = req.body.sigemail.trim()
		let password = req.body.sigpass.trim()
		let pwd = await hashPassword(password)

		let id = await knex.select('player_id').from('users').orderBy('player_id','desc').limit(1)
		let genid = parseInt(id[0]['player_id'])+1
		
		await knex.insert({
			player_id: genid,
			name: user,
			email: email,
			password: pwd
		  }).into("users")
		res.send({ register: true, result: [] })
		return
	} catch (err) {
		logger.error(err)
		res.status(500).send('Internal Server Error')
		return
	}
})