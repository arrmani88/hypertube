import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/Sidebar";
import Register from "./pages/Register";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import DeTranslation from './locales/de_translation.json'
import EnTranslation from './locales/en_translation.json'
import Login from "./pages/Login";
import AccountVerified from "./pages/AccountVerified";
import VerfifyYourAccount from "./pages/VerifyYourAccount";
import UploadImage from "./pages/UploadImage";
import NoPageFound from "./pages/NoPageFound";
import Loading from './components/Loading';
import Hypertube from "./pages/Hypertube";
import SendResetPasswordEmail from "./pages/SendResetPasswordEmail";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./pages/ResetPassword";
import { useEffect } from "react";
import getUserIfLoggedIn from "./functions/getUserIfLoggedIn";
import { setUserLoggedIn, selectUser, setUserLoggedOut } from "./redux/userSlice";
import PrivateRoutes from "./components/PrivateRoutes";
import User from "./pages/User";
import PublicRoutes from "./components/PublicRoutes";
import Landing from "./pages/Landing";

i18n.use(initReactI18next).use(LanguageDetector).init({
		resources: { en: { translation: EnTranslation }, de: { translation: DeTranslation } },
		fallbackLng: "en",
		detection: { order: ['cookie', 'localStorage', 'path', 'subdomain'], caches: ['cookie', 'localStorage'] }
	});

function App() {
	const isLoading = useSelector((state) => state.loading.value)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		const checkIfUserLoggedIn = async () => {
			try {
				const result = await getUserIfLoggedIn()
				JSON.stringify(result) === JSON.stringify({})
					? dispatch(setUserLoggedOut())
					: dispatch(setUserLoggedIn(result))
			} catch (error) {
				// if (error.response?.data?.exception === 'unconfirmed email address')
				// 	navigate(`/verify-your-account?username=${error.response.data.username}`)
				console.log(error)
			}
		}
		checkIfUserLoggedIn()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Loading isLoading={isLoading}>
			{user.isLoggedIn !== null // if the user state isn't loading
				&& <>
					<SideBar />
					<Routes>
						<Route path='/' element={<Hypertube isLoggedIn={user.isLoggedIn}/>} />
						<Route element={ <PublicRoutes isLoggedIn={user.isLoggedIn} /> } >
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/verify-your-account' element={<VerfifyYourAccount />} />
							<Route path='/confirm-email/:token' element={<AccountVerified />} />
							<Route path='/loading' element={<Loading />} />
							<Route path='/send-reset-password-email' element={<SendResetPasswordEmail />} />
							<Route path="reset-password/:token" element={<ResetPassword />} />
						</Route>
						
						<Route element={ <PrivateRoutes isLoggedIn={user.isLoggedIn} /> } >
							<Route path='/upload-image' element={<UploadImage />} />
							<Route path="/user/:parameterUsername" element={<User />} />
						</Route>

						{/* <Route path='*' element={<NoPageFound />} /> */}
					</Routes>
				</>
			}
		</Loading>
	);
}

export default App;
