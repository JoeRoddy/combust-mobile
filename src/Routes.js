import { createDrawerNavigator } from "react-navigation";

import Welcome from "./components/Welcome";
import SideMenu from "./components/reusable/SideMenu";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Profile from "./components/users/Profile";
import UserSearch from "./components/users/UserSearch";
import ScreenOne from "./components/ScreenOne";
import ScreenTwo from "./components/ScreenTwo";

const SCREENS = {
  Home: { screen: Welcome, path: "/Home" },
  Login: { screen: Login, path: "/Login" },
  Register: { screen: Register, path: "/Register" },
  Profile: { screen: Profile, path: "/Profile" },
  UserSearch: { screen: UserSearch, path: "/UserSearch" },
  ScreenOne: { screen: ScreenOne, path: "/ScreenOne" },
  ScreenTwo: { screen: ScreenTwo, path: "/ScreenTwo" }
};

export const INITIAL_ROUTE = "Home";

//combust hook, do not rename
const COMBUST_SCREENS = {};

export default (Routes = createDrawerNavigator(
  Object.assign(SCREENS, COMBUST_SCREENS),
  {
    initialRouteName: INITIAL_ROUTE,
    contentComponent: SideMenu
  }
));
