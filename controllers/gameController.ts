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
		try {
			let usersID = req.session['users_id']
			const showCarList = await this.gameService.gameShowCar(usersID);
			if (showCarList) {
				res.status(200).json(showCarList);
			} else {
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
				const create = await this.gameService.gameCreateCar(model, color, email, usersID);
				if (create == 1) {
					res.status(200).json('Create car successfully')
				} else if (create == 2) {
					res.status(200).json('You cannot own more car!!');
				} else {
					res.status(200).json('Create car failed')
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
			const { car_id }= req.body
			console.log("car id:",car_id);
			const currentUserID = req.session['users_id'];
			let result =await this.gameService.gameSelectCar(car_id,currentUserID)
			req.session['car_id'] = result.car_id;
			req.session['model'] = result.model;
			req.session['color'] = result.color;
			res.json("selected success")
		} catch (err) {
			logger.error(err);
			res.status(500).json('Internal Server Error')
		}
	}

	// Get selected Car
	selectedCar = async(req: Request, res: Response) => {
		try {
			let carID = req.session['car_id'];
			let carModel = req.session['model'];
			let carColor = req.session['color'];
			const selectedCar = { carID, carModel, carColor };
			return res.status(200).json(selectedCar);
		} catch (err) {
			logger.error(err);
			res.status(500).json('Internal Server Error')
			return
		}

	}
}