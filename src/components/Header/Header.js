import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPeopleFill, BsFillBellFill, BsFillGearFill, BsBoxArrowRight, BsChatLeftTextFill, BsPersonFill, BsQuestionCircleFill } from "react-icons/bs";
import { useClickOutside } from "../../hooks/useClickOutside";
import isLoggedIn from "../../utils/isLoggedIn";
import { logout } from "../../actions/auth";
import AuthService from "../../services/auth.service";
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import "./Header.css";
import { ReactComponent as HeaderLogo } from '../../images/header-logo.svg'

export default function Header() {
    const [menuVisible, setMenuVisible] = useState();
    const menuRef = useRef(null);
    const isLogged = isLoggedIn(logout);
    let navigate = useNavigate();
    useClickOutside(menuRef, () => {
        setMenuVisible(false);
    });

    const logOut = () => {
        AuthService.logout();
        navigate("/login");
    }

    useEffect(() => {
        let startTouchX = 0;
        let endTouchX = 0;
        let startTouchY = 0;
        let endTouchY = 0;

        document.addEventListener("touchstart", (event) => {
            startTouchX = event.changedTouches[0].pageX;
            startTouchY = event.changedTouches[0].pageY;
        });

        document.addEventListener("touchend", (event) => {
            endTouchX = event.changedTouches[0].pageX;
            endTouchY = event.changedTouches[0].pageY;
            if (startTouchX < 100 && Math.abs(endTouchY - startTouchY) < 40 && endTouchX < startTouchX) {
                setMenuVisible(true);
            }
            if (startTouchX < 240 && Math.abs(endTouchY - startTouchY) < 40 && endTouchX < startTouchX) {
                setMenuVisible(false);
            }
        })

    }, []);

    return (
        <>
            <header className="header">
                <Navbar sticky="top" key="lg" expand="lg" className="navigation-bar d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                    <Container fluid className="nav-container">
                        <div className="col-md-3 mb-2 mb-md-0">
                            <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                                <HeaderLogo />
                            </a>
                        </div>
                        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
                        <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                            <Offcanvas.Header className="offcanvas-header" closeButton>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="nav me-auto flex-grow-1 pe-3">
                                    <Nav.Link href={"/trade"} className="nav-link px-2">Торговля</Nav.Link>
                                    {isLogged &&
                                        <Nav.Link href={"/wallet"} className="nav-link px-2">Кошелёк</Nav.Link>
                                    }
                                    <Nav.Link href={"/profile"} className="nav-link px-2 nav-profile-link">Профиль</Nav.Link>
                                    {!isLogged &&
                                        <Button href={"/register"} className="register-btn register-link btn-secondary">РЕГИСТРАЦИЯ</Button>
                                    }
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                {isLogged &&
                    <>
                        <button className="menu-button" onClick={() => setMenuVisible(!menuVisible)}>
                            <img alt="" style={{ "width": "100%", "height": "100%" }} src="https://telegra.ph/file/2ff3ebc27de2eeb71374c.png" />
                        </button>
                        <nav className={`menu ${menuVisible ? "active" : ""}`} ref={menuRef}>
                            <ul className="menu-list">
                                <a className="menu-item-button" href="/profile">
                                    <li className="menu-item">
                                        <BsPersonFill className="menu-icon" />
                                        <span>Профиль</span>
                                    </li>
                                </a>
                                <li className="menu-item">
                                    <BsFillBellFill className="menu-icon" />
                                    <span>Новости</span>
                                </li>
                                <li className="menu-item">
                                    <BsFillPeopleFill className="menu-icon" />
                                    <span>Реферальная программа</span>
                                </li>
                                <li className="menu-item">
                                    <BsFillGearFill className="menu-icon" />
                                    <span>Настройки</span>
                                </li>
                                <li className="menu-item">
                                    <BsQuestionCircleFill className="menu-icon" />
                                    <span>FAQ</span>
                                </li>
                                <li className="menu-item">
                                    <BsChatLeftTextFill className="menu-icon" />
                                    <span>Центр поддержки</span>
                                </li>
                                <li className="menu-item">
                                    <button className="menu-item-button" onClick={logOut}>
                                        <BsBoxArrowRight className="menu-icon" />
                                        <span>Выход</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                }
            </header>
        </>
    );
}