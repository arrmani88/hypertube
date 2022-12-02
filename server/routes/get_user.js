const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validate_token')
const dbController = require('../models/db_controller')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))
const isAccountComplete = require('../middlewares/is_account_complete')

router.get('/:idOrUsername', validateToken, isAccountComplete, async (req, res) => {
    try {
        const idOrUsername = req.params.idOrUsername
        const visitedprofile = await queryPromise(
            "SELECT * FROM users WHERE id = ? OR username = ?",
            [idOrUsername, idOrUsername]
        )
        if (visitedprofile.length) {
            const visitedProfileImages = await queryPromise(
                "SELECT * FROM images WHERE uid = ?",
                visitedprofile[0].id
            )
            res.json({
                id: visitedprofile[0].id,
                firstName: visitedprofile[0].firstName,
                lastName : visitedprofile[0].lastName,
                username : visitedprofile[0].username,
                email : visitedprofile[0].email,
                images: visitedProfileImages,
                birthday : visitedprofile[0].birthday,
                city : visitedprofile[0].city,
                gender : visitedprofile[0].gender,
                sexualPreferences: visitedprofile[0].sexualPreferences,
                biography: visitedprofile[0].biography,
                longitude: visitedprofile[0].longitude,
                latitude: visitedprofile[0].latitude,
            })
            if (idOrUsername != req.user.id && idOrUsername != req.user.username) {
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
		res.status(400).json({ error: err })
    }
})

module.exports = router