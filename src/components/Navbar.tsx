import React, { ReactNode } from "react";

import { Link } from "react-router-dom";

type NavbarProps = {
    children: ReactNode;
};


const Navbar = ({
    children,
  }: NavbarProps) => {
    return (
        <nav className="navbar-light bg-light">
            <div className="px-4 py-2">
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <a className="navbar-brand" id="app-title" href="/">Plot Luck</a>
                    {children}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;