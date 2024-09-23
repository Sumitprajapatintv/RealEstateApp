import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from 'react-icons/fa';
function Header() {
  const { currentUser } = useSelector((state) => state.user);

  console.log("currentUser", currentUser);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Urban</span>
            <span className="text-slate-700">Nest</span>
          </h1>
        </Link>
        <form className="bg-slate-200 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-tranparent focus:outline-node w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="sm-inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="sm-inline text-slate-700 hover:underline">About</li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.avatar} alt="profile" className="rounded-full max-w-10" />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
