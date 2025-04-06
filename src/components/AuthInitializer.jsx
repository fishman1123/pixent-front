// AuthInitializer.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../store/authSlice";

/**
 * Checks localStorage for 'gToken', verifies token if present.
 */
function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
