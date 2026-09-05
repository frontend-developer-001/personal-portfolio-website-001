/* =========================================================
   PORTFOLIO JAVASCRIPT
   Alina Faizan Ali
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const header =
        document.getElementById("site-header");

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const navOverlay =
        document.getElementById("nav-overlay");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.getElementById("theme-icon");

    const revealElements =
        document.querySelectorAll(".reveal");

    const sections =
        document.querySelectorAll("main section[id]");

    const contactForm =
        document.getElementById("contact-form");

    const formNote =
        document.getElementById("form-note");

    const toast =
        document.getElementById("toast");

    const placeholderLinks =
        document.querySelectorAll(
            "[data-placeholder-link]"
        );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        navMenu.classList.add("open");

        navOverlay.classList.add("open");

        menuToggle.classList.add("open");

        body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    }


    function closeMenu() {

        navMenu.classList.remove("open");

        navOverlay.classList.remove("open");

        menuToggle.classList.remove("open");

        body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.contains("open");

                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    if (navOverlay) {

        navOverlay.addEventListener(
            "click",
            closeMenu
        );

    }


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("open")
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       ACTIVE NAVIGATION ITEM
    ===================================================== */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.32;

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    function applyTheme(theme) {

        if (theme === "light") {

            body.classList.add(
                "light-theme"
            );

            themeIcon.textContent = "☾";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        } else {

            body.classList.remove(
                "light-theme"
            );

            themeIcon.textContent = "☼";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        }

    }


    if (savedTheme) {

        applyTheme(savedTheme);

    } else {

        /*
         * Dark mode is the default because it matches
         * the primary visual identity of the portfolio.
         */

        applyTheme("dark");

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    body.classList.contains(
                        "light-theme"
                    );

                const newTheme =
                    isLight ? "dark" : "light";

                applyTheme(newTheme);

                localStorage.setItem(
                    "portfolio-theme",
                    newTheme
                );

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       SMOOTH SCROLL
       This provides JS support in addition to CSS
       smooth scrolling.
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {

                    return;

                }


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       PLACEHOLDER PROJECT LINKS
    ===================================================== */

    // placeholderLinks.forEach(link => {

    //     link.addEventListener(
    //         "click",
    //         event => {

    //             event.preventDefault();

    //             showToast(
    //                 "Live Demo link will be added here."
    //             );

    //         }
    //     );

    // });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();

                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();

                const message =
                    document.getElementById(
                        "message"
                    ).value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    formNote.textContent =
                        "Please complete all fields.";

                    return;

                }


                /*
                 * Since this portfolio currently has
                 * no backend/email service, the form
                 * prepares an email using mailto.
                 */

                const subject =
                    encodeURIComponent(
                        `Portfolio Contact from ${name}`
                    );


                const bodyText =
                    encodeURIComponent(
                        `Name: ${name}\n\n` +
                        `Email: ${email}\n\n` +
                        `Message:\n${message}`
                    );


                const mailto =
                    `mailto:alinafaizanali@gmail.com` +
                    `?subject=${subject}` +
                    `&body=${bodyText}`;


                window.location.href =
                    mailto;


                formNote.textContent =
                    "Opening your email application...";

            }
        );

    }


    /* =====================================================
       TOAST MESSAGE
    ===================================================== */

    let toastTimer;


    function showToast(message) {

        if (!toast) {

            return;

        }


        toast.textContent =
            message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                3000
            );

    }


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                navMenu.classList.contains("open")
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       PREVENT HASH JUMP FOR PLACEHOLDER LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    link.hasAttribute(
                        "data-placeholder-link"
                    )
                ) {

                    event.preventDefault();

                }

            }
        );

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY FOR MOBILE MENU
    ===================================================== */

    navMenu.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

                menuToggle.focus();

            }

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateHeader();
    updateActiveNavigation();

});