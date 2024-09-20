import { Navigate, Outlet } from "react-router";
import authenticationPageImage from "../../assets/authentication-page-image.jpg";

function Authentication() {
  return (
    <div className="flex">
      <Navigate to="/authentication/login" replace={true} />
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
