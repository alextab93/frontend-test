import React from "react";
import { render } from "react-dom";
import { QueryClient } from "react-query";
import Application from "views/app";
import "styles/application.css";

const queryClient = new QueryClient();

render(
  <Application queryClient={queryClient} />,
  document.querySelector("#root")
);
