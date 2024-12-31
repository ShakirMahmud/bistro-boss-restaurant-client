import { Link } from "react-router-dom";

const Navbar = () => {
    const links = <>
        <li><a>Item 1</a></li>
        <li></li>
        <li><a>Item 3</a></li>

    </>
    return (
        <div className="">
            <div className="navbar  fixed text-white px-2 lg:px-14 py-2 lg:py-4 bg-[#15151580] z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {links}
                        </ul>
                    </div>
                    <div>
                        <Link><h1 className="text-2xl font-bold">Bistro Boss</h1>
                    <p className="text-sm">R E S T A U R A N T</p>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;