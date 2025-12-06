document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');

    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            mobileToggle.textContent = '✕';
        } else {
            mobileToggle.textContent = '☰';
        }
    });

    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.textContent = '☰';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.textContent = '☰';
        });
    });

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        
        if (window.scrollY > 200) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModal');
    const okBtn = document.getElementById('okButton');
    const modal_overlay = document.querySelector('.modal-overlay');

    // Show modal function
    function showModal() {
        modal.classList.add('active');
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
    }

    // Form submission
    document.querySelector('.contact-form').addEventListener('submit', async function (e) {
        e.preventDefault();
    
        const formData = new FormData(this);
    
        await fetch("/", {
            method: "POST",
            body: formData,
        });
    
        showModal();
        this.reset();
    });

    // Close button click
    closeBtn.addEventListener('click', closeModal);

    // OK button click
    okBtn.addEventListener('click', closeModal);

    // Click outside modal to close
    modal_overlay.addEventListener('click', function (e) {
        if (e.target === modal_overlay) {
            closeModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
