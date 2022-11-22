import axios from 'axios'

const getUserIfLoggedIn = async () => {
	try {
		const storedAccessToken = localStorage.getItem('accessToken')
		if (!storedAccessToken) return {}
		const user = await axios.get(  // check if the token is valid (get either the user or status=4XX)
			`${process.env.REACT_APP_SERVER_HOSTNAME}/get_me`,
			{ headers: { Authorization: storedAccessToken } }
		)
		return user.status === 200 ? user.data : {}
	} catch (error) {
		if (error.response.data.error.message === 'invalid token'
				|| error.response.data.error.message === 'jwt malformed')
			return {}
		else
			throw error
	}
}

export default getUserIfLoggedIn