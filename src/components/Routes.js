import { createDrawerNavigator } from "react-navigation";

import Welcome from "./Welcome";
import SideMenu from "./reusable/SideMenu";
import Login from "./users/Login";
import Register from "./users/Register";
import Profile from "./users/Profile";
import UserSearch from "./users/UserSearch";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";

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
