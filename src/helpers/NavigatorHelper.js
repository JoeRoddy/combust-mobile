import { NavigationActions } from "react-navigation";
import { NavigationParams, NavigationRoute } from "react-navigation";

const initialRoute = "Home";
let _container; // eslint-disable-line
let _history = [initialRoute];

function setContainer(container) {
  _container = container;
}

function reset(routeName, params) {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName,
          params
        })
      ]
    })
  );
}

function navigate(routeName, params, hideFromHistory) {
  console.log("navigate:", routeName);

  !hideFromHistory && _history.push(routeName);
  _container.dispatch(
    NavigationActions.navigate({
      type: "Navigation/NAVIGATE",
      routeName,
      params
    })
  );
}

function navigateDeep(actions) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName: action.routeName,
          params: action.params,
          action: prevAction
        }),
      undefined
    )
  );
}

function openDrawer() {
  navigate("DrawerOpen", null, true);
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
    navigate(_history.pop());
  }
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
  goBack,
  initialRoute,
  openDrawer
};
