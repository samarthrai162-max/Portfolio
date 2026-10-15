/* =====================================================
   AUREX ESTATES — INTERACTIVE EXPERIENCE
   JavaScript | Version 1.0
===================================================== */

"use strict";

document.body.classList.add("js-enabled");


/* ================= SELECTORS ================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* ================= ELEMENTS ================= */

const preloader = $("#preloader");
const header = $("#site-header");
const menuToggle = $("#menu-toggle");
const navMenu = $("#nav-menu");
const scrollProgress = $("#scroll-progress");

const propertyCards = $$(".property-card");
const filterButtons = $$(".filter-button");

const propertyModal = $("#property-modal");
const modalPanel = $(".modal-panel");
const modalImage = $("#modal-image");
const modalType = $("#modal-type");
const modalTitle = $("#modal-title");
const modalLocation = $("#modal-location");
const modalPrice = $("#modal-price");
const modalDescription = $("#modal-description");
const modalFeatures = $("#modal-features");

const enquiryForm = $("#enquiry-form");
const formMessage = $("#form-message");

const toast = $("#toast");


/* ================= PROPERTY DATA ================= */

/*
  Demo information only.
  Replace it with verified property data before launch.
*/

const properties = {

    "villa-one": {
        type: "PRIVATE VILLA",
        title: "Serenity House",
        location: "Illustrative location · To be confirmed",
        price: "₹4.8 Cr*",

        description:
            "Discover a contemporary villa concept featuring generous living spaces, modern architecture and a relaxing outdoor setting. This fictional listing demonstrates how property details can be presented.",

        image:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",

        imageAlt:
            "Contemporary private villa with a swimming pool",

        features: [
            { icon: "fa-bed", text: "4 Bedrooms" },
            { icon: "fa-bath", text: "5 Bathrooms" },
            { icon: "fa-ruler-combined", text: "3,200 sq.ft." }
        ]
    },


    "apartment-one": {
        type: "LUXURY APARTMENT",
        title: "The Ivory Residence",
        location: "Illustrative location · To be confirmed",
        price: "₹2.2 Cr*",

        description:
            "A fictional apartment concept with elegant interiors, expansive windows and a modern residential feel. Contact details and specifications must be verified before this example is used commercially.",

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",

        imageAlt:
            "Elegant modern apartment with large windows",

        features: [
            { icon: "fa-bed", text: "3 Bedrooms" },
            { icon: "fa-bath", text: "3 Bathrooms" },
            { icon: "fa-ruler-combined", text: "1,850 sq.ft." }
        ]
    },


    "penthouse-one": {
        type: "PRIVATE PENTHOUSE",
        title: "The Aurelia Sky",
        location: "Illustrative location · To be confirmed",
        price: "₹6.5 Cr*",

        description:
            "An illustrative penthouse concept designed around contemporary architecture, comfortable interiors and a sense of openness. This is demonstration content, not a verified property advertisement.",

        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",

        imageAlt:
            "Modern luxury residence with expansive glass windows",

        features: [
            { icon: "fa-bed", text: "4 Bedrooms" },
            { icon: "fa-bath", text: "4 Bathrooms" },
            { icon: "fa-ruler-combined", text: "3,600 sq.ft." }
        ]
    }

};


/* ================= TOAST NOTIFICATION ================= */

let toastTimer;

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


/* ================= PRELOADER ================= */

function hidePreloader() {

    if (!preloader) return;

    preloader.classList.add("is-hidden");
}

window.addEventListener("load", hidePreloader);

setTimeout(hidePreloader, 3500);


/* ================= MOBILE NAVIGATION ================= */

function closeMenu() {

    if (!menuToggle || !navMenu) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    navMenu.classList.remove("is-open");
}


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navMenu.classList.toggle("is-open", !isOpen);

    });


    $$(".nav-link", navMenu).forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    document.addEventListener("click", event => {

        if (
            navMenu.classList.contains("is-open") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {
            closeMenu();
        }

    });

}


/* ================= HEADER & SCROLL PROGRESS ================= */

let scrollTicking = false;

function updateScrollUI() {

    const scrollY = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", scrollY > 40);
    }

    if (scrollProgress) {

        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            scrollableHeight > 0
                ? (scrollY / scrollableHeight) * 100
                : 0;

        scrollProgress.style.width =
            `${Math.min(100, Math.max(0, progress))}%`;
    }

    scrollTicking = false;
}


window.addEventListener("scroll", () => {

    if (!scrollTicking) {

        window.requestAnimationFrame(updateScrollUI);

        scrollTicking = true;
    }

}, { passive: true });


updateScrollUI();


/* ================= ACTIVE NAVIGATION ================= */

const navigationLinks = $$(".nav-link[href^='#']");

const navigationSections = navigationLinks
    .map(link => $(link.getAttribute("href")))
    .filter(Boolean);


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navigationLinks.forEach(link => {

                    const active =
                        link.getAttribute("href") === `#${sectionId}`;

                    link.classList.toggle("active", active);

                });

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );


    navigationSections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* ================= SCROLL REVEAL ANIMATIONS ================= */

const revealElements = $$(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if (
    "IntersectionObserver" in window &&
    !reduceMotion
) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("is-visible");
    });

}


/* ================= PROPERTY FILTERS ================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(filterButton => {

            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);

            filterButton.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        });


        propertyCards.forEach(card => {

            const category = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;

            card.classList.toggle(
                "is-filtered-out",
                !shouldShow
            );

            if (shouldShow) {

                card.setAttribute("aria-hidden", "false");

                /*
                  Re-run reveal animation when the card
                  becomes visible after filtering.
                */

                card.classList.remove("is-visible");

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        card.classList.add("is-visible");

                    });

                });

            } else {

                card.setAttribute("aria-hidden", "true");

            }

        });

    });

});


/* ================= PROPERTY FAVOURITES ================= */

$$(".property-favorite").forEach(button => {

    button.addEventListener("click", () => {

        const isSaved =
            button.getAttribute("aria-pressed") === "true";

        const newState = !isSaved;

        button.setAttribute(
            "aria-pressed",
            String(newState)
        );

        const icon = $("i", button);

        if (icon) {

            icon.classList.toggle(
                "fa-solid",
                newState
            );

            icon.classList.toggle(
                "fa-regular",
                !newState
            );

        }

        showToast(
            newState
                ? "Property added to your favourites."
                : "Property removed from your favourites."
        );

    });

});


/* ================= PROPERTY MODAL ================= */

let previouslyFocusedElement = null;


function openPropertyModal(propertyId) {

    const property = properties[propertyId];

    if (!property || !propertyModal) {

        showToast("Property information is unavailable.");

        return;
    }

    previouslyFocusedElement = document.activeElement;

    modalType.textContent = property.type;
    modalTitle.textContent = property.title;
    modalLocation.textContent = property.location;
    modalPrice.textContent = property.price;
    modalDescription.textContent = property.description;

    modalImage.src = property.image;
    modalImage.alt = property.imageAlt;


    /*
      Build features safely using DOM elements.
      No property text is inserted as HTML.
    */

    modalFeatures.replaceChildren();

    property.features.forEach(feature => {

        const featureElement = document.createElement("span");

        featureElement.className = "modal-feature";

        const icon = document.createElement("i");

        icon.className = `fa-solid ${feature.icon}`;

        icon.setAttribute("aria-hidden", "true");

        const text = document.createElement("span");

        text.textContent = feature.text;

        featureElement.append(icon, text);

        modalFeatures.appendChild(featureElement);

    });


    propertyModal.classList.add("is-open");

    propertyModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");


    const closeButton = $(".modal-close", propertyModal);

    if (closeButton) {
        closeButton.focus();
    }

}


function closePropertyModal() {

    if (!propertyModal) return;

    propertyModal.classList.remove("is-open");

    propertyModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (modalImage) {
        modalImage.removeAttribute("src");
        modalImage.alt = "";
    }

    if (
        previouslyFocusedElement &&
        document.contains(previouslyFocusedElement)
    ) {
        previouslyFocusedElement.focus();
    }

}


$$("[data-open-property]").forEach(button => {

    button.addEventListener("click", () => {

        openPropertyModal(
            button.dataset.openProperty
        );

    });

});


$$("[data-close-modal]").forEach(element => {

    element.addEventListener("click", closePropertyModal);

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        propertyModal &&
        propertyModal.classList.contains("is-open")
    ) {

        closePropertyModal();

    }

});


/*
  Keep keyboard focus inside the open dialog.
*/

document.addEventListener("keydown", event => {

    if (
        event.key !== "Tab" ||
        !propertyModal ||
        !propertyModal.classList.contains("is-open")
    ) {
        return;
    }

    const focusableElements = $$(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        modalPanel
    ).filter(element => element.offsetParent !== null);

    if (!focusableElements.length) {

        event.preventDefault();

        modalPanel.focus();

        return;
    }

    const firstElement = focusableElements[0];

    const lastElement =
        focusableElements[focusableElements.length - 1];

    if (
        event.shiftKey &&
        document.activeElement === firstElement
    ) {

        event.preventDefault();

        lastElement.focus();

    } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
    ) {

        event.preventDefault();

        firstElement.focus();

    }

});


/* ================= MODAL ENQUIRY ================= */

const modalEnquiry = $("#modal-enquiry");

if (modalEnquiry) {

    modalEnquiry.addEventListener("click", () => {

        closePropertyModal();

    });

}


/* ================= ANIMATED COUNTERS ================= */

const statNumbers = $$(".stat-number");


function animateCounter(element) {

    if (element.dataset.animated === "true") {
        return;
    }

    element.dataset.animated = "true";

    const target = Number(element.dataset.count || 0);

    const suffix = element.dataset.suffix || "";

    if (!Number.isFinite(target)) {
        element.textContent = "0" + suffix;
        return;
    }

    if (reduceMotion) {

        element.textContent =
            target.toLocaleString("en-IN") + suffix;

        return;
    }

    const duration = 1500;

    const startTime = performance.now();


    function updateCounter(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        /*
          Ease-out curve: starts quickly and slows down.
        */

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
            target * easedProgress
        );

        element.textContent =
            currentValue.toLocaleString("en-IN") + suffix;

        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            element.textContent =
                target.toLocaleString("en-IN") + suffix;

        }

    }


    requestAnimationFrame(updateCounter);

}


if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.5
        }
    );


    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });

} else {

    statNumbers.forEach(animateCounter);

}


/* ================= ENQUIRY FORM ================= */

/*
  IMPORTANT:
  This front-end demo does NOT send or save enquiries.

  Connect Formspree or another trusted backend before
  using the form for real customer enquiries.
*/

if (enquiryForm && formMessage) {

    enquiryForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!enquiryForm.checkValidity()) {

            enquiryForm.reportValidity();

            return;
        }


        formMessage.textContent =
            "Demo only: your enquiry has not been sent. Connect a form service to receive messages.";

        formMessage.classList.remove("success");

        formMessage.classList.add("error");

        showToast("Demo form: no enquiry was sent.");

    });

}


/* ================= CURRENT YEAR ================= */

const currentYear = $("#current-year");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ================= IMAGE FALLBACK ================= */

/*
  If a remote image fails to load, show a neutral
  background instead of a broken-image icon.
*/

$$("img").forEach(image => {

    image.addEventListener("error", () => {

        image.style.backgroundColor = "#292a23";

        image.dataset.imageFailed = "true";

    });

});


/* ================= INITIALISE ================= */

function initialiseWebsite() {

    updateScrollUI();

    if (document.readyState === "complete") {
        hidePreloader();
    }

}

initialiseWebsite();


/* ================= END ================= */

console.log(
    "AUREX ESTATES initialised successfully."
);