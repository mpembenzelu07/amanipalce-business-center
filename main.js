// Amani Place - Premium Business Center
document.addEventListener('DOMContentLoaded', function() {
    // Language Loader
    const languageLoader = document.querySelector('.language-loader');
    
    // Hide loader after page loads
    setTimeout(() => {
        if (languageLoader) {
            languageLoader.classList.add('hidden');
        }
    }, 1000);
    
    // Mobile Navigation Toggle
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
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Language Switching System
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLangSpan = document.querySelector('.current-lang');
    
    // Set default language (English)
    let currentLanguage = 'en';
    
    // Initialize language from localStorage or default to English
    const savedLanguage = localStorage.getItem('amanipalce-language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        switchLanguage(currentLanguage);
    }
    
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
        
        // Prevent dropdown from closing when clicking inside
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
                
                // Switch language
                switchLanguage(lang);
                
                // Close dropdown
                languageDropdown.classList.remove('active');
                
                // Save to localStorage
                localStorage.setItem('amanipalce-language', lang);
            });
        });
        
        // Set initial active language option
        document.querySelectorAll('.language-option').forEach(option => {
            if (option.getAttribute('data-lang') === currentLanguage) {
                option.classList.add('active');
            }
        });
    }
    
    // Language switching function
    function switchLanguage(lang) {
        currentLanguage = lang;
        
        // Update current language display
        if (currentLangSpan) {
            currentLangSpan.textContent = lang.toUpperCase();
        }
        
        // Show/hide language-specific elements
        document.querySelectorAll('.lang').forEach(element => {
            if (element.classList.contains(lang)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links (not page links)
            if (href.includes('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;
            
            // Prepare success message based on language
            let successMessage = '';
            if (currentLanguage === 'en') {
                successMessage = `Thank you ${name}! Your inquiry has been received. We will contact you at ${email} or ${phone} shortly.`;
            } else {
                successMessage = `Asante ${name}! Ombi lako limepokelewa. Tutawasiliana nawe kupitia ${email} au ${phone} hivi karibuni.`;
            }
            
            // Show success message
            alert(successMessage);
            
            // Reset form
            this.reset();
            
            // Reset custom select labels
            document.querySelectorAll('.form-group select').forEach(select => {
                select.value = '';
            });
        });
    }
    
    // Auto-hide language loader if still visible
    setTimeout(() => {
        if (languageLoader && !languageLoader.classList.contains('hidden')) {
            languageLoader.classList.add('hidden');
        }
    }, 2000);
    
    // Console welcome message
    console.log('%c✨ AMANI PLACE PREMIUM ✨', 'font-size: 18px; color: #D4AF37; font-weight: bold;');
    console.log('%cWelcome to Tanzania\'s premier business center.', 'font-size: 14px; color: #FFD700;');
});
