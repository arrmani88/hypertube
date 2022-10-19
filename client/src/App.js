import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import SideBar from "./components/Sidebar";

function App() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path='/' element={ <Landing /> }/>
        <Route path='/home' element={ <Home /> }/>
      </Routes>
    </>
  );
}

export default App;
