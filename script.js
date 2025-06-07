document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const docHtml = document.documentElement;

    // A function to toggle theme and save preference
    function toggleTheme() {
        docHtml.classList.toggle('light-mode');
        // Save the user's preference to localStorage
        if (docHtml.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    // Event listener for the theme toggle button
    if(themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // --- Header Shadow on Scroll ---
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Dynamic Text Typing Effect ---
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const words = ["Websites.", "Interfaces.", "Experiences.", "Solutions."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            // Use substring to create the typing/deleting effect
            const typeSpeed = isDeleting ? 100 : 150;
            dynamicText.textContent = currentWord.substring(0, charIndex);

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
            setTimeout(type, isDeleting ? 100 : 150);
        }
        type();
    }

    // --- Scroll Fade-in Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve after the animation to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Select all elements you want to animate on scroll
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .project-card, .contact-text, .contact-links');
    animatedElements.forEach(el => observer.observe(el));

});