import {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle, BsFillPeopleFill, BsGiftFill, BsFillBellFill, BsGeoAltFill, BsFillGearFill, BsBoxArrowRight, BsChatLeftTextFill, BsPersonFill, BsQuestionCircleFill } from "react-icons/bs";
import { useClickOutside } from "../../hooks/useClickOutside";
import isLoggedIn from "../../common/isLoggedIn";
import { logout } from "../../actions/auth";
import AuthService from "../../services/auth.service";
import { Navbar, Nav, Container, Offcanvas,  Button} from 'react-bootstrap';
import "./Header.css";

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
                                <svg className="yusra-icon" width="50" height="50" viewBox="0 0 766 878" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M393 3.48175C386.812 -0.0908928 379.188 -0.0909081 373 3.48174L10.8301 212.581C4.64212 216.153 0.830139 222.756 0.830139 229.901V281.027L383 60.3808L382.983 122.737L0.830139 343.378V405.451L162.861 311.903L162.844 374.259L0.830139 467.8V531.099L162.861 437.55L162.844 499.907L0.830139 593.447V648.099C0.830139 655.244 4.64209 661.847 10.8301 665.419L58.6737 693.042L220.882 599.391L274.808 630.754L112.762 724.27L166.839 755.491L328.853 661.952L382.779 693.316L220.927 786.719L275.027 817.954L657.019 597.411L710.883 628.666L328.941 849.081L373 874.518C379.188 878.091 386.812 878.091 393 874.518L755.17 665.419C761.358 661.847 765.17 655.244 765.17 648.099V229.901C765.17 222.756 761.358 216.153 755.17 212.581L393 3.48175ZM162.861 311.903L383 184.805L603.139 311.903V566.097L383 693.195V439L162.861 311.903Z" fill="url(#paint0_linear_3_19)"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_3_19" x1="383" y1="0.802261" x2="383" y2="877.198" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#764BA2"/>
                                            <stop offset="1" stop-color="#667DEA"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
                        <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                            <Offcanvas.Header className="offcanvas-header" closeButton>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="nav me-auto flex-grow-1 pe-3">
                                    <Nav.Link href={"/trade"} className="nav-link px-2">Торговля</Nav.Link>
                                    <Nav.Link href={"/investments"} className="nav-link px-2">Инвестиции</Nav.Link>
                                    {!isLogged &&
                                        <Nav.Link href={"/downloads"} className="nav-link px-2">Скачать</Nav.Link>
                                    }
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
                            <img style={{"width":"100%", "height":"100%"}} src="https://telegra.ph/file/2ff3ebc27de2eeb71374c.png"/>
                        </button>
                        <nav className={`menu ${menuVisible ? "active" : ""}`} ref={menuRef}>
                            <ul className="menu-list">
                                <a className="menu-item-button" href="/profile">
                                    <li className="menu-item">
                                        <BsPersonFill className="menu-icon"/>
                                        <span>Профиль</span>
                                    </li>
                                </a>
                                <li className="menu-item">
                                    <BsFillBellFill className="menu-icon"/>
                                    <span>Новости</span>
                                </li>
                                <li className="menu-item">
                                    <BsFillPeopleFill className="menu-icon"/>
                                    <span>Реферальная программа</span>
                                </li>
                                <li className="menu-item">
                                    <BsFillGearFill className="menu-icon"/>
                                    <span>Настройки</span>
                                </li>
                                <li className="menu-item">
                                    <BsQuestionCircleFill className="menu-icon"/>
                                    <span>FAQ</span>
                                </li>
                                <li className="menu-item">
                                    <BsChatLeftTextFill className="menu-icon"/>
                                    <span>Центр поддержки</span>
                                </li>
                                <li className="menu-item">
                                    <button className="menu-item-button" onClick={logOut}>
                                        <BsBoxArrowRight className="menu-icon"/>
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