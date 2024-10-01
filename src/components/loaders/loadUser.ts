import { useNavigate } from "react-router";
import { getAuthToken } from "../../utils/auth";

export function useLoader() {
  const navigate = useNavigate();

  async function loader() {
    const token = getAuthToken();

    if (!token) {
      return navigate("/authentication/login");
    }
  }

  return loader;
}
