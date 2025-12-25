// Amani Place - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Language Switcher
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function() {
            languageDropdown.classList.remove('active');
        });
        
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Language selection
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                
                // Update active class
                document.querySelectorAll('.language-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update button text
                document.getElementById('currentLang').textContent = lang.toUpperCase();
                
                // Switch language content
                switchLanguage(lang);
                
                // Close dropdown
                languageDropdown.classList.remove('active');
                
                // Save preference
                localStorage.setItem('amanipalce-language', lang);
            });
        });
        
        // Load saved language
        const savedLang = localStorage.getItem('amanipalce-language') || 'en';
        document.querySelectorAll('.language-option').forEach(option => {
            if (option.getAttribute('data-lang') === savedLang) {
                option.classList.add('active');
                document.getElementById('currentLang').textContent = savedLang.toUpperCase();
                switchLanguage(savedLang);
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    // Language switching function
    function switchLanguage(lang) {
        // Update all language-specific elements
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = lang === 'en' ? 'block' : 'none';
        });
        
        document.querySelectorAll('.lang-sw').forEach(el => {
            el.style.display = lang === 'sw' ? 'block' : 'none';
        });
    }
});
