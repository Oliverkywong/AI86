import { userService } from '../services/userService';
import { Request, Response } from 'express';
import { logger } from '../util/logger'
import path from 'path';
import fs from 'fs';

export class userController {
	constructor(private userservice: userService) { }

	login = async (req: Request, res: Response) => {
		try {
			let email = req.body.email.trim()
			let password = req.body.password.trim()
			const userlist = await this.userservice.userLogin(email, password)

			if (userlist == 1) {
				res.json({ login: false, result: ['email incorrect'] })
			} else if (userlist == 2) {
				res.json({ login: false, result: ['password incorrect'] })
			} else {
				req.session['isLogin'] = true
				req.session['player_id'] = userlist[0].player_id
				req.session['name'] = userlist[0].name
				req.session['users_id'] = userlist[0].id
				req.session['email'] = userlist[0].email

				res.json({ login: true, result: ['login success'] })
			}
		} catch (err) {
			logger.error(err)
			res.status(500).json('Internal Server Error')
		}
	}

	register = async (req: Request, res: Response) => {
		try {
			let name = req.body.name.trim()
			let email = req.body.email.trim()
			let password = req.body.password.trim()
			const file = path.join('trainAI', `${name}.json`)
			fs.mkdirSync('trainAI', { recursive: true })
			if (!fs.existsSync(file)) {
				fs.writeFileSync(file, '[]')
			}
			const sigup = await this.userservice.userRegister(name, email, password)
			if (sigup) {
				res.json({ register: true, result: ['register success'] })
			} else {
				res.json({ register: false, result: ['Email already registered'] })
			}
		} catch (err) {
			logger.error(err)
			res.status(500).json('Internal Server Error')
		}
	}
	
	getInfo = async(req: Request, res: Response) => {
		try {
			let userID = req.session['player_id'];
			let userName = req.session['name'];
			let email = req.session['email'];
			const userInfo = { userID, userName, email };
			return res.status(200).json(userInfo)
		} catch (err) {
			logger.error(err);
			res.status(500).json('Internal Server Error')
			return
		}
	}

    logout = async (req:Request, res:Response) => {
		req.session['isLogin'] = false;
	    res.redirect('/');
    }
}