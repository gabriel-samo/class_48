import logo from "../assets/vacation-log.png";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { logoutUser } from "../redux/slices/userSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../redux/slices/themeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  TextInput,
  Tooltip
} from "flowbite-react";
import { decodeToken } from "react-jwt";

export default function MyHeader() {
  const { theme } = useAppSelector((state) => state.theme);
  const currentUser = useAppSelector((state) => state.currentUser);
  const isAdmin = decodeToken<{ isAdmin: boolean }>(currentUser.token)?.isAdmin;

  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => dispatch(toggleTheme());
  const handleSignout = () => dispatch(logoutUser());

  return (
    <Navbar className="border-b-2 sticky top-0 z-50">
      <NavLink
        to="/"
        className="flex items-center justify-center whitespace-nowrap text-xs sm:text-xl font-semibold dark:text-white x"
      >
        <img src={logo} alt="logo" className="w-10 h-10" />
        <span>Vacations</span>
      </NavLink>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-10 h-10"
          color="gray"
          pill
          onClick={handleThemeToggle}
        >
          {theme === "light" ? (
            <FaMoon className="self-center" />
          ) : (
            <FiSun className="self-center text-white" />
          )}
        </Button>
        {currentUser.token ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                placeholderInitials={`${currentUser.firstName[0].toUpperCase()}${currentUser.lastName[0].toUpperCase()}`}
                rounded
                alt="user picture"
                className="w-10 h-10 rounded-full shadow-md"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {`${currentUser.firstName} ${currentUser.lastName}`}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {isAdmin && (
              <Dropdown.Item as={NavLink} to="/reports">
                Reports
              </Dropdown.Item>
            )}
            <Dropdown.Item
              className="text-red-500 dark:text-red-600"
              onClick={handleSignout}
            >
              Logout
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <NavLink to="/login">
            <Button gradientDuoTone="purpleToBlue" outline>
              Login
            </Button>
          </NavLink>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Brand as={"form"} className="flex gap-4 md:my-4">
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="w-full"
          />
        </Navbar.Brand>
        <Navbar.Link
          as={NavLink}
          to="/"
          active={path === "/"}
          className="h-full flex items-center"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={NavLink}
          to="/about"
          active={path === "/about"}
          className="h-full flex items-center"
        >
          About
        </Navbar.Link>
        <Navbar.Link
          as={NavLink}
          to="/vacations"
          active={path === "/vacations"}
          className="h-full flex items-center"
          disabled={!currentUser.token}
        >
          {currentUser.token ? (
            "Vacations"
          ) : (
            <Tooltip content="Please login to view this page">
              Vacations
            </Tooltip>
          )}
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
