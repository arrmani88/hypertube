import { Route, Routes, BrowserRouter } from "react-router-dom";
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
import UploadImage from "./pages/UploadImage";
import NoPageFound from "./pages/NoPageFound";
import Loading from './components/Loading';
import Hypertube from "./pages/Hypertube";

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
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Hypertube />} />
					{/* <Route path='/' element={<Landing />} /> */}
					{/* <Route path='/home' element={<Home />} /> */}
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/verify_your_account' element={<VerfifyYourAccount />} />
					<Route path='/confirm_email/:token' element={<AccountVerified />} />
					<Route path='/upload_image' element={<UploadImage />} />
					<Route path='/loading' element={<Loading />} />

					<Route path='*' element={<NoPageFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
