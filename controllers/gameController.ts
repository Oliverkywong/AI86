import { gameService } from '../services/gameService';
import { Request , Response } from 'express';
import { logger } from '../util/logger'


export class gameController{
    constructor( private gameService: gameService){}

	// Leader Board
    ranking = async (req:Request, res:Response) => {
    	try {
    		const rankingList = await this.gameService.gameRanking()
        
    		if (rankingList) {
                // console.log(rankingList);
                res.status(200).json(rankingList);
    		} else {
    			res.json({ status: "fail", result: ['error fail'] })
    		}
    	} catch (err) {
    		logger.error(err)
    		res.status(500).json('Internal Server Error')
    	}
    }
}