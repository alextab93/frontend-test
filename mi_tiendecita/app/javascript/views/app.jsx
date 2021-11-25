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
import LogInPage from "./LogInPage";
import ProductsPage from "./ProductsPage";
import ProductDetailPage from "./ProductDetailPage";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route
          path="/store/:storeId/products/:productId"
          component={ProductDetailPage}
        />
        <Route path="/store/:storeId/products" component={ProductsPage} />
        <Route path="*">
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
        <Route path="/login" component={LogInPage} />
        {/* <Route path="*">
          <Redirect to="/login" />
        </Route> */}
      </Switch>
    </Router>
  );
}

function MainRouter() {
  const { data: currentUser } = useCurrentUser();
  return currentUser ? <AppRouter /> : <AuthRouter />;
}

export default function MiTiendecita({ queryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading....</div>}>
        <MainRouter />
      </React.Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
