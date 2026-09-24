document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       BASIC SETTINGS
    ===================================================== */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       BOOT SCREEN
    ===================================================== */

    const bootScreen =
        document.getElementById("boot-screen");

    const bootMessage =
        document.getElementById("boot-message");

    const bootProgress =
        document.getElementById("boot-progress-bar");


    const bootTexts = [
        "INITIALIZING...",
        "LOADING CORE...",
        "LOADING DIGITAL SPACE...",
        "CONNECTING SYSTEMS...",
        "ACTIVATING NGB...",
        "SYSTEM READY."
    ];


    function finishBoot() {

        if (!bootScreen) {
            showWebsite();
            return;
        }

        if (bootMessage) {
            bootMessage.textContent =
                "SYSTEM READY.";
        }

        if (bootProgress) {
            bootProgress.style.width = "100%";
        }

        bootScreen.classList.add("boot-complete");

        document.body.classList.add(
            "system-ready"
        );

        /*
         * Give CSS animation time to finish,
         * then completely remove boot screen.
         */

        setTimeout(() => {

            bootScreen.style.opacity = "0";
            bootScreen.style.visibility = "hidden";
            bootScreen.style.pointerEvents = "none";

        }, 700);


        setTimeout(() => {

            bootScreen.style.display = "none";

            showWebsite();

        }, 1200);
    }


    function showWebsite() {

        document.body.classList.add(
            "page-loaded"
        );

        /*
         * IMPORTANT:
         * Make every reveal element visible.
         * This prevents the blank-page problem
         * if reveal CSS/observer fails.
         */

        document
            .querySelectorAll(".reveal")
            .forEach(element => {

                element.classList.add(
                    "reveal-visible"
                );

                element.style.opacity = "1";
                element.style.visibility =
                    "visible";

            });
    }


    /*
     * Boot animation
     */

    if (bootScreen) {

        let progress = 0;
        let textIndex = 0;

        const bootTimer =
            setInterval(() => {

                progress +=
                    Math.floor(
                        Math.random() * 12
                    ) + 8;

                if (progress >= 100) {
                    progress = 100;
                }

                if (bootProgress) {
                    bootProgress.style.width =
                        progress + "%";
                }


                const nextIndex =
                    Math.min(
                        Math.floor(
                            progress / 18
                        ),
                        bootTexts.length - 1
                    );


                if (
                    nextIndex !== textIndex &&
                    bootMessage
                ) {

                    textIndex = nextIndex;

                    bootMessage.textContent =
                        bootTexts[textIndex];
                }


                if (progress >= 100) {

                    clearInterval(bootTimer);

                    setTimeout(
                        finishBoot,
                        400
                    );
                }

            }, 300);


        /*
         * Emergency fallback.
         * Loader can NEVER remain forever.
         */

        setTimeout(() => {

            clearInterval(bootTimer);

            finishBoot();

        }, 5000);

    } else {

        showWebsite();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menu-button");

    const nav =
        document.querySelector(".nav-links");


    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.contains(
                        "mobile-open"
                    );


                if (isOpen) {

                    nav.classList.remove(
                        "mobile-open"
                    );

                    nav.classList.remove(
                        "active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    nav.classList.add(
                        "mobile-open"
                    );

                    /*
                     * Add both classes for
                     * compatibility with CSS.
                     */

                    nav.classList.add(
                        "active"
                    );

                    menuButton.classList.add(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "true"
                    );
                }

            }
        );


        /*
         * Close menu after clicking link
         */

        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "mobile-open",
                            "active"
                        );

                        menuButton.classList.remove(
                            "active"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                );

            });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            reduceMotion
                                ? "auto"
                                : "smooth",

                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       REVEAL SYSTEM
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    /*
     * First make sure nothing stays
     * permanently invisible.
     */

    revealElements.forEach(element => {

        element.classList.add(
            "reveal-visible"
        );

        element.style.visibility =
            "visible";

        element.style.opacity =
            "1";
    });


    /* =====================================================
       ACTIVE NAV
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-links .nav-link"
        );


    if (
        sections.length &&
        navItems.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        navItems.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                "#" + entry.target.id
                            ) {

                                link.classList.add(
                                    "active"
                                );
                            }

                        });

                    });

                },
                {
                    threshold: 0.45
                }
            );


        sections.forEach(section => {
            observer.observe(section);
        });
    }


    /* =====================================================
       HERO 3D MOVEMENT
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroObject =
        document.getElementById(
            "hero-object"
        );


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    if (
        hero &&
        heroObject &&
        !reduceMotion
    ) {

        hero.addEventListener(
            "pointermove",
            event => {

                const rect =
                    hero.getBoundingClientRect();


                mouseX =
                    (
                        (event.clientX -
                            rect.left) /
                            rect.width -
                        0.5
                    ) * 2;


                mouseY =
                    (
                        (event.clientY -
                            rect.top) /
                            rect.height -
                        0.5
                    ) * 2;
            }
        );


        hero.addEventListener(
            "pointerleave",
            () => {

                mouseX = 0;
                mouseY = 0;
            }
        );


        function animateHero() {

            currentX +=
                (mouseX - currentX) *
                0.05;


            currentY +=
                (mouseY - currentY) *
                0.05;


            heroObject.style.transform =
                `
                rotateX(${currentY * -6}deg)
                rotateY(${currentX * 8}deg)
                translateZ(15px)
                `;


            requestAnimationFrame(
                animateHero
            );
        }


        animateHero();
    }


    /* =====================================================
       PROJECT CARD 3D TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (!reduceMotion) {

        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height;


                    const rotateY =
                        (x - 0.5) * 8;


                    const rotateX =
                        (0.5 - y) * 8;


                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-6px)
                        `;


                    card.style.setProperty(
                        "--mouse-x",
                        x * 100 + "%"
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        y * 100 + "%"
                    );

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform = "";

                }
            );

        });
    }


    /* =====================================================
       SKILLS
    ===================================================== */

    const skillNodes =
        document.querySelectorAll(
            ".skill-node"
        );


    const skillTitle =
        document.getElementById(
            "skill-info-title"
        );


    const skillText =
        document.getElementById(
            "skill-info-text"
        );


    const skills = {

        HTML: [
            "HTML",
            "Structure of modern web pages and digital interfaces."
        ],

        CSS: [
            "CSS",
            "Layouts, responsive design, visual effects and animations."
        ],

        JAVASCRIPT: [
            "JAVASCRIPT",
            "Programming logic, interaction and dynamic web applications."
        ],

        PYTHON: [
            "PYTHON",
            "Programming, automation, AI and data-related systems."
        ],

        AI: [
            "AI",
            "Exploring artificial intelligence and intelligent systems."
        ],

        CYBERSECURITY: [
            "CYBERSECURITY",
            "Learning digital security, systems, networks and safe computing."
        ]
    };


    skillNodes.forEach(node => {

        const activateSkill =
            () => {

                const name =
                    node.dataset.skill;


                const data =
                    skills[name];


                if (!data) {
                    return;
                }


                skillNodes.forEach(item => {

                    item.classList.remove(
                        "skill-active"
                    );

                });


                node.classList.add(
                    "skill-active"
                );


                if (skillTitle) {
                    skillTitle.textContent =
                        data[0];
                }


                if (skillText) {
                    skillText.textContent =
                        data[1];
                }
            };


        node.addEventListener(
            "click",
            activateSkill
        );


        node.addEventListener(
            "mouseenter",
            activateSkill
        );

    });


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursor =
        document.getElementById(
            "cursor-glow"
        );


    if (
        cursor &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches &&
        !reduceMotion
    ) {

        let x = 0;
        let y = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            "pointermove",
            event => {

                x = event.clientX;
                y = event.clientY;

            }
        );


        function animateCursor() {

            currentX +=
                (x - currentX) * 0.15;

            currentY +=
                (y - currentY) * 0.15;


            cursor.style.transform =
                `translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                )`;


            requestAnimationFrame(
                animateCursor
            );
        }


        animateCursor();

    } else if (cursor) {

        cursor.style.display = "none";
    }


    /* =====================================================
       PROJECT MODAL
    ===================================================== */

    const modal =
        document.getElementById(
            "project-modal"
        );

    const modalClose =
        document.getElementById(
            "modal-close"
        );

    const modalTitle =
        document.getElementById(
            "modal-title"
        );

    const modalDescription =
        document.getElementById(
            "modal-description"
        );

    const modalTags =
        document.getElementById(
            "modal-tags"
        );

    const modalLink =
        document.getElementById(
            "modal-link"
        );


    const projectData = {

        shri: {
            title: "SHRI AI",

            description:
                "A personal AI assistant experience focused on voice interaction, memory and useful everyday tools.",

            tags: [
                "AI",
                "JAVASCRIPT",
                "WEB"
            ],

            link:
                "https://samarthrai162-max.github.io/ShriAI-v1.0/"
        },


        nexus: {
            title: "NEXUS",

            description:
                "A futuristic personal knowledge discovery interface for exploring useful information across technology, science and education.",

            tags: [
                "SEARCH",
                "UI/UX",
                "WEB"
            ],

            link:
                "https://samarthrai162-max.github.io/NEXUS-V1.0/"
        },


        webforge: {
            title: "WEBFORGE",

            description:
                "A browser-based concept for creating and experimenting with websites.",

            tags: [
                "HTML",
                "CSS",
                "JAVASCRIPT"
            ],

            link:
                "https://samarthrai162-max.github.io/WEBFORGE-V1.0/"
        }

    };


    function openModal(id) {

        const data =
            projectData[id];


        if (
            !data ||
            !modal
        ) {
            return;
        }


        if (modalTitle) {
            modalTitle.textContent =
                data.title;
        }


        if (modalDescription) {
            modalDescription.textContent =
                data.description;
        }


        if (modalLink) {
            modalLink.href =
                data.link;
        }


        if (modalTags) {

            modalTags.innerHTML = "";


            data.tags.forEach(tag => {

                const span =
                    document.createElement(
                        "span"
                    );


                span.textContent =
                    tag;


                modalTags.appendChild(
                    span
                );

            });
        }


        modal.classList.add(
            "modal-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-active"
        );
    }


    function closeModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "modal-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-active"
        );
    }


    cards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                /*
                 * Don't open modal when
                 * actual project link is clicked.
                 */

                if (
                    event.target.closest(
                        ".project-link"
                    )
                ) {
                    return;
                }


                const id =
                    card.dataset.project;


                openModal(id);

            }
        );

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );
    }


    const backdrop =
        document.querySelector(
            ".modal-backdrop"
        );


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeModal
        );
    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();


                if (nav) {

                    nav.classList.remove(
                        "mobile-open",
                        "active"
                    );
                }


                if (menuButton) {

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }

        }
    );


    /* =====================================================
       COPYRIGHT
    ===================================================== */

    const copyright =
        document.getElementById(
            "copyright"
        );


    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} NGB`;
    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScroll() {

        const max =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            max > 0
                ? window.scrollY / max
                : 0;


        document.documentElement.style
            .setProperty(
                "--scroll-depth",
                progress
            );
    }


    window.addEventListener(
        "scroll",
        updateScroll,
        {
            passive: true
        }
    );


    updateScroll();

});