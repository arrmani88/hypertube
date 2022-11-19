import { Route, Routes, BrowserRouter } from "react-router-dom";
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
import { showLoading } from "./redux/loadingSlice";
import { useEffect } from "react";
import getUserIfLoggedIn from "./functions/getUserIfLoggedIn";
import { logIn, selectUser } from "./redux/userSlice";

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources: {
			en: { translation: EnTranslation },
			de: { translation: DeTranslation }
		},
		fallbackLng: "en",
		detection: {
			order: ['cookie', 'localStorage', 'path', 'subdomain'],
			caches: ['cookie', 'localStorage']
		}
	});

function App() {
	const isLoading = useSelector((state) => state.loading.value)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	useEffect(() => {
		const checkIfUserLoggedIn = async () => {
			try {
				const result = await getUserIfLoggedIn()
				dispatch(logIn(result))
			} catch (error) {
				console.log(error)
			}
		}
		checkIfUserLoggedIn()
	}, [])

	return (
		<Loading isLoading={isLoading}>
			<SideBar />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Hypertube />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/verify_your_account' element={<VerfifyYourAccount />} />
					<Route path='/confirm_email/:token' element={<AccountVerified />} />
					<Route path='/upload_image' element={<UploadImage />} />
					<Route path='/loading' element={<Loading />} />
					<Route path='/send_reset_password_email' element={<SendResetPasswordEmail />} />
					<Route path="reset_password/:token" element={<ResetPassword />} />

					<Route path='*' element={<NoPageFound />} />
				</Routes>
			</BrowserRouter>
		</Loading>
	);
}

export default App;

