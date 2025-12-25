// Language Switching System

document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = document.getElementById('currentLang');
    
    // Initialize language from localStorage or default to English
    let activeLanguage = localStorage.getItem('amanipalce-language') || 'en';
    
    // Apply saved language
    applyLanguage(activeLanguage);
    
    // Toggle language dropdown
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageDropdown.classList.remove('active');
        });
        
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Handle language selection
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
                
                // Update active class
                document.querySelectorAll('.language-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close dropdown
                languageDropdown.classList.remove('active');
            });
        });
    }
    
    // Switch language function
    function switchLanguage(lang) {
        activeLanguage = lang;
        localStorage.setItem('amanipalce-language', lang);
        applyLanguage(lang);
    }
    
    // Apply language to page
    function applyLanguage(lang) {
        // Update button text
        if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
        }
        
        // Update html lang attribute
        document.documentElement.lang = lang;
        
        // Show/hide language-specific content
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = lang === 'en' ? 'block' : 'none';
        });
        
        document.querySelectorAll('.lang-sw').forEach(el => {
            el.style.display = lang === 'sw' ? 'block' : 'none';
        });
        
        // Update active language option
        document.querySelectorAll('.language-option').forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
});
