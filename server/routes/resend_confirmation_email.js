const express = require('express')
const router = require("./update_profile");
const nodemailer = require("nodemailer");
const dbController = require('../models/db_controller')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))
const { sign } = require("jsonwebtoken");


let transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: process.env.EMAIL_ADDR,
		pass: process.env.EMAIL_PASS,
	},
});

router.get('/:username', async (req, res) => {
	const username = req.params.username
	try {
		const result = await queryPromise("SELECT * FROM users WHERE username = ?", username)
		if (result.length === 0) return res.status(404).send(`No user with the given username '${username}' found`)
		const emailConfirmationToken = sign(
			{ username, id: result[0].id },
			process.env.EMAIL_CONFIRMATION_RANDOM_STRING
		);
		let sentEmail = transporter.sendMail(
			{
				from: 'noreply@matcha.com',
				to: process.env.EMAIL_ADDR,
				subject: "Matcha account confirmation",
				html: `${process.env.CLIENT_HOSTNAME}/confirm-email/${emailConfirmationToken}`,
			},
			(err, info) => {
				console.log(`${process.env.CLIENT_HOSTNAME}/confirm-email/${emailConfirmationToken}`);
				if (err) return res.status(400).json(err);
				else return res.json("We sent you a mail to confirm your email address, please check your inbox");
			}
		);
	} catch (error) {
		console.log(error)
		res.status(400).json(error)
	}
})

module.exports = router