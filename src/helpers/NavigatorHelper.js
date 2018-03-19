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
  _dispatchNavigation(routeName, params);
}

function openSideMenu() {
  //ghetto fix to solve double taps, see:
  //https://github.com/react-navigation/react-navigation/issues/1960
  _dispatchNavigation("DrawerClose");
  setTimeout(() => {
    _dispatchNavigation("DrawerOpen");
  }, 0);
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
    const route = _history.pop();
    navigate(route.routeName, route.params);
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

function _dispatchNavigation(routeName, params) {
  _container.dispatch(
    NavigationActions.navigate({
      type: "Navigation/NAVIGATE",
      routeName,
      params
    })
  );
}
