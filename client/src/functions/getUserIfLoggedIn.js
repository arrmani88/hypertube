import axios from 'axios'

const getUserIfLoggedIn = async () => {
	try {
		const storedAccessToken = localStorage.getItem('accessToken')
		if (!storedAccessToken) return {}
		const user = await axios.get(  // check if the token is valid (get either the user or status=4XX)
			`${process.env.REACT_APP_SERVER_HOSTNAME}/get_me`,
			{ headers: { Authorization: storedAccessToken } }
		)
		return user.status === 200 ? {userData: user.data, accessToken: storedAccessToken} : {}
	} catch (error) {
		console.log(error)
		if (error.response?.status == 404 || error.response?.data?.error?.message === 'invalid token' || error.response?.data?.error?.message === 'jwt malformed') {
			localStorage.removeItem('accessToken')
			return {}
		}
			
		else
			throw error
	}
}

export default getUserIfLoggedIn
