const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validate_token')
const dbController = require('../models/db_controller')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))
const isAccountComplete = require('../middlewares/is_account_complete')

// select * from users where user_id <> 4 and language = 'en'
//     and user_id not in(select blocked_user_id  from users_blocked where user_id         = 4)
//     and user_id not in(select user_id          from users_blocked where blocked_user_id = 4)

router.get('/:username', validateToken, isAccountComplete, async (req, res) => {
    try {
        const username = req.params.username
        const visitedprofile = await queryPromise(
            ` SELECT username, users.id AS users_id, fameRating, firstName, lastName, email, city, gender, sexualPreferences, biography, longitude, latitude, \n ` +
                ` ARRAY( SELECT image, isProfileImage FROM images WHERE images.uid = 1 )  \n` +
            ` FROM users \n` +

            ` LEFT JOIN blocks ON (blocks.uid = users.id OR blocks.blockedID = users.id) \n` +
            ` LEFT JOIN images ON (users.id = images.uid) ` +

            ` WHERE username = '${username}' ` + 
                ` AND ((${req.user.id} != blocks.uid AND ${req.user.id} != blocks.blockedID)  ` +
                ` OR blocks.uid IS NULL OR users.id = ${req.user.id}) ` + // makan la bloka chi 7ed la mbloki -OR- ana
            // ` LIMIT 1 `,
            ``
        )
        return res.json(visitedprofile)
        if (visitedprofile.length) {
            const visitedProfileImages = await queryPromise(
                "SELECT * FROM images WHERE uid = ?",
                visitedprofile[0].id
            )
            res.json({
                id: visitedprofile[0].id,

                firstName: visitedprofile[0].firstName,
                lastName: visitedprofile[0].lastName,
                username: visitedprofile[0].username,
                email: visitedprofile[0].email,
                images: visitedProfileImages,
                birthday: visitedprofile[0].birthday,
                city: visitedprofile[0].city,
                gender: visitedprofile[0].gender,
                sexualPreferences: visitedprofile[0].sexualPreferences,
                biography: visitedprofile[0].biography,
                longitude: visitedprofile[0].longitude,
                latitude: visitedprofile[0].latitude,
            })
            if (username != req.user.id) {
                await queryPromise(
                    "INSERT INTO visitedProfiles(visited, uid) VALUES(?, ?)",
                    [visitedprofile[0].id, req.user.id]
                )
            }
        } else {
            res.json({ "Exception": "No user with the given id was found" })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
})

module.exports = router