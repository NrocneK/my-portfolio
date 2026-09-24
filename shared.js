"use strict";

/* ============================================================
   THEME
   ============================================================ */

const THEME_STORAGE_KEY = "portfolio-theme";

function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
}


function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const button = document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    const isLight = theme === "light";

    button.textContent = isLight ? "☾" : "☼";

    button.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
    );
}


function initThemeToggle() {
    const initialTheme = getPreferredTheme();

    applyTheme(initialTheme);

    const button = document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    button.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.dataset.theme || "dark";

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        localStorage.setItem(
            THEME_STORAGE_KEY,
            nextTheme
        );

        applyTheme(nextTheme);
    });
}


/* ============================================================
   LANGUAGE
   ============================================================ */

function applyI18nText(dictionary, language) {

    document
        .querySelectorAll("[data-i18n]")
        .forEach((element) => {

            const key = element.dataset.i18n;
            const value = dictionary?.[language]?.[key];

            if (typeof value === "string") {
                element.textContent = value;
            }
        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach((element) => {

            const key =
                element.dataset.i18nPlaceholder;

            const value =
                dictionary?.[language]?.[key];

            if (typeof value === "string") {
                element.setAttribute(
                    "placeholder",
                    value
                );
            }
        });
}


/* ============================================================
   YEAR
   ============================================================ */

function updateCurrentYear() {

    const yearElement =
        document.getElementById("currentYear");

    if (!yearElement) {
        return;
    }

    yearElement.textContent =
        String(new Date().getFullYear());
}


/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initThemeToggle();
    updateCurrentYear();

});