// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.png";

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const userIconRef = useRef(null);

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              setIsLoggedIn(true);
              setUserName(user.name);
            } else {
              setIsLoggedIn(false);
              setUserName("");
            }
        }
        checkUser();
        window.addEventListener("user-login", checkUser);
        return () => {
            window.removeEventListener("user-login", checkUser);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                userIconRef.current &&
                !userIconRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserName("");
        setDropdownVisible(false);
        navigate('/');
    };

    const handleUserIconClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleBurgerMenuClick = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const handleRegisterClick = () => {
        setDropdownVisible(false);
        setMobileMenuVisible(false);
        navigate('/register');
    };

    const handleLoginClick = () => {
        setDropdownVisible(false);
        setMobileMenuVisible(false);
        navigate('/login');
    };

    // Navigation Links Component
    const NavigationLinks = ({ isMobile }) => {
        const baseClassName = isMobile
            ? "block w-full py-2 text-left hover:bg-gray-100"
            : "mr-4 text-gray-600 hover:text-gray-900";

        return (
            <>
                <NavLink to="/about" className={baseClassName}>
                    About
                </NavLink>
                <NavLink to="/privacy-policy" className={baseClassName}>
                    Privacy & Policy
                </NavLink>
                <NavLink to="/terms-and-conditions" className={baseClassName}>
                    Terms and Condition
                </NavLink>
            </>
        );
    };

    // User Menu Items Component
    const UserMenuItems = ({ isMobile }) => {
        const baseClassName = "block w-full py-2 text-left hover:bg-gray-100";
        
        return (
            <>
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className={baseClassName}
                    >
                        {isMobile ? "Log Out" : "Log Out"}
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleLoginClick}
                            className={baseClassName}
                        >
                            {isMobile ? "Sign In" : "Log In"}
                        </button>
                        <button
                            onClick={handleRegisterClick}
                            className={baseClassName}
                        >
                            Register Now
                        </button>
                    </>
                )}
                {/* Only show Wishlist and Cart in mobile menu */}
                {isMobile && (
                    <>
                        {isLoggedIn && (
                            <NavLink to="/wishlist" className={`${baseClassName} flex items-center gap-2`}>
                                <FontAwesomeIcon icon={faHeart} className="text-lg" />
                                <span>Wishlist</span>
                            </NavLink>
                        )}
                        <NavLink to="/cart" className={`${baseClassName} flex items-center gap-2`}>
                            <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
                            <span>Cart</span>
                        </NavLink>
                    </>
                )}
            </>
        );
    };

    return (
        <header className="bg-white py-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto">
                <nav className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Company Logo" className="h-8 w-8" />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center justify-end">
                        <NavigationLinks isMobile={false} />
                    </div>

                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center justify-end space-x-4">
                        {isLoggedIn && (
                            <NavLink to="/wishlist" className="hover:text-gray-700 flex items-center gap-2">
                                <FontAwesomeIcon icon={faHeart} size="lg" />
                                <span className="text-sm">Wishlist</span>
                            </NavLink>
                        )}
                        <NavLink to="/cart" className="hover:text-gray-700 flex items-center gap-2">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                            <span className="text-sm">Cart</span>
                        </NavLink>
                        
                        {/* User Icon and Name */}
                        <div className="relative flex items-center">
                            <button
                                ref={userIconRef}
                                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                                onClick={handleUserIconClick}
                            >
                                <FontAwesomeIcon icon={faUser} size="lg" />
                            </button>
                            {userName && (
                                <div className="userName ml-2 text-sm font-medium text-gray-700">
                                    {userName}
                                </div>
                            )}
                            
                            {/* Desktop Dropdown Menu */}
                            <div
                                ref={dropdownRef}
                                className={`absolute top-full right-0 bg-white shadow-md p-4 w-48 z-50 ${
                                    dropdownVisible ? "block" : "hidden"
                                }`}
                            >
                                <UserMenuItems isMobile={false} />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                        onClick={handleBurgerMenuClick}
                    >
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </button>

                    {/* Mobile Menu */}
                    <div
                        className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 z-50 ${
                            mobileMenuVisible ? "block" : "hidden"
                        }`}
                    >
                        <div className="flex flex-col space-y-2">
                            <UserMenuItems isMobile={true} />
                            <div className="border-t border-gray-200 my-2"></div>
                            <NavigationLinks isMobile={true} />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
