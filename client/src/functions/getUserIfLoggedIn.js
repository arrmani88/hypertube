import axios from 'axios'

const getUserIfLoggedIn = async () => {
	try {
		const storedAccessToken = localStorage.getItem('accessToken')
		if (!storedAccessToken) return null
		const user = await axios.get(  // check if the token is valid (get either the user or status=4XX)
			`${process.env.REACT_APP_SERVER_HOSTNAME}/get_me`,
			{ headers: { Authorization: storedAccessToken } }
		)
		return user.status === 200 ? user.data : null
	} catch (error) { throw error }
}

export default getUserIfLoggedIn