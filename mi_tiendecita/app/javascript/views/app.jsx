import React from "react";
import { QueryClientProvider } from "react-query";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "./Home";
import List from "./List";

export default function MiTiendecita({ queryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/list" component={List} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
