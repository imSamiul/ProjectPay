/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticationSignUpImport } from './routes/_authentication/signUp'
import { Route as AuthenticationLoginImport } from './routes/_authentication/login'
import { Route as AuthenticatedTest2Import } from './routes/_authenticated/test2'
import { Route as AuthenticatedTestImport } from './routes/_authenticated/test'
import { Route as AuthenticatedIndex2Import } from './routes/_authenticated/index2'

// Create/Update Routes

const AuthenticationRoute = AuthenticationImport.update({
  id: '/_authentication',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationSignUpRoute = AuthenticationSignUpImport.update({
  path: '/signUp',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationLoginRoute = AuthenticationLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticatedTest2Route = AuthenticatedTest2Import.update({
  path: '/test2',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTestRoute = AuthenticatedTestImport.update({
  path: '/test',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedIndex2Route = AuthenticatedIndex2Import.update({
  path: '/index2',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authentication': {
      id: '/_authentication'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/index2': {
      id: '/_authenticated/index2'
      path: '/index2'
      fullPath: '/index2'
      preLoaderRoute: typeof AuthenticatedIndex2Import
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/test': {
      id: '/_authenticated/test'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof AuthenticatedTestImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/test2': {
      id: '/_authenticated/test2'
      path: '/test2'
      fullPath: '/test2'
      preLoaderRoute: typeof AuthenticatedTest2Import
      parentRoute: typeof AuthenticatedImport
    }
    '/_authentication/login': {
      id: '/_authentication/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthenticationLoginImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/signUp': {
      id: '/_authentication/signUp'
      path: '/signUp'
      fullPath: '/signUp'
      preLoaderRoute: typeof AuthenticationSignUpImport
      parentRoute: typeof AuthenticationImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedIndex2Route: typeof AuthenticatedIndex2Route
  AuthenticatedTestRoute: typeof AuthenticatedTestRoute
  AuthenticatedTest2Route: typeof AuthenticatedTest2Route
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedIndex2Route: AuthenticatedIndex2Route,
  AuthenticatedTestRoute: AuthenticatedTestRoute,
  AuthenticatedTest2Route: AuthenticatedTest2Route,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface AuthenticationRouteChildren {
  AuthenticationLoginRoute: typeof AuthenticationLoginRoute
  AuthenticationSignUpRoute: typeof AuthenticationSignUpRoute
}

const AuthenticationRouteChildren: AuthenticationRouteChildren = {
  AuthenticationLoginRoute: AuthenticationLoginRoute,
  AuthenticationSignUpRoute: AuthenticationSignUpRoute,
}

const AuthenticationRouteWithChildren = AuthenticationRoute._addFileChildren(
  AuthenticationRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticationRouteWithChildren
  '/index2': typeof AuthenticatedIndex2Route
  '/test': typeof AuthenticatedTestRoute
  '/test2': typeof AuthenticatedTest2Route
  '/login': typeof AuthenticationLoginRoute
  '/signUp': typeof AuthenticationSignUpRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticationRouteWithChildren
  '/index2': typeof AuthenticatedIndex2Route
  '/test': typeof AuthenticatedTestRoute
  '/test2': typeof AuthenticatedTest2Route
  '/login': typeof AuthenticationLoginRoute
  '/signUp': typeof AuthenticationSignUpRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authentication': typeof AuthenticationRouteWithChildren
  '/_authenticated/index2': typeof AuthenticatedIndex2Route
  '/_authenticated/test': typeof AuthenticatedTestRoute
  '/_authenticated/test2': typeof AuthenticatedTest2Route
  '/_authentication/login': typeof AuthenticationLoginRoute
  '/_authentication/signUp': typeof AuthenticationSignUpRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/index2' | '/test' | '/test2' | '/login' | '/signUp'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/index2' | '/test' | '/test2' | '/login' | '/signUp'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_authentication'
    | '/_authenticated/index2'
    | '/_authenticated/test'
    | '/_authenticated/test2'
    | '/_authentication/login'
    | '/_authentication/signUp'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AuthenticationRoute: typeof AuthenticationRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AuthenticationRoute: AuthenticationRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/_authentication"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/index2",
        "/_authenticated/test",
        "/_authenticated/test2"
      ]
    },
    "/_authentication": {
      "filePath": "_authentication.tsx",
      "children": [
        "/_authentication/login",
        "/_authentication/signUp"
      ]
    },
    "/_authenticated/index2": {
      "filePath": "_authenticated/index2.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/test": {
      "filePath": "_authenticated/test.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/test2": {
      "filePath": "_authenticated/test2.tsx",
      "parent": "/_authenticated"
    },
    "/_authentication/login": {
      "filePath": "_authentication/login.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/signUp": {
      "filePath": "_authentication/signUp.tsx",
      "parent": "/_authentication"
    }
  }
}
ROUTE_MANIFEST_END */