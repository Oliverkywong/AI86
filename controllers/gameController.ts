import { gameService } from '../services/gameService';
import { Request , Response } from 'express';
import { logger } from '../util/logger'
import { form } from '../util/middlewares';

export class gameController{
    constructor( private gameService: gameService){}

	// Leader Board
    ranking = async (req: Request, res: Response) => {
    	try {
    		const rankingList = await this.gameService.gameRanking();
    		if (rankingList) {
                // console.log(rankingList);
                res.status(200).json(rankingList);
    		} else {
    			res.json({ status: "fail", result: ['error fail'] });
    		}
    	} catch (err) {
    		logger.error(err);
    		res.status(500).json('Internal Server Error');
    	}
    }

	// Current owned car data
	showCar = async (req: Request, res: Response) => {
		// console.log('hi');
		// let jsonData = {};
		try {
			let usersID = req.session['users_id']
			// console.log(usersID);
			const showCarList = await this.gameService.gameShowCar(usersID);
			if (showCarList) {
				// jsonData = showCarList;
				// console.log(jsonData);
				res.status(200).json(showCarList);
			} else {
				// return false;
				res.json({ status: "fail", result: ['error fail'] });
			}
		} catch (err) {
			logger.error(err);
			// return false;
			res.status(500).json('Internal Server Error');
		}
	}

	// Create Car
	createCar = async(req: Request, res: Response) => {
		try {
			form.parse(req, async(err, fields) => {
				let model = fields.model.toString();
				let color = fields.color.toString();
				let email = req.session['email'];
				let usersID = req.session['users_id'];
				// console.log("fields: ", fields);
				// console.log("Create Car model: ", model);
				// console.log("Create Car color: ", color);
				console.log("Create Car email: ", email);
				console.log("Create Car usersID: ", usersID);
				const create = await this.gameService.gameCreateCar(model, color, email, usersID);
				if (create !==null && true) {
					res.json({ createCar: true, result: ['Create car successfully']})
				} else {
					res.json({ createCar: false, result: ['Create car fail']});
				}
			})
		} catch (err) {
			logger.error(err);
			res.status(500).json('Internal Server Error')
		}
	}

	// Select Car
	selectCar = async(req: Request, res: Response) => {
		try {
			let carID = req.session['car_id'];
			const select = await this.gameService.gameSelectCar(carID);
			console.log(select);
		} catch (err) {
			logger.error(err);
			res.status(500).json('Internal Server Error')
		}
	}
}