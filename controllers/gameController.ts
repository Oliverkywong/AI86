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
				// console.log("Create Car email: ", email);
				// console.log("Create Car usersID: ", usersID);
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
			await this.gameService.gameSelectCar(carID);
			// const select = await this.gameService.gameSelectCar(carID);
			// console.log(select);
		} catch (err) {
			logger.error(err);
			res.status(500).json('Internal Server Error')
		}
	}

	inputranking = async (req: Request, res: Response) => {
		try {
		  let time = req.body[1]
		  let playerid = req.session['player_id']
		  let name = req.session['name']
		  let carid = req.session['car_id']
		  let map = `map${req.body[0]}`
		  const input = await this.gameService.inputranking(time, playerid, carid, map,name);
		  if (input) {
			res.json({ inputranking: true, result: ['Input ranking successfully']})
		  } else {  
			res.json({ inputranking: false, result: ['Input ranking fail']}); 
		}
		} catch (err) {
		  logger.error(err)
		  res.status(500).json('Internal Server Error')
		}
	  }

	  getaicar = async (req: Request, res: Response) => {
		try {
			let name = req.session['name']
			const readaicar = await this.gameService.readaicar(name, 'trainAI');
			res.send(readaicar);
		  } catch (err) {
			logger.error(err)
			res.status(500).json('Internal Server Error')
		  }
	  }

	  saveaicar = async (req: Request, res: Response) => {
		try {
			let name = req.session['name']
			let bestAI =  JSON.parse(await this.gameService.readaicar(name, 'trainAI'))

			if (bestAI.length != 0) {
			  for (const ai of bestAI) {
				if (ai[0] == req.body[0]) {
				  bestAI.splice(bestAI.indexOf(ai), 1, req.body)
				  await this.gameService.writeaicar(name, bestAI, 'trainAI');
				  return
				} else {
				  bestAI.push(req.body)
				  await this.gameService.writeaicar(name, bestAI, 'trainAI');
				  return
				}
			  }
			} else {
			  bestAI.push(req.body);
			  await this.gameService.writeaicar(name, bestAI, 'trainAI');
			}
		  } catch (err) {
			logger.error(err)
			res.status(500).json('Internal Server Error')
		  }
	  }
}