const express = require('express')
const router = express.Router()
const dbController = require('../models/db_controller')
const validateToken = require('../middlewares/validate_token.js')
const isAccountComplete = require('../middlewares/is_account_complete.js')
const confirmIdentityWithPassword = require('../middlewares/confirm_identity_with_password.js')
const util = require('util')
const { isName, isEmail, isPassword, isBirthday, isGender, isCity } = require("../functions/input_validation");
const queryPromise = util.promisify(dbController.query.bind(dbController))
var oldTagsIDs = []
var newTagsIDs = []
let getExistingTagsQuery = "SELECT * FROM tags WHERE value in ("
let insertNewTagsQuery = "INSERT INTO tags(value) VALUES"
let j
let count = 1

const validateUpdatedData = async (req, res, next) => {
	try {
		const { password, newFirstName, newLastName, newEmail, newPassword, newBirthday, newCity, newGender, newSexualPreferences, newBiography, newTags } = req.body
		if (!newFirstName && !newLastName && !newEmail && !newPassword && !newBirthday && !newCity && !newGender && !newSexualPreferences && (!newTags || newTags == []) && !newBiography)
			return res.status(422).json({ details: "At least one of the fields newFirstName, newLastName, newEmail, newPassword, newBirthday, newCity, newGender, newSexualPreferences, newBiography or newTags should be sent"  });
		else if (!password) return res.status(422).json({ details: "Field password is required to confirm your identity" });
		else if (newFirstName && !isName(newFirstName)) return res.status(422).json({ details: "Invalid first name syntax" });
		else if (newLastName && !isName(newLastName)) 	return res.status(422).json({ details: "Invalid last name syntax" });
		else if (newEmail && !isEmail(newEmail)) 		return res.status(422).json({ details: "Invalid email syntax" });
		else if (newPassword && !isPassword(newPassword)) return res.status(422).json({ details: "Password should be between 6 and 20 characters" });
		else if (newBirthday && !isBirthday(newBirthday)) return res.status(422).json({ details: "Date should be YYYY-MM-DD" })
		else if (newCity && !isCity(newCity)) 			return res.status(422).json({ details: "Invalid city syntax" })
		else if (newGender && !isGender(newGender)) 	return res.status(422).json({ details: "Gender should be 'M', 'F', or 'N'" })
		else if (newSexualPreferences && !isGender(newSexualPreferences)) return res.status(422).json({ details: "Sexual preferences should be 'M', 'F', or 'N'" })
		else {
			dbController.query(
				"SELECT * FROM users WHERE email LIKE ? LIMIT 1",
				[newEmail],
				(error, result) => {
					if (error) return res.status(400).json(error);
					if (result.length == 0) return next();
					else return res.status(409).json({ Exception: { Details: "Email already used" }, });
				}
			);
		}
	} catch (error) {
		return res.status(400).json(error)
	}
};

const getArrayOfUpdatedFields = (body, id) => {
	const { newFirstName, newLastName, newEmail, newPassword, newBirthday, newCity, newGender, newSexualPreferences, newBiography } = body
	let rtrn = []
	newFirstName != null ? rtrn.push(newFirstName) : 0
	newLastName != null ? rtrn.push(newLastName) : 0
	newEmail != null ? rtrn.push(newEmail) : 0
	newPassword != null ? rtrn.push(newPassword) : 0
	newBirthday != null ? rtrn.push(newBirthday) : 0
	newCity != null ? rtrn.push(newCity) : 0
	newGender != null ? rtrn.push(newGender) : 0
	newSexualPreferences != null ? rtrn.push(newSexualPreferences) : 0
	newBiography != null ? rtrn.push(newBiography) : 0
	rtrn.push(id)
	return rtrn
}

const getArrayOfUpdatedTags = (body, id) => {
	const { oldTags, newTags } = body
	let rtrn = []
	for (let i = 0; i < oldTags.length; i++) {
		rtrn.push(newTags[i], id, oldTags[i])
	}
	return rtrn
}

const getOldTagsIDs = async (oldTags) => {
	oldTagsIDs = []
	var result = await queryPromise( // get old tags IDs
		"SELECT * FROM tags WHERE " +
		(oldTags.length >= 1 ? "value = ?" : "") +
		(oldTags.length >= 2 ? "or value = ?" : "") +
		(oldTags.length >= 3 ? "or value = ?" : "") +
		(oldTags.length >= 4 ? "or value = ?" : "") +
		(oldTags.length >= 5 ? "or value = ?" : ""),
		oldTags
	)
	for (let i = 0; i < oldTags.length; i++)
		for (j = 0; j < result.length; j++)
			if (result[j].value == oldTags[i])
				oldTagsIDs.push(result[j].id)
	console.log('old tags IDs:' + oldTagsIDs)
}

const getNewTagsIDs = async (newTags) => {
	getExistingTagsQuery = "SELECT * FROM tags WHERE value in ("
	newTagsIDs = []
	count = 1
	for (const tag of newTags) { // setting getExistingTagsQuery to send the query
		count != newTags.length ? getExistingTagsQuery += ("'" + tag + "', ") : getExistingTagsQuery += ("'" + tag + "')")
		count++
	}
	existingTags = await queryPromise(getExistingTagsQuery)
	if ((newTags.length - existingTags.length) > 0) { // if there are some new tags to add to the DB
		const newTagsLength = newTags.length - existingTags.length
		let tagExists = false
		let firstAddedTagId
		count = 1
		insertNewTagsQuery = "INSERT INTO tags(value) VALUES"
		for (let tag of newTags) { // setting newTagsQuery and tagsIds
			for (let existingTag of existingTags) if (existingTag.value == tag) tagExists = true
			if (!tagExists) {
				count != newTagsLength ? insertNewTagsQuery += ("('" + tag + "'), ") : insertNewTagsQuery += ("('" + tag + "')")
				count++
			}
			tagExists = false
		}
		result = await queryPromise(insertNewTagsQuery)
		firstAddedTagId = result.insertId
		count = 0
		while (count < newTagsLength) {
			newTagsIDs.push(firstAddedTagId + count)
			count++
		}
	}
	for (count = 0; count < existingTags.length; count++)
		newTagsIDs.push(existingTags[count].id)
	console.log('new tags ids' + newTagsIDs)
}

const updateUsersTags = async (oldTagsIDs, newTagsIDs, uid) => {
	for (let index = 0; index < newTagsIDs.length; index++) {
		await queryPromise(
			"UPDATE usersTags SET tagID = ? WHERE uid = ? AND tagID = ? LIMIT 1",
			[newTagsIDs[index], uid, oldTagsIDs[index]]
		)
	}
}

router.post('/', validateToken, isAccountComplete, validateUpdatedData, confirmIdentityWithPassword, async (req, res) => {
	try {
		const { newFirstName, newLastName, newEmail, newPassword, newBirthday, newCity, newGender, newSexualPreferences, newBiography, oldTags, newTags } = req.body
		if (newTags != null && oldTags != null) {
			await getOldTagsIDs(oldTags)
			await getNewTagsIDs(newTags)
			await updateUsersTags(oldTagsIDs, newTagsIDs, req.user.id)
		}
		var keysCount = 0
		req.body.hasOwnProperty('newFirstName') && keysCount++
		req.body.hasOwnProperty('newLastName') && keysCount++
		req.body.hasOwnProperty('newEmail') && keysCount++
		req.body.hasOwnProperty('newPassword') && keysCount++
		req.body.hasOwnProperty('newBirthday') && keysCount++
		req.body.hasOwnProperty('newCity') && keysCount++
		req.body.hasOwnProperty('newGender') && keysCount++
		req.body.hasOwnProperty('newSexualPreferences') && keysCount++
		req.body.hasOwnProperty('newBiography') && keysCount++

		result = await queryPromise(
			"UPDATE users SET " +
			(newFirstName	&& (keysCount-- || 1) ? "firstName = ? " 	+ (keysCount > 0 ? ", " : "") : "") +
			(newLastName	&& (keysCount-- || 1) ? "lastName = ? " 	+ (keysCount > 0 ? ", " : "") : "") +
			(newEmail		&& (keysCount-- || 1) ? "email = ? " 		+ (keysCount > 0 ? ", " : "") : "") +
			(newPassword	&& (keysCount-- || 1) ? "password = ? " 	+ (keysCount > 0 ? ", " : "") : "") +
			(newBirthday	&& (keysCount-- || 1) ? "birthday = ? " 	+ (keysCount > 0 ? ", " : "") : "") +
			(newCity		&& (keysCount-- || 1) ? "city = ? " 		+ (keysCount > 0 ? ", " : "") : "") +
			(newGender		&& (keysCount-- || 1) ? "gender = ? " 		+ (keysCount > 0 ? ", " : "") : "") +
			(newSexualPreferences	&& (keysCount-- || 1) ? "sexualPreferences = ? " + (keysCount > 0 ? ", " : "") : "") +
			(newBiography	&& (keysCount-- || 1) ? "biography = ? " : "") +
			/******************************************************************************** */
			(newEmail ? " , isAccountConfirmed = 0 " : "") +
			"WHERE id = ?",
			getArrayOfUpdatedFields(req.body, (req.user.id).toString()),
		)
		res.send("Changes saved successfully")
	} catch (err) {
		console.log(err)
		return res.status(400).json({ error: err.message })
	}
})

module.exports = router
