import { Route, Routes } from "react-router-dom";
import SideBar from "./components/Sidebar";
import Register from "./pages/Register";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import DeTranslation from './locales/de_translation.json'
import EnTranslation from './locales/en_translation.json'
import DkTranslation from './locales/dk_translation.json'
import EsTranslation from './locales/es_translation.json'
import ItTranslation from './locales/it_translation.json'
import NoTranslation from './locales/no_translation.json'
import SeTranslation from './locales/se_translation.json'
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
import { useEffect, useState } from "react";
import getUserIfLoggedIn from "./functions/getUserIfLoggedIn";
import { setUserLoggedIn, selectUser, setUserLoggedOut, setProfileStatus } from "./redux/userSlice";
import PrivateRoutes from "./components/redirection/PrivateRoutes";
import User from "./pages/User";
import PublicRoutes from "./components/redirection/PublicRoutes";
import OnlyCompletedProfileRoutes from "./components/redirection/OnlyCompletedProfileRoutes";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import SearchUsers from "./pages/SearchUsers";

i18n.use(initReactI18next).use(LanguageDetector).init({ resources: {
		en: { translation: EnTranslation },
		de: { translation: DeTranslation },
		dk: { translation: DkTranslation },
		es: { translation: EsTranslation },
		it: { translation: ItTranslation },
		no: { translation: NoTranslation },
		se: { translation: SeTranslation },
	}, fallbackLng: "en", detection: { order: ['cookie', 'localStorage', 'path', 'subdomain'], caches: ['cookie', 'localStorage'] }
});

function App() {
	const isLoading = useSelector((state) => state.loading.value)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	useEffect(() => {
		const checkIfUserLoggedIn = async () => {
			try {
				const result = await getUserIfLoggedIn()
				JSON.stringify(result) === JSON.stringify({})
					? dispatch(setUserLoggedOut())
					: dispatch(setUserLoggedIn(result))
				dispatch(setProfileStatus({ isAccountComplete: true }))
			} catch (error) {
				if (error.response?.data?.exception === 'unconfirmed email address') {
					dispatch(setUserLoggedOut())
					dispatch(setProfileStatus({
						isAccountComplete: false,
						username: error.response?.data?.username
					}))
				}
			}
		}
		checkIfUserLoggedIn()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Loading isLoading={isLoading} >
			{user.isLoggedIn !== null && user.isAccountComplete != null // if the user state isn't loading --&&-- we know if the account state (is true or false)
				&& <>
					<SideBar />
					<Routes>
						<Route path='verify-your-account' element={<VerfifyYourAccount />} />
						<Route path='/confirm-email/:token' element={<AccountVerified />} />
						<Route element={<OnlyCompletedProfileRoutes />} >
							<Route path='/' element={<Hypertube isLoggedIn={user.isLoggedIn} />} />
							<Route element={<PublicRoutes isLoggedIn={user.isLoggedIn} />} >
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
								<Route path='/loading' element={<Loading />} />
								<Route path='/send-reset-password-email' element={<SendResetPasswordEmail />} />
								<Route path="reset-password/:token" element={<ResetPassword />} />
							</Route>
							<Route element={<PrivateRoutes isLoggedIn={user.isLoggedIn} />} >
								<Route path='/verify-your-account' element={<VerfifyYourAccount />} />
								<Route path='/upload-image' element={<UploadImage />} />
								<Route path="/user/:parameterUsername" element={<User />} />
								<Route path="/search" element={<Search />} />
								<Route path="/search-users" element={<SearchUsers />} />
								<Route path="/movie/:imdbID" element={<Movie />} />
							</Route>
						</Route>
						<Route path='*' element={<NoPageFound />} />
					</Routes>
				</>
			}
		</Loading>
	);
}

export default App;



