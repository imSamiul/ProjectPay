import * as React from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RouterContext } from "../types/routerContextType";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools initialIsOpen={false} />
    </React.Fragment>
  ),
  notFoundComponent: () => (
    <div>Freak! make a component first. Useless Developer.</div>
  ),
});
