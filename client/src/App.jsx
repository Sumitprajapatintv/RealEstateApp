import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PrivateRoute from "./components/privateRoute";
import Header from "./components/Header";
import CreateListing from "./pages/createListing";
import UpdateListing from './pages/updateListing';
import Listing from './pages/Listing';
import Search from "./pages/Search";
export default function App() {
  return (
    <BrowserRouter className="text-3xl font-bold">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sigin-in" element={<SingIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>  
  );
}
