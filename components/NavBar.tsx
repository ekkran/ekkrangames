'use client'

import classNames from "classnames";
import NavItem from "./NavItem";
import { useState } from "react";

type NavItemProps = {
    href: string,
    name: String
}

type navBarItems = {
    items : NavItemProps[]
}

const NavBar = (props : navBarItems) => {

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(!showMenu);
    }

    let menuItems = 0;

    return (
        <nav className=" bg-atoll-800 fixed min-w-full sm:flex sm:justify-between sm:px-4 sm:py-3 sm:items-center">
            <div  className="flex items-center justify-between px-4 py-3 sm:p-0" >
                <div className="">
                    <button className="text-atoll-100 hover:text-atoll-50 text-xl font-bold">Ekkran</button>
                </div>
                <div className="sm:hidden" >
                    <button type="button" onClick={openMenu} className="block text-atoll-300 hover:text-atoll-50 focus:text-atoll-50 focus:outline-none">
                        <svg className="h-6 w-6 stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18L20 18" fillRule="evenodd" />
                            <path d="M4 12L20 12" fillRule="evenodd" />
                            <path d="M4 6L20 6" fillRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={classNames({"px-4 py-2 sm:flex sm:p-0 sm:space-x-2":true, "hidden":!showMenu, "block":showMenu })} >
                {props.items.map((x) => {
                    menuItems++;
                    return <NavItem href={x.href} name={x.name} key={menuItems-1}></NavItem>
                })}
            </div>
        </nav>
    );
}

export default NavBar;