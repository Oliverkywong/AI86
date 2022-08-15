import { gameService } from '../services/gameService';
import { Request , Response } from 'express';
import { logger } from '../util/logger'

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
		let jsonData = {};
		// try {
			let usersID = req.session['users_id']
			// console.log(usersID);
			const showCarList = await this.gameService.gameShowCar(usersID);
			if (showCarList) {
				jsonData = showCarList;
				console.log(jsonData);
				res.status(200).json(jsonData);
			} else {
				// return false;
				res.json({ status: "fail", result: ['error fail'] });
			}
		// } catch (err) {
		// 	logger.error(err);
		// 	// return false;
		// 	res.status(500).json('Internal Server Error');
		// }
	}

	// Create Car
	createCar = async(req: Request, res: Response) => {
		try {

			let model = req.body.model;
			let color = req.body.color;
			let email = req.session['email'];
			let usersID = req.session['users_id'];
		
			const create = await this.gameService.gameCreateCar(model, color, email, usersID);
			// console.log('create result', JSON.stringify(create))
			if (create !== null) {
				res.json({ createCar: true, result: ['Create car successfully']});
				// res.send(req.body)
			} else {

				res.json({ createCar: false, result: ['Create car fail']});
			}

		} catch (err) {
			logger.error(err);
			res.status(500).json('Internal Server Error');
		}
	}
}