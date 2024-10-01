import { Link } from "@tanstack/react-router";
import LinkButton from "./LinkButton";
import ThemeSwap from "./ThemeSwap";
import navbarLogo from "../../assets/nav-logo.png";

function Navbar() {
  const userType = "client";
  const navItem = [
    {
      title: "Overview",
      link: "/",
    },
    {
      title: "Add Clients",
      link: "/add-clients",
    },
    {
      title: "Client List",
      link: "/client-list",
    },
  ];

  return (
    <div>
      <div className="navbar bg-[#606C38] text-white font-lexend">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {userType &&
                navItem.map((item, index) => (
                  <Link to={item.link} key={index}>
                    <li>
                      <p>{item.title}</p>
                    </li>
                  </Link>
                ))}
            </ul>
          </div>

          <Link
            to="/payments"
            className="flex gap-2 items-center btn btn-ghost"
            activeProps={{ className: "rounded-md bg-[#dda15e]/20" }}
          >
            <img src={navbarLogo} alt="navbar-logo" className="h-10" />
            <p className=" text-xl">Project Pay</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {userType &&
              navItem.map((item, index) => (
                <Link
                  to={item.link}
                  key={index}
                  activeProps={{ className: "rounded-md bg-[#dda15e]/20" }}
                >
                  <li>
                    <p>{item.title}</p>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2 ">
          <LinkButton title="Sign In | Sign Up" to="/login" classNames="btn" />

          <ThemeSwap />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
