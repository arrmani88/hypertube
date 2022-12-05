const dbController = require('../models/db_controller.js')
const bcrypt = require('bcrypt')

const confirmIdentityWithPassword = (req, res, next) => {
	const { password } = req.body
	dbController.query(
		"SELECT * FROM users WHERE username = ? LIMIT 1",
		[req.user.username],
		(error, result) => {
			if (error)  return res.json({'error': error})
			else {
				if (result.length === 0) return res.status(404).json({ details: `No user with the given username '${username}' found` })
				bcrypt.compare(password, result[0].password, (error, isMatched) => {
					if (error) return res.json(error)
					else if (!isMatched)
						return res.status(403).send("Wrong password")
					else {
						req.user = result[0]
						next()
					}
				})
			}
		}
	)
}

module.exports = confirmIdentityWithPassword