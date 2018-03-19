import { DrawerNavigator } from "react-navigation";

import nav from "../helpers/NavigatorHelper";
import Welcome from "./Welcome";
import SideMenu from "./reusable/SideMenu";
import Login from "./users/Login";
import Register from "./users/Register";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";
import Profile from "./users/Profile";

const SCREENS = {
  Home: { screen: Welcome, path: "/Home" },
  Login: { screen: Login, path: "/Login" },
  Register: { screen: Register, path: "/Register" },
  Profile: { screen: Profile, path: "/Profile" },
  ScreenOne: { screen: ScreenOne, path: "/ScreenOne" },
  ScreenTwo: { screen: ScreenTwo, path: "/ScreenTwo" }
};

//combust hook, do not rename
const COMBUST_GENERATE_SCREENS = {};

export default (Routes = DrawerNavigator(
  Object.assign(SCREENS, COMBUST_GENERATE_SCREENS),
  {
    initialRouteName: nav.initialRoute,
    contentComponent: SideMenu
  }
));