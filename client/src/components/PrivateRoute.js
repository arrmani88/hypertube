import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Hypertube from '../pages/Hypertube'
import { selectUser } from '../redux/userSlice'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, ...props }) => {
	const user = useSelector(selectUser)

	return user.isLoggedIn === true ? props.child : <Navigate to='/' />
}

export default PrivateRoute