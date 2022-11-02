import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
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
	return (
		<>
			<SideBar />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/verify_your_account' element={<VerfifyYourAccount />} />
				<Route path='/account_verified' element={<AccountVerified />} />
			</Routes>
		</>
	);
}

export default App;
