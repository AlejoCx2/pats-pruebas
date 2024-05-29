import { Outlet } from "react-router-dom";
import DesktopSideBar from "../../components/SideBar/Desktop/DesktopSideBar";
import TopBar from "./TopBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUserAsync } from "../../state/user/userSlice";

function BasePage() {
  const user = useSelector((state) => state.user.value);
  const navegate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.auth) {
      let interval = setInterval(() => {
        dispatch(updateUserAsync());
      }, 240000);
      return () => clearInterval(interval);
    } else {
      toast.error("Sesión expirada");
      navegate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-row h-screen">
      <DesktopSideBar />
      <div className="flex grow flex-col h-screen">
        <TopBar />
        <main className="px-4 pt-2 pb-5 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default BasePage;
