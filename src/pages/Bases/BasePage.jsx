import { Link, Outlet } from "react-router-dom"
import DesktopSideBar from "./DesktopSideBar"
import TopBar from "./TopBar"

function BasePage() {
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
    )
}

export default BasePage