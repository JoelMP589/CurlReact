import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Route } from "react-router-dom";
import { Consola } from "./components/Consola";
import AppTopBar from "./AppTopbar";
import AppFooter from "./AppFooter";
import AppConfig from "./AppConfig";
import AppMenu from "./AppMenu";
import AppSearch from "./AppSearch";
import AppRightMenu from "./AppRightMenu";
import PrimeReact from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.scss";


const App = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState("static");
    const [colorScheme, setColorScheme] = useState("dim");
    const [menuTheme, setMenuTheme] = useState("layout-sidebar-darkgray");
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(false);

    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    const menu = [
        {
            label: "Consola",
            icon: "pi pi-folderpi pi-fw pi-align-left",
            items: [

                { label: 'Consola', icon: 'pi pi-folderpi pi-fw pi-align-left', to: "/Consola", },
            ]
        },
        { separator: true },
    ];

    const routers = [
        { path: '/Consola', component: Consola, meta: { breadcrumb: [{ parent: 'Operación', label: 'Consola' }] } }

    ];

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        } else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!userMenuClick) {
            setTopbarUserMenuActive(false);
        }

        if (!notificationMenuClick) {
            setTopbarNotificationMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (!menuClick) {
            if (isSlim()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        searchClick = false;
        configClick = false;
        userMenuClick = false;
        rightMenuClick = false;
        notificationMenuClick = false;
        menuClick = false;
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setTopbarNotificationMenuActive(false);
        setRightMenuActive(false);

        if (isOverlay()) {
            setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
        } else {
            setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
        }

        event.preventDefault();
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const onMenuThemeChange = (name) => {
        setMenuTheme("layout-sidebar-" + name);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
    };

    const onColorSchemeChange = (e) => {
        setColorScheme(e.value);
    };

    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive((prevTopbarUserMenuActive) => !prevTopbarUserMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        notificationMenuClick = true;
        setTopbarNotificationMenuActive((prevTopbarNotificationMenuActive) => !prevTopbarNotificationMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const toggleSearch = () => {
        setSearchActive((prevSearchActive) => !prevSearchActive);
        searchClick = true;
    };

    const onSearchClick = () => {
        searchClick = true;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightMenuActive((prevRightMenuActive) => !prevRightMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add("blocked-scroll");
        } else {
            document.body.className += " blocked-scroll";
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove("blocked-scroll");
        } else {
            document.body.className = document.body.className.replace(new RegExp("(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
    };

    const isSlim = () => {
        return menuMode === "slim";
    };

    const isOverlay = () => {
        return menuMode === "overlay";
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const containerClassName = classNames(
        "layout-wrapper",
        {
            "layout-overlay": menuMode === "overlay",
            "layout-static": menuMode === "static",
            "layout-slim": menuMode === "slim",
            "layout-sidebar-dim": colorScheme === "dim",
            "layout-sidebar-dark": colorScheme === "dark",
            "layout-overlay-active": overlayMenuActive,
            "layout-mobile-active": staticMenuMobileActive,
            "layout-static-inactive": staticMenuDesktopInactive && menuMode === "static",
            "p-input-filled": inputStyle === "filled",
            "p-ripple-disabled": !ripple,
        },
        colorScheme === "light" ? menuTheme : ""
    );

    return (
        <div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
            <div className="layout-content-wrapper">
                <AppTopBar
                    routers={routers}
                    topbarNotificationMenuActive={topbarNotificationMenuActive}
                    topbarUserMenuActive={topbarUserMenuActive}
                    onMenuButtonClick={onMenuButtonClick}
                    onSearchClick={toggleSearch}
                    onTopbarNotification={onTopbarNotificationMenuButtonClick}
                    onTopbarUserMenu={onTopbarUserMenuButtonClick}
                    onRightMenuClick={onRightMenuButtonClick}
                    onRightMenuButtonClick={onRightMenuButtonClick}
                ></AppTopBar>

                <div className="layout-content">
                    {routers.map((router, index) => {
                        if (router.exact) {
                            return <Route key={`router${index}`} path={router.path} exact component={router.component} />;
                        }

                        return <Route key={`router${index}`} path={router.path} component={router.component} />;
                    })}
                </div>

                <AppFooter />
            </div>

            <AppMenu model={menu} menuMode={menuMode} active={menuActive} mobileMenuActive={staticMenuMobileActive} onMenuClick={onMenuClick} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick}></AppMenu>

            <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick}></AppRightMenu>

            <AppConfig
                configActive={configActive}
                menuMode={menuMode}
                onMenuModeChange={onMenuModeChange}
                menuTheme={menuTheme}
                onMenuThemeChange={onMenuThemeChange}
                colorScheme={colorScheme}
                onColorSchemeChange={onColorSchemeChange}
                onConfigClick={onConfigClick}
                onConfigButtonClick={onConfigButtonClick}
                rippleActive={ripple}
                onRippleChange={onRippleChange}
                inputStyle={inputStyle}
                onInputStyleChange={onInputStyleChange}
            ></AppConfig>

            <AppSearch searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide} />

            <div className="layout-mask modal-in"></div>
        </div>
    );
};

export default App;
