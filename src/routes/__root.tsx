import * as React from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RouterContext } from "../types/routerContextType";
import Toast from "../components/ui/Toast";
import NotFound from "../components/NotFound";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      <Toast />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools initialIsOpen={false} />
    </React.Fragment>
  ),
  notFoundComponent: NotFound,
});
