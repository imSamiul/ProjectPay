import { Link, LinkOptions, useNavigate } from '@tanstack/react-router';
import LinkButton from './LinkButton';
import ThemeSwap from './ThemeSwap';
import navbarLogo from '../../assets/nav-logo.png';
import Modal from '../modals/Modal';
import { useAuth } from '../../context/AuthContext';
import { useAuthMutation } from '../../services/mutations/authMutations';
import { useEffect } from 'react';
import { IoIosNotifications } from 'react-icons/io';

type NavItem = {
  title: string;
  link: LinkOptions['to'];
};
const projectManagerNavItem: NavItem[] = [
  {
    title: 'Overview',
    link: '/projectManager/managerOverview',
  },

  {
    title: 'Add Project',
    link: '/projectManager/addProject',
  },
  {
    title: 'Project List',
    link: '/projectManager/projectList',
  },
];
const clientNavItem: NavItem[] = [
  {
    title: 'Overview',
    link: '/',
  },
];

function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { logoutMutation } = useAuthMutation();
  const { mutate, isPending, isSuccess } = logoutMutation;
  const navigate = useNavigate();

  let navItem: NavItem[] = [];

  if (isAuthenticated) {
    if (user?.role === 'project_manager') {
      navItem = projectManagerNavItem;
    } else if (user?.role === 'client') {
      navItem = clientNavItem;
    }
  }

  async function handleLogout() {
    mutate();
  }
  useEffect(() => {
    if (isSuccess) {
      navigate({ to: '/login' });
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="navbar bg-secondary  font-lexend flex px-4">
        <div className="navbar-start flex-[2] md:flex-1">
          {isAuthenticated && (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost p-2  lg:hidden"
              >
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
                className="menu menu-sm dropdown-content bg-base-100  rounded-box z-[1] mt-3 w-52 p-2 shadow "
              >
                {navItem.map((item, index) => (
                  <Link to={item.link} key={index} className="">
                    <li>
                      <p className=" ">{item.title}</p>
                    </li>
                  </Link>
                ))}
                <div className="">
                  <div className="divider py-1 my-1"></div>
                  {isAuthenticated ? (
                    <Modal
                      id="logout"
                      title="Logout"
                      content="Are you sure you want to logout?"
                      openButtonLabel="Logout"
                      closeButtonLabel="Cancel"
                      confirmButtonLabel={`${isPending ? 'Loading...' : 'Confirm Logout'}`}
                      btnConfirmAction={handleLogout}
                      isPending={isPending}
                    />
                  ) : (
                    <LinkButton
                      title="Sign In"
                      to="/login"
                      className="btn  btn-sm md:btn-md "
                    />
                  )}
                </div>
              </ul>
            </div>
          )}

          <Link
            to="/"
            className="flex gap-2 justify-start items-center text-secondary-content "
          >
            <img src={navbarLogo} alt="navbar-logo" className="h-10" />
            <p className="text-xl md:text-2xl font-semibold">Project Pay</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex text-secondary-content">
          <ul className="menu menu-horizontal px-1 ">
            {navItem.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                activeProps={{
                  className: 'rounded-md bg-neutral/15 font-medium',
                }}
              >
                <li>
                  <p>{item.title}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2 flex-1 ">
          <div className="indicator dropdown dropdown-bottom dropdown-end">
            <span className="indicator-item badge badge-secondary ">99+</span>

            <IoIosNotifications
              tabIndex={0}
              role="button"
              className="h-8 w-full"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex">
            {isAuthenticated ? (
              <Modal
                id="logout"
                title="Logout"
                content="Are you sure you want to logout?"
                openButtonLabel="Logout"
                closeButtonLabel="Cancel"
                confirmButtonLabel={`${isPending ? 'Loading...' : 'Confirm Logout'}`}
                btnConfirmAction={handleLogout}
                isPending={isPending}
              />
            ) : (
              <LinkButton
                title="Sign In"
                to="/login"
                className="btn  btn-sm md:btn-md "
              />
            )}
          </div>
          <ThemeSwap />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
