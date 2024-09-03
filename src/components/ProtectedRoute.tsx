import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSelector((c: any) => c.users);
  console.log("protected.. ", user);

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
