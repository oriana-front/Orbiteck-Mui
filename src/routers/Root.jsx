import React from 'react'
import { Outlet } from 'react-router-dom'

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <></>;

}

export default Root