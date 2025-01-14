import * as React from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Toast from '../components/ui/Toast';
import NotFound from '../components/NotFound';

import { QueryClient } from '@tanstack/react-query';
import { AuthContextType } from '../context/AuthContext';

interface MyRouterContext {
  auth: AuthContextType;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
