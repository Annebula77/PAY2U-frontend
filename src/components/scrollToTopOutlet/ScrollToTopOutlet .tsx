import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";


const ScrollToTopOutlet = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
};

export default ScrollToTopOutlet;