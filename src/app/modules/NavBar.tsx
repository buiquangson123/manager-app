import { Link } from "react-router-dom"
import NavItem from "./common/component/NavItem"
import { user } from '../stores/sliceMemberInfor/index'

interface NavBar {
    stateAccount: user
}

const NavBar = ({ stateAccount }: NavBar) => {
    return (
        <div className="Nav fixed top-0 left-0 bottom-0 w-[300px] shadow-xl">
            <div className="flex my-3 justify-center">
                <img
                    src={`${stateAccount.id >= 0 ? "https://haycafe.vn/wp-content/uploads/2021/12/Hinh-nen-cute-338x600.jpg" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLhlPE0gXGOoAq3qU3GHKSS2Ih3VQDLzZ6GQ&usqp=CAU"}`}
                   
                    alt="error img"
                    className="w-[40px] h-[40px] rounded-[100%]"
                />
                {stateAccount && (
                    <span className="leading-10 ml-3 text-gray-500 text-xl font-semibold uppercase">
                        {stateAccount.name}
                    </span>
                )}
            </div>
            <div className="border w-[65%] border-stone-500r m-auto"></div>
            <div className="mx-5 mt-5">
                <ul className="list-none ">
                    <Link to="/">
                        <NavItem
                            icon={"fa-table"}
                            title={"Profile Table"}
                            active={false}  
                        />

                    </Link>

                    {stateAccount.role === "staff" && 
                        <Link to='/staff-edit' state={{ stateAccount: stateAccount }} >
                            <NavItem
                            icon={"fa-pen-to-square"}
                                title={"Edit Information"}
                                active={false}
                            />
                        </Link>
                    }

                    <NavItem
                        icon={"fa-bell"}
                        title={"Notification"}
                        active={false}
                    />

                    <NavItem icon={"fa-gear"} title={"Setting"} active={false} />

                    <Link to="/login" onClick={() => localStorage.clear()}>
                        <NavItem
                            icon={"fa-right-from-bracket"}
                            title={stateAccount.id >= 0  ? "Logout" : "Login"}
                            active={false}
                        />
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default NavBar