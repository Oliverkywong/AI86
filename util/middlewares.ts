import Knex from "knex";
import dotenv from "dotenv";
import express from 'express'
import formidable from 'formidable'
import path from "path";
import fs from "fs";

dotenv.config();

const uploadcarDir = 'trainAI'
export const file = path.join(uploadcarDir, 'bestAI.json')
fs.mkdirSync(uploadcarDir, { recursive: true })
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, '[]')
}

const uploadimgDir = 'img'
export const form = formidable({
	uploadDir: uploadimgDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 20 * 1024 * 1024 ** 2,
	filter: (part) => part.mimetype?.startsWith('image/') || false
})

export const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session['isLogin']) {
		next()
	} else {
		res.redirect('/')
	}
}

const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);

 