import { NavigationActions } from "react-navigation";
import { NavigationParams, NavigationRoute } from "react-navigation";

const initialRoute = "Home";
let _container; // eslint-disable-line
let _history = [{ routeName: initialRoute, params: null }];

function setContainer(container) {
  _container = container;
}

function navigate(routeName, params, hideFromHistory) {
  _history.push({ routeName: routeName, params: params || null });
  _container.dispatch(
    NavigationActions.navigate({
      type: "Navigation/NAVIGATE",
      routeName,
      params
    })
  );
}

function openSideMenu() {
  _container.dispatch(
    NavigationActions.navigate({
      type: "Navigation/NAVIGATE",
      routeName: "DrawerOpen",
      params: null
    })
  );
}

function getCurrentRoute() {
  return _history.length > 0 ? _history[_history.length - 1] : null;
}

function goBack() {
  if (_history.length < 1) {
    navigate("Home");
  } else if (_history.length === 1) {
    _history.pop();
    navigate("Home");
  } else {
    _history.pop();
    navigate(_history.pop().routeName);
  }
}

export default {
  setContainer,
  navigate,
  getCurrentRoute,
  goBack,
  initialRoute,
  openSideMenu
};
