const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validate_token')
const isAccountComplete1 = require('../middlewares/is_account_complete')
const dbController = require('../models/db_controller')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))


router.get('/:searchParam', validateToken, isAccountComplete1, async (req, res) => {
	if (!req.params.searchParam) return res.status(400).json({ details: 'Invalid search input' })
	var searchInput = req.params.searchParam.trim()
	try {
		if (!searchInput) return res.status(400).json({ details: 'Invalid search input' })
		if (searchInput.length < 3) return res.status(400).json({ details: 'Search input should be at least 3 characters' })
		var result = await queryPromise(
			`SELECT users.id, username, firstName, lastName \n ` +
				`, GROUP_CONCAT(DISTINCT CASE WHEN images.isProfileImage = 1 THEN images.image ELSE NULL END) as profileImage \n` +
			`FROM users \n` +

			`LEFT JOIN blocks ON (blocks.uid = users.id OR blocks.blockedID = users.id) \n` +
			`LEFT JOIN images ON users.id = images.uid ` +
			`WHERE (username LIKE '%${searchInput}%' \n` + 
					`OR firstName + ' ' + lastName LIKE '%${searchInput}%' \n` +
					`OR lastName + ' ' + firstName LIKE '%${searchInput}%' \n` +
					`OR lastName LIKE '%${searchInput}%' \n` +
					`OR firstName LIKE '%${searchInput}%') \n` +
				`AND ((${req.user.id} != blocks.uid AND ${req.user.id} != blocks.blockedID)  ` +
				`OR blocks.uid IS NULL OR users.id = ${req.user.id}) ` + // makan la bloka chi 7ed la mbloki (3ndo sijil 3adli nadif) -OR- ana
			
			`GROUP BY users.id \n` +
			`ORDER BY users.fameRating DESC \n` +
		``)
		if (result.length) {
			return res.status(200).json(result)
		} else {
			res.status(404).json({ "Exception": "No user results the given input was found" })
		}
	} catch (error) {
		console.log(error)
		return res.status(400).json(error)
	}
})

module.exports = router