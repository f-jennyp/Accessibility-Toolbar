document.addEventListener('DOMContentLoaded', function () {
    const widgetButton = document.getElementById('ada-widget-button');
    const widgetPanel = document.getElementById('ada-widget-panel');
    const textElements = document.querySelectorAll('body, body p, body span, body div, body a, body li, body td, body th, body h1, body h2, body h3, body h4, body h5, body h6');

    widgetButton.addEventListener('click', function () {
        const isHidden = widgetPanel.getAttribute('aria-hidden') === 'true';
        widgetPanel.style.display = isHidden ? 'block' : 'none';
        widgetPanel.setAttribute('aria-hidden', !isHidden);
        this.setAttribute('aria-expanded', isHidden);
    });

    function resizeFont(action) {

        textElements.forEach(element => {
            let currentSize = parseFloat(window.getComputedStyle(element).fontSize);

            if (action === 'add' && currentSize < 24) {
                element.style.fontSize = (currentSize + 2) + 'px';
            } else if (action === 'less' && currentSize > 12) {
                element.style.fontSize = (currentSize - 2) + 'px';
            }
        });

        setCookie('fontAction', action, 30);
    }

    function applyReadableFont() {
        textElements.forEach(element => {
            element.style.fontFamily = "Arial, Helvetica, sans-serif";
        });
    }

    function removeReadableFont() {
        textElements.forEach(element => {
            element.style.fontFamily = "";
        });
    }

    function applySavedFont() {
        const action = getCookie('fontAction');
        if (action) {
            resizeFont(action);
        }
    }

    function resetFontSizes() {
        textElements.forEach(element => {
            element.style.fontSize = '';
        });
    }

    applySavedFont();

    document.getElementById('resize_font_add').addEventListener('click', function () {
        resizeFont('add');
    });

    document.getElementById('resize_font_less').addEventListener('click', function () {
        resizeFont('less');
    });

    document.getElementById('grayscale').addEventListener('click', function () {
        document.documentElement.classList.toggle('grayscale');
        const isActive = document.documentElement.classList.contains('grayscale');
        setCookie('grayscale', isActive ? 'true' : 'false', 30);
    });

    document.getElementById('high_contrast').addEventListener('click', function () {
        document.documentElement.classList.toggle('high-contrast');
        const isActive = document.documentElement.classList.contains('high-contrast');
        setCookie('highContrast', isActive ? 'true' : 'false', 30);
        if (isActive) {
            document.documentElement.classList.remove('negative-contrast', 'light-bg');
        }
    });

    document.getElementById('negative_contrast').addEventListener('click', function () {
        document.documentElement.classList.toggle('negative-contrast');
        const isActive = document.documentElement.classList.contains('negative-contrast');
        setCookie('negativeContrast', isActive ? 'true' : 'false', 30);
        if (isActive) {
            document.documentElement.classList.remove('high-contrast', 'light-bg');
        }
    });

    document.getElementById('light_bg').addEventListener('click', function () {
        document.documentElement.classList.toggle('light-bg');
        const isActive = document.documentElement.classList.contains('light-bg');
        setCookie('lightBg', isActive ? 'true' : 'false', 30);
        if (isActive) {
            document.documentElement.classList.remove('high-contrast', 'negative-contrast');
        }
    });

    document.getElementById('links_underline').addEventListener('click', function () {
        document.documentElement.classList.toggle('underline-links');
        const isActive = document.documentElement.classList.contains('underline-links');
        setCookie('underlineLinks', isActive ? 'true' : 'false', 30);
    });

    document.getElementById('readable_font').addEventListener('click', function () {
        const isActive = document.documentElement.classList.toggle('readable-font');
        if (isActive) {
            applyReadableFont();
        } else {
            removeReadableFont();
        }
        setCookie('readableFont', isActive ? 'true' : 'false', 30);
    });

    document.getElementById('reset').addEventListener('click', function () {
        document.documentElement.className = '';

        resetFontSizes();
        removeReadableFont();

        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // window.location.reload();
    });

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function checkPreferences() {
        const action = getCookie('fontAction');
        if (action) {
            resizeFont(action);
        }

        if (getCookie('grayscale') === 'true') {
            document.documentElement.classList.add('grayscale');
        }

        if (getCookie('highContrast') === 'true') {
            document.documentElement.classList.add('high-contrast');
        }

        if (getCookie('negativeContrast') === 'true') {
            document.documentElement.classList.add('negative-contrast');
        }

        if (getCookie('lightBg') === 'true') {
            document.documentElement.classList.add('light-bg');
        }

        if (getCookie('underlineLinks') === 'true') {
            document.documentElement.classList.add('underline-links');
        }

        if (getCookie('readableFont') === 'true') {
            document.documentElement.classList.add('readable-font');
            applyReadableFont();
        }
    }

    checkPreferences();
});