import React from "react";
import { QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { useCurrentUser } from "_queries";

import Home from "./Home";
import LogIn from "./LogIn";
import List from "./List";

function LoggedInRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />
      </Switch>
    </Router>
  );
}

function AuthRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </Router>
  );
}

function MainRouter() {
  const { data: currentUser } = useCurrentUser();
  return currentUser ? <LoggedInRouter /> : <AuthRouter />;
}

export default function MiTiendecita({ queryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
