import { userService } from '../services/userService';
import { Request,Response } from 'express';
import { logger } from '../util/logger'

export class userController{
    constructor( private userservice: userService){}

    login = async (req:Request, res:Response) => {
    	try {
    		let email = req.body.email.trim()
    		let password = req.body.password.trim()
    		const userlist = await this.userservice.userLogin(email,password)
			// console.log(userlist[0].email, userlist[0].id)
        
    		if (userlist == 1) {
    			res.json({ login: false, result: ['email incorrect'] })
    		}else if (userlist == 2){
                res.json({ login: false, result: ['password incorrect'] })
            }else {
                req.session['isLogin'] = true
                req.session['player_id'] = userlist[0].player_id
                req.session['name'] = userlist[0].name
				// console.log('user id: ',userlist[0].id)
				req.session['users_id'] = userlist[0].id
				// console.log('user ID:', userlist[0].id)
				req.session['email'] = userlist[0].email
				console.log('Session info ' + JSON.stringify(req.session))

    			res.json({ login: true, result: ['login success'] })
    		}
    	} catch (err) {
    		logger.error(err)
    		res.status(500).json('Internal Server Error')
    	}
    }

    register = async (req:Request, res:Response) => {
    	try {
    		let name = req.body.name.trim()
    		let email = req.body.email.trim()
    		let password = req.body.password.trim()
            const sigup = await this.userservice.userRegister(name, email, password)
            if(sigup){
    		    res.json({ register: true, result: ['register success'] })
            }else{
    		    res.json({ register: false, result: ['Email already registered'] })
            }
    	} catch (err) {
    		logger.error(err)
    		res.status(500).json('Internal Server Error')
    	}
    }

    logout = async (req:Request, res:Response) => {
	    req.session.destroy;
		req.session['isLogin'] = false;
		// console.log(req.session['isLogin'])

	    res.redirect('/');
    }
}