//! much of this page is commented out temporarily!!!!
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { ModalProvider, Modal } from "../context/Modal"; //!I am currently not using any modals - FOR FUTURE USE!!!!
import { thunkAuthenticate } from "../redux/session"; 
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  //used ot prevent the user from being logged out on page reload
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {<Outlet />} {/* IsLoaded was removed!!!! */}
    </>
  );
}
