import { DrawerNavigator } from "react-navigation";

import Welcome from "./Welcome";
import SideMenu from "./reusable/SideMenu";
import Login from "./users/Login";
import Register from "./users/Register";

export default (Routes = DrawerNavigator(
  {
    Login: { screen: Login, path: "/" },
    Register: { screen: Register, path: "/Register" },
    Welcome: { screen: Welcome, path: "/Welcome" }
  },
  {
    initialRouteName: "Welcome",
    contentComponent: SideMenu
  }
));
