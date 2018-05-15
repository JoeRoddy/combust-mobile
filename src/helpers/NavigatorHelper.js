import {
  NavigationActions,
  NavigationParams,
  NavigationRoute,
  DrawerActions
} from "react-navigation";

const initialRoute = "Home";
let _container; // eslint-disable-line
let _history = [{ routeName: initialRoute, params: null }];

function setContainer(container) {
  _container = container;
}

function navigate(routeName, params = null) {
  const r = getCurrentRoute() || {};
  if (r.routeName === routeName && r.params == params) {
    //if same route, do nothing, close sidemenu if open (cur route clicked)
    return closeSideMenu();
  }
  _history.push({ routeName, params });
  _dispatchNavigation(routeName, params);
}

function openSideMenu() {
  _container.dispatch(DrawerActions.openDrawer());
}

function closeSideMenu() {
  _container.dispatch(DrawerActions.closeDrawer());
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
