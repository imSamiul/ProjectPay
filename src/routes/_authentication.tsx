import { createFileRoute, Outlet } from '@tanstack/react-router'
import authenticationPageImage from '../assets/authentication-page-image.jpg'

export const Route = createFileRoute('/_authentication')({
  component: AuthenticationLayout,
})

function AuthenticationLayout() {
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <div className="flex-1 h-screen">
        <img
          src={authenticationPageImage}
          alt="authentication page image"
          className="h-full"
        />
      </div>
    </div>
  )
}
