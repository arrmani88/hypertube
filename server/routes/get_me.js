const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validate_token')
const dbController = require('../models/db_controller')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))
const isAccountComplete = require('../middlewares/is_account_complete')

router.get('/', validateToken, isAccountComplete, async (req, res) => {
// router.get('/', validateToken, async (req, res) => {
	try {
		const user = await queryPromise("SELECT * FROM users WHERE id = ?", req.user.id)
		const images = await queryPromise('SELECT * FROM images WHERE uid = ?', req.user.id)
		if (user[0]) {
			const { password, created_at, updated_at, fameRating, areTagsAdded, ...userPublicData } = user[0]
			return res.json({...userPublicData, images})
		}
		else return res.status(404).send('No user found')
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: err })
	}
})

module.exports = router
