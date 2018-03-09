import { DrawerNavigator } from "react-navigation";

import Welcome from "./Welcome";
import SideMenu from "./reusable/SideMenu";
import Login from "./users/Login";
import Register from "./users/Register";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";

import nav from "../helpers/NavigatorHelper";

export default (Routes = DrawerNavigator(
  {
    Login: { screen: Login, path: "/Login" },
    Register: { screen: Register, path: "/Register" },
    Home: { screen: Welcome, path: "/Home" },
    ScreenOne: { screen: ScreenOne, path: "/ScreenOne" },
    ScreenTwo: { screen: ScreenTwo, path: "/ScreenTwo" }
  },
  {
    initialRouteName: nav.initialRoute,
    contentComponent: SideMenu
  }
));
