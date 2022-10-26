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
				<Route path='/register' element={<Register /> }/>
			</Routes>
		</>
	);
}

export default App;
