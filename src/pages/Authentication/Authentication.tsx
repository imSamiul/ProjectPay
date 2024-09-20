import { Navigate, Outlet, useLocation } from "react-router";
import authenticationPageImage from "../../assets/authentication-page-image.jpg";

function Authentication() {
  const location = useLocation();
  const isAtRootAuthPath = location.pathname === "/authentication";
  return (
    <div className="flex">
      {isAtRootAuthPath && (
        <Navigate to="/authentication/login" replace={true} />
      )}
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
  );
}

export default Authentication;
