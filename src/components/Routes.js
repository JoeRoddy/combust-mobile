import { DrawerNavigator } from "react-navigation";

import Welcome from "./Welcome";
import SideMenu from "./reusable/SideMenu";
import Login from "./users/Login";
import Register from "./users/Register";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";
import Profile from "./users/Profile";
import nav from "../helpers/NavigatorHelper";

export default (Routes = DrawerNavigator(
  {
    Home: { screen: Welcome, path: "/Home" },
    Login: { screen: Login, path: "/Login" },
    Register: { screen: Register, path: "/Register" },
    Profile: { screen: Profile, path: "/Profile" },
    ScreenOne: { screen: ScreenOne, path: "/ScreenOne" },
    ScreenTwo: { screen: ScreenTwo, path: "/ScreenTwo" }
  },
  {
    initialRouteName: nav.initialRoute,
    contentComponent: SideMenu
  }
));
