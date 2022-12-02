const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validate_token')
const isAccountComplete = require('../middlewares/is_account_complete')
const dbController = require('../models/db_controller')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))

router.post('/', validateToken, isAccountComplete, async (req, res) => {
	const { dropedID } = req.body
	try {
		if (req.user.id == dropedID)
			return res.status(400).send("Are you trying to drop your own profile ?, sorry this isn't possible")
		var result = await queryPromise( // to see if the user already droped the profile
			"SELECT * FROM drops WHERE uid = ? AND dropedID = ?",
			[req.user.id, dropedID]
		)
		if (result.length == 0) {
			await queryPromise(
				"INSERT INTO drops(uid, dropedID) VALUES(?,?)",
				[req.user.id, dropedID],
			)
			await queryPromise( // decrement fame rating
				"UPDATE users SET fameRating = fameRating - 1 WHERE id = ?",
				dropedID
			)
			await 

		}
	} catch (error) {
		return res.status(400).json({ error })
	}
})