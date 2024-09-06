import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Header from "./components/Header";
export default function App() {
  return (
    <BrowserRouter className="text-3xl font-bold">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sigin-in" element={<SingIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
