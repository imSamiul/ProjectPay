import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000, // 1 second
    },
  },
});

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient: queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function Provider() {
  const auth = useAuth();
  if (auth.isLoading) {
    return null;
  }
  return <RouterProvider router={router} context={{ auth }} />;
}
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Provider />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
