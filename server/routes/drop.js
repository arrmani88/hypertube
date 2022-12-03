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
		// var result = await queryPromise( // to check whether the user already likes the profile or not
		// 	"SELECT * FROM likes WHERE uid = ? AND likedID = ?",
		// 	[req.user.id, dropedID]
		// )
		// if (result.length == 1) {
		await queryPromise( // delete the like (if already liked)
			"DELETE FROM likes WHERE uid = ? AND likedID = ?",
			[req.user.id, dropedID],
		)
		await queryPromise( // add this drop to `drops` table
			"INSERT INTO drops(uid, dropedID) VALUES(?,?)",
			[req.user.id, dropedID],
		)
		await queryPromise( // decrement fame rating
			"UPDATE users SET fameRating = fameRating - 1 WHERE id = ?",
			[dropedID]
		)
		result = await queryPromise( // see if both profiles are matched
			"SELECT * FROM matchedUsers WHERE (uid1 = ? AND uid2 = ?) OR (uid1 = ? AND uid2 = ?)",
			[req.user.id, dropedID, dropedID, req.user.id]
		)
		if (result.length != 0) {
			await queryPromise( // unmatch the profiles
				"DELETE FROM matchedUsers WHERE (uid1 = ? AND uid2 = ?) OR (uid1 = ? AND uid2 = ?)",
				[req.user.id, dropedID, dropedID, req.user.id]
			)
		}
		res.send('Profile droped successfully')
		// }
	} catch (err) {
		res.status(400).json({ error: err })
	}
})

module.exports = router
