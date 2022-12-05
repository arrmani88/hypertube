const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validate_token')
const dbController = require('../models/db_controller')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))
const isAccountComplete = require('../middlewares/is_account_complete')

router.get('/:username', validateToken, isAccountComplete, async (req, res) => {
    try {
        const username = req.params.username
        const visitedProfile = await queryPromise(
            ` SELECT users.id, username, firstName, lastName, email, city, gender, sexualPreferences, fameRating, birthday, biography, longitude, latitude \n` +
                `, GROUP_CONCAT(DISTINCT CASE WHEN images.isProfileImage = 0 THEN images.image ELSE NULL END) as images \n` +
                `, GROUP_CONCAT(DISTINCT CASE WHEN images.isProfileImage = 1 THEN images.image ELSE NULL END) as profileImage \n` +
            ` FROM users \n` +

            ` LEFT JOIN blocks ON (blocks.uid = users.id OR blocks.blockedID = users.id) \n` +
            ` LEFT JOIN images ON users.id = images.uid ` +

            ` WHERE username = '${username}' ` + 
                ` AND ((${req.user.id} != blocks.uid AND ${req.user.id} != blocks.blockedID)  ` +
                ` OR blocks.uid IS NULL OR users.id = ${req.user.id}) ` + // makan la bloka chi 7ed la mbloki (3ndo sijil 3adli nadif) -OR- ana
            `GROUP BY users.id \n` +
            ``
        )
        if (visitedProfile.length) {
            res.status(200).json(visitedProfile[0])
            if (username != req.user.username) {
                await queryPromise(
                    "INSERT INTO visitedProfiles(visited, uid) VALUES(?, ?)",
                    [visitedProfile[0].id, req.user.id]
                )
            }
        } else {
            res.status(404).json({ "Exception": "No user with the given id was found" })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
})

module.exports = router