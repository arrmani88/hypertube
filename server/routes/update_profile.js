const express = require('express')
const router = express.Router()
const dbController = require('../models/db_controller')
const validateToken = require('../middlewares/validate_token.js')
const isAccountComplete = require('../middlewares/is_account_complete.js')
const confirmIdentityWithPassword = require('../middlewares/confirm_identity_with_password.js')
const util = require('util')
const queryPromise = util.promisify(dbController.query.bind(dbController))
var oldTagsIDs = []
var newTagsIDs = []
let getExistingTagsQuery = "SELECT * FROM tags WHERE value in ("
let insertNewTagsQuery = "INSERT INTO tags(value) VALUES"
let j
let count = 1

const getArrayOfUpdatedFields = (body, id) => {
	const { newFirstName, newLastName, newUsername, newEmail, newPassword, newBirthday, newCity, newGender, newSexualPreferences, newBiography } = body
	let rtrn = []
	newFirstName != null ? rtrn.push(newFirstName) : 0
	newLastName != null ? rtrn.push(newLastName) : 0
	newUsername != null ? rtrn.push(newUsername) : 0
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
	for (let i = 0; i < oldTags.length; i++) 
	{
		rtrn.push(newTags[i], id, oldTags[i])
	}
	return rtrn
}

const getOldTagsIDs = async (oldTags) => {
	oldTagsIDs = []
	var result = await queryPromise( // get old tags IDs
		"SELECT * FROM tags WHERE " +
			(oldTags.length >= 1 ?    "value = ?" : "") +
			(oldTags.length >= 2 ? "or value = ?" : "") +
			(oldTags.length >= 3 ? "or value = ?" : "") +
			(oldTags.length >= 4 ? "or value = ?" : "") +
			(oldTags.length >= 5 ? "or value = ?" : ""),
		oldTags
	)
	for (let i = 0 ; i < oldTags.length ; i++)
		for (j = 0 ; j < result.length ; j++)
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
	for (count = 0 ; count < existingTags.length ; count++)
		newTagsIDs.push(existingTags[count].id)
	console.log('new tags ids' + newTagsIDs)
}

const updateUsersTags = async (oldTagsIDs, newTagsIDs, uid) => {
	for (let index = 0 ; index < newTagsIDs.length ; index++) {
		await queryPromise(
			"UPDATE usersTags SET tagID = ? WHERE uid = ? AND tagID = ? LIMIT 1",
			[newTagsIDs[index], uid, oldTagsIDs[index]]
		)
	}
}

router.post('/', confirmIdentityWithPassword, isAccountComplete, async (req, res) => {
	try {
		const { newFirstName, newLastName, newUsername, newEmail, newPassword, newBirthday, newCity, newGender, newSexualPreferences, newBiography, oldTags, newTags} = req.body
		if (newTags != null && oldTags != null) {
			await getOldTagsIDs(oldTags)
			await getNewTagsIDs(newTags)
			await updateUsersTags(oldTagsIDs, newTagsIDs, req.user.id)
		}
		// 1st of all, we need to know how many keys/values we'll update, to know how many commas (,) we will insert in the sql query string
		// lets begin with collecting the keys in an array
		const arrayOfKeys = Object.keys(req.body)
		// we need to know the index of the keys that aren't included in the following query string (to remove them)
		const newTagsIndex = arrayOfKeys.indexOf('newTags')
		// index is -1 if the item isn't found
		// if the index is > -1; then remove the value (2nd param means remove only 1 value)
		newTagsIndex > -1 && arrayOfKeys.splice(newTagsIndex, 1)
		// repeat the same process with `oldTags`
		const oldTagsIndex = arrayOfKeys.indexOf('oldTags')
		oldTagsIndex > -1 && arrayOfKeys.splice(oldTagsIndex, 1)

		// -2 because the keys `username` and `password` should be included in the body,
		// but arent included in the query string
		// -1 means: if the length is 2, means we have 2 keys, whhich means we should only add 1 comma (,)
		var keysLength = arrayOfKeys.length - 2
		console.log('length=', keysLength)
		result = await queryPromise(
			"UPDATE users SET " +
				(newFirstName != null && (keysLength-- || 1) ? "firstName = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newLastName != null && (keysLength-- || 1) ? "lastName = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newUsername != null && (keysLength-- || 1) ? "username = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newEmail != null && (keysLength-- || 1) ? "email = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newPassword != null && (keysLength-- || 1) ? "password = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newBirthday != null && (keysLength-- || 1) ? "birthday = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newCity != null && (keysLength-- || 1) ? "city = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newGender != null && (keysLength-- || 1) ? "gender = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newSexualPreferences != null && (keysLength-- || 1) ? "sexualPreferences = ? " + (keysLength > 0 ? ", ": "") : "") +
				(newBiography != null && (keysLength-- || 1) ? "biography = ? " : "") +
				"WHERE id = ?",
			getArrayOfUpdatedFields(req.body, (req.user.id).toString()),
		)
		res.send("Changes saved successfully")
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: err.message })
	}
})

module.exports = router
