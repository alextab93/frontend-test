import React from "react";
import { QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { useSession } from "_queries";

import Home from "./Home";
import LogInPage from "./LogInPage";
import ProductsPage from "./ProductsPage";
import ProductDetailPage from "./ProductDetailPage";
import LoadingScreen from "./LoadingScreen";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/store/:storeId/products/:productId"
          component={ProductDetailPage}
        />
        <Route path="/store/:storeId/products" component={ProductsPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

function AuthRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

function MainRouter() {
  const { data: session } = useSession();
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      {session ? <AppRouter /> : <AuthRouter />}
    </React.Suspense>
  );
}

export default function MiTiendecita({ queryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
