/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticationLoginImport } from './routes/_authentication/login'
import { Route as AuthenticatedProjectManagerImport } from './routes/_authenticated/projectManager'
import { Route as AuthenticationSignUpIndexImport } from './routes/_authentication/signUp/index'
import { Route as AuthenticationSignUpAddOtherInfoImport } from './routes/_authentication/signUp/addOtherInfo'
import { Route as AuthenticationSignUpOAuthSuccessImport } from './routes/_authentication/signUp/OAuthSuccess'
import { Route as AuthenticatedProjectManagerProjectListImport } from './routes/_authenticated/projectManager/projectList'
import { Route as AuthenticatedProjectManagerManagerOverviewImport } from './routes/_authenticated/projectManager/managerOverview'
import { Route as AuthenticatedProjectManagerAddProjectImport } from './routes/_authenticated/projectManager/addProject'
import { Route as AuthenticatedProjectManagerAddClientImport } from './routes/_authenticated/projectManager/addClient'
import { Route as AuthenticatedProjectProjectCodeImport } from './routes/_authenticated/project/$projectCode'
import { Route as AuthenticatedProjectEditProjectCodeImport } from './routes/_authenticated/project/edit/$projectCode'

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
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationLoginRoute = AuthenticationLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticatedProjectManagerRoute =
  AuthenticatedProjectManagerImport.update({
    id: '/projectManager',
    path: '/projectManager',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticationSignUpIndexRoute = AuthenticationSignUpIndexImport.update({
  id: '/signUp/',
  path: '/signUp/',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationSignUpAddOtherInfoRoute =
  AuthenticationSignUpAddOtherInfoImport.update({
    id: '/signUp/addOtherInfo',
    path: '/signUp/addOtherInfo',
    getParentRoute: () => AuthenticationRoute,
  } as any)

const AuthenticationSignUpOAuthSuccessRoute =
  AuthenticationSignUpOAuthSuccessImport.update({
    id: '/signUp/OAuthSuccess',
    path: '/signUp/OAuthSuccess',
    getParentRoute: () => AuthenticationRoute,
  } as any)

const AuthenticatedProjectManagerProjectListRoute =
  AuthenticatedProjectManagerProjectListImport.update({
    id: '/projectList',
    path: '/projectList',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectManagerManagerOverviewRoute =
  AuthenticatedProjectManagerManagerOverviewImport.update({
    id: '/managerOverview',
    path: '/managerOverview',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectManagerAddProjectRoute =
  AuthenticatedProjectManagerAddProjectImport.update({
    id: '/addProject',
    path: '/addProject',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectManagerAddClientRoute =
  AuthenticatedProjectManagerAddClientImport.update({
    id: '/addClient',
    path: '/addClient',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectProjectCodeRoute =
  AuthenticatedProjectProjectCodeImport.update({
    id: '/project/$projectCode',
    path: '/project/$projectCode',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedProjectEditProjectCodeRoute =
  AuthenticatedProjectEditProjectCodeImport.update({
    id: '/project/edit/$projectCode',
    path: '/project/edit/$projectCode',
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
    '/_authenticated/projectManager': {
      id: '/_authenticated/projectManager'
      path: '/projectManager'
      fullPath: '/projectManager'
      preLoaderRoute: typeof AuthenticatedProjectManagerImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authentication/login': {
      id: '/_authentication/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthenticationLoginImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authenticated/project/$projectCode': {
      id: '/_authenticated/project/$projectCode'
      path: '/project/$projectCode'
      fullPath: '/project/$projectCode'
      preLoaderRoute: typeof AuthenticatedProjectProjectCodeImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/projectManager/addClient': {
      id: '/_authenticated/projectManager/addClient'
      path: '/addClient'
      fullPath: '/projectManager/addClient'
      preLoaderRoute: typeof AuthenticatedProjectManagerAddClientImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authenticated/projectManager/addProject': {
      id: '/_authenticated/projectManager/addProject'
      path: '/addProject'
      fullPath: '/projectManager/addProject'
      preLoaderRoute: typeof AuthenticatedProjectManagerAddProjectImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authenticated/projectManager/managerOverview': {
      id: '/_authenticated/projectManager/managerOverview'
      path: '/managerOverview'
      fullPath: '/projectManager/managerOverview'
      preLoaderRoute: typeof AuthenticatedProjectManagerManagerOverviewImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authenticated/projectManager/projectList': {
      id: '/_authenticated/projectManager/projectList'
      path: '/projectList'
      fullPath: '/projectManager/projectList'
      preLoaderRoute: typeof AuthenticatedProjectManagerProjectListImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authentication/signUp/OAuthSuccess': {
      id: '/_authentication/signUp/OAuthSuccess'
      path: '/signUp/OAuthSuccess'
      fullPath: '/signUp/OAuthSuccess'
      preLoaderRoute: typeof AuthenticationSignUpOAuthSuccessImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/signUp/addOtherInfo': {
      id: '/_authentication/signUp/addOtherInfo'
      path: '/signUp/addOtherInfo'
      fullPath: '/signUp/addOtherInfo'
      preLoaderRoute: typeof AuthenticationSignUpAddOtherInfoImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/signUp/': {
      id: '/_authentication/signUp/'
      path: '/signUp'
      fullPath: '/signUp'
      preLoaderRoute: typeof AuthenticationSignUpIndexImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authenticated/project/edit/$projectCode': {
      id: '/_authenticated/project/edit/$projectCode'
      path: '/project/edit/$projectCode'
      fullPath: '/project/edit/$projectCode'
      preLoaderRoute: typeof AuthenticatedProjectEditProjectCodeImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedProjectManagerRouteChildren {
  AuthenticatedProjectManagerAddClientRoute: typeof AuthenticatedProjectManagerAddClientRoute
  AuthenticatedProjectManagerAddProjectRoute: typeof AuthenticatedProjectManagerAddProjectRoute
  AuthenticatedProjectManagerManagerOverviewRoute: typeof AuthenticatedProjectManagerManagerOverviewRoute
  AuthenticatedProjectManagerProjectListRoute: typeof AuthenticatedProjectManagerProjectListRoute
}

const AuthenticatedProjectManagerRouteChildren: AuthenticatedProjectManagerRouteChildren =
  {
    AuthenticatedProjectManagerAddClientRoute:
      AuthenticatedProjectManagerAddClientRoute,
    AuthenticatedProjectManagerAddProjectRoute:
      AuthenticatedProjectManagerAddProjectRoute,
    AuthenticatedProjectManagerManagerOverviewRoute:
      AuthenticatedProjectManagerManagerOverviewRoute,
    AuthenticatedProjectManagerProjectListRoute:
      AuthenticatedProjectManagerProjectListRoute,
  }

const AuthenticatedProjectManagerRouteWithChildren =
  AuthenticatedProjectManagerRoute._addFileChildren(
    AuthenticatedProjectManagerRouteChildren,
  )

interface AuthenticatedRouteChildren {
  AuthenticatedProjectManagerRoute: typeof AuthenticatedProjectManagerRouteWithChildren
  AuthenticatedProjectProjectCodeRoute: typeof AuthenticatedProjectProjectCodeRoute
  AuthenticatedProjectEditProjectCodeRoute: typeof AuthenticatedProjectEditProjectCodeRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedProjectManagerRoute:
    AuthenticatedProjectManagerRouteWithChildren,
  AuthenticatedProjectProjectCodeRoute: AuthenticatedProjectProjectCodeRoute,
  AuthenticatedProjectEditProjectCodeRoute:
    AuthenticatedProjectEditProjectCodeRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface AuthenticationRouteChildren {
  AuthenticationLoginRoute: typeof AuthenticationLoginRoute
  AuthenticationSignUpOAuthSuccessRoute: typeof AuthenticationSignUpOAuthSuccessRoute
  AuthenticationSignUpAddOtherInfoRoute: typeof AuthenticationSignUpAddOtherInfoRoute
  AuthenticationSignUpIndexRoute: typeof AuthenticationSignUpIndexRoute
}

const AuthenticationRouteChildren: AuthenticationRouteChildren = {
  AuthenticationLoginRoute: AuthenticationLoginRoute,
  AuthenticationSignUpOAuthSuccessRoute: AuthenticationSignUpOAuthSuccessRoute,
  AuthenticationSignUpAddOtherInfoRoute: AuthenticationSignUpAddOtherInfoRoute,
  AuthenticationSignUpIndexRoute: AuthenticationSignUpIndexRoute,
}

const AuthenticationRouteWithChildren = AuthenticationRoute._addFileChildren(
  AuthenticationRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticationRouteWithChildren
  '/projectManager': typeof AuthenticatedProjectManagerRouteWithChildren
  '/login': typeof AuthenticationLoginRoute
  '/project/$projectCode': typeof AuthenticatedProjectProjectCodeRoute
  '/projectManager/addClient': typeof AuthenticatedProjectManagerAddClientRoute
  '/projectManager/addProject': typeof AuthenticatedProjectManagerAddProjectRoute
  '/projectManager/managerOverview': typeof AuthenticatedProjectManagerManagerOverviewRoute
  '/projectManager/projectList': typeof AuthenticatedProjectManagerProjectListRoute
  '/signUp/OAuthSuccess': typeof AuthenticationSignUpOAuthSuccessRoute
  '/signUp/addOtherInfo': typeof AuthenticationSignUpAddOtherInfoRoute
  '/signUp': typeof AuthenticationSignUpIndexRoute
  '/project/edit/$projectCode': typeof AuthenticatedProjectEditProjectCodeRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticationRouteWithChildren
  '/projectManager': typeof AuthenticatedProjectManagerRouteWithChildren
  '/login': typeof AuthenticationLoginRoute
  '/project/$projectCode': typeof AuthenticatedProjectProjectCodeRoute
  '/projectManager/addClient': typeof AuthenticatedProjectManagerAddClientRoute
  '/projectManager/addProject': typeof AuthenticatedProjectManagerAddProjectRoute
  '/projectManager/managerOverview': typeof AuthenticatedProjectManagerManagerOverviewRoute
  '/projectManager/projectList': typeof AuthenticatedProjectManagerProjectListRoute
  '/signUp/OAuthSuccess': typeof AuthenticationSignUpOAuthSuccessRoute
  '/signUp/addOtherInfo': typeof AuthenticationSignUpAddOtherInfoRoute
  '/signUp': typeof AuthenticationSignUpIndexRoute
  '/project/edit/$projectCode': typeof AuthenticatedProjectEditProjectCodeRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authentication': typeof AuthenticationRouteWithChildren
  '/_authenticated/projectManager': typeof AuthenticatedProjectManagerRouteWithChildren
  '/_authentication/login': typeof AuthenticationLoginRoute
  '/_authenticated/project/$projectCode': typeof AuthenticatedProjectProjectCodeRoute
  '/_authenticated/projectManager/addClient': typeof AuthenticatedProjectManagerAddClientRoute
  '/_authenticated/projectManager/addProject': typeof AuthenticatedProjectManagerAddProjectRoute
  '/_authenticated/projectManager/managerOverview': typeof AuthenticatedProjectManagerManagerOverviewRoute
  '/_authenticated/projectManager/projectList': typeof AuthenticatedProjectManagerProjectListRoute
  '/_authentication/signUp/OAuthSuccess': typeof AuthenticationSignUpOAuthSuccessRoute
  '/_authentication/signUp/addOtherInfo': typeof AuthenticationSignUpAddOtherInfoRoute
  '/_authentication/signUp/': typeof AuthenticationSignUpIndexRoute
  '/_authenticated/project/edit/$projectCode': typeof AuthenticatedProjectEditProjectCodeRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/projectManager'
    | '/login'
    | '/project/$projectCode'
    | '/projectManager/addClient'
    | '/projectManager/addProject'
    | '/projectManager/managerOverview'
    | '/projectManager/projectList'
    | '/signUp/OAuthSuccess'
    | '/signUp/addOtherInfo'
    | '/signUp'
    | '/project/edit/$projectCode'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/projectManager'
    | '/login'
    | '/project/$projectCode'
    | '/projectManager/addClient'
    | '/projectManager/addProject'
    | '/projectManager/managerOverview'
    | '/projectManager/projectList'
    | '/signUp/OAuthSuccess'
    | '/signUp/addOtherInfo'
    | '/signUp'
    | '/project/edit/$projectCode'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_authentication'
    | '/_authenticated/projectManager'
    | '/_authentication/login'
    | '/_authenticated/project/$projectCode'
    | '/_authenticated/projectManager/addClient'
    | '/_authenticated/projectManager/addProject'
    | '/_authenticated/projectManager/managerOverview'
    | '/_authenticated/projectManager/projectList'
    | '/_authentication/signUp/OAuthSuccess'
    | '/_authentication/signUp/addOtherInfo'
    | '/_authentication/signUp/'
    | '/_authenticated/project/edit/$projectCode'
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
        "/_authenticated/projectManager",
        "/_authenticated/project/$projectCode",
        "/_authenticated/project/edit/$projectCode"
      ]
    },
    "/_authentication": {
      "filePath": "_authentication.tsx",
      "children": [
        "/_authentication/login",
        "/_authentication/signUp/OAuthSuccess",
        "/_authentication/signUp/addOtherInfo",
        "/_authentication/signUp/"
      ]
    },
    "/_authenticated/projectManager": {
      "filePath": "_authenticated/projectManager.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/projectManager/addClient",
        "/_authenticated/projectManager/addProject",
        "/_authenticated/projectManager/managerOverview",
        "/_authenticated/projectManager/projectList"
      ]
    },
    "/_authentication/login": {
      "filePath": "_authentication/login.tsx",
      "parent": "/_authentication"
    },
    "/_authenticated/project/$projectCode": {
      "filePath": "_authenticated/project/$projectCode.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/projectManager/addClient": {
      "filePath": "_authenticated/projectManager/addClient.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authenticated/projectManager/addProject": {
      "filePath": "_authenticated/projectManager/addProject.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authenticated/projectManager/managerOverview": {
      "filePath": "_authenticated/projectManager/managerOverview.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authenticated/projectManager/projectList": {
      "filePath": "_authenticated/projectManager/projectList.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authentication/signUp/OAuthSuccess": {
      "filePath": "_authentication/signUp/OAuthSuccess.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/signUp/addOtherInfo": {
      "filePath": "_authentication/signUp/addOtherInfo.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/signUp/": {
      "filePath": "_authentication/signUp/index.tsx",
      "parent": "/_authentication"
    },
    "/_authenticated/project/edit/$projectCode": {
      "filePath": "_authenticated/project/edit/$projectCode.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
