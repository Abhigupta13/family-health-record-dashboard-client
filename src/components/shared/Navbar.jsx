import React from "react";

const Navbar = () => {
  return (
    <div className="w-full max-w-7xl">
        <div>
            <ul className="flex font-medium items-center gap-5">
                <li>Home</li>
                <li>Dashboard</li>
                <li>Features</li>
                <li>Profile</li>
            </ul>
        </div>
    </div>
  );
};

export default Navbar;
