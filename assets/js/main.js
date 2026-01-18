// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or prefer-color-scheme
        function getThemePreference() {
            if (localStorage.getItem('theme')) {
                return localStorage.getItem('theme');
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        // Apply theme
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                themeToggle.setAttribute('aria-label', 'الوضع النهاري');
            } else {
                document.body.classList.remove('dark-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                themeToggle.setAttribute('aria-label', 'الوضع الليلي');
            }
            localStorage.setItem('theme', theme);
        }
        
        // Initialize theme
        applyTheme(getThemePreference());
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            applyTheme(isDark ? 'light' : 'dark');
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Scroll to Top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // FAQ functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Trial form steps
    let currentStep = 1;
    
    function nextStep(step) {
        // Validate current step
        if (step === 2 && !validateStep1()) return;
        if (step === 3 && !validateStep2()) return;
        
        // Hide current step
        document.getElementById(`step${currentStep}`).style.display = 'none';
        
        // Show next step
        document.getElementById(`step${step}`).style.display = 'block';
        
        // Update steps visualization
        document.querySelectorAll('.step').forEach((s, index) => {
            if (index + 1 <= step) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        // Update review information
        if (step === 3) {
            updateReviewInfo();
        }
        
        currentStep = step;
    }
    
    function prevStep(step) {
        // Hide current step
        document.getElementById(`step${currentStep}`).style.display = 'none';
        
        // Show previous step
        document.getElementById(`step${step}`).style.display = 'block';
        
        // Update steps visualization
        document.querySelectorAll('.step').forEach((s, index) => {
            if (index + 1 <= step) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        currentStep = step;
    }
    
    function validateStep1() {
        const name = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const country = document.getElementById('country');
        
        if (!name || !email || !phone || !country) return true;
        
        if (!name.value || !email.value || !phone.value || !country.value) {
            alert('يرجى ملء جميع الحقول المطلوبة في الخطوة الأولى');
            return false;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }
        
        return true;
    }
    
    function validateStep2() {
        const deviceType = document.getElementById('deviceType');
        const internetSpeed = document.getElementById('internetSpeed');
        
        if (!deviceType || !internetSpeed) return true;
        
        if (!deviceType.value || !internetSpeed.value) {
            alert('يرجى ملء جميع الحقول المطلوبة في الخطوة الثانية');
            return false;
        }
        
        return true;
    }
    
    function updateReviewInfo() {
        const name = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const country = document.getElementById('country');
        const deviceType = document.getElementById('deviceType');
        const internetSpeed = document.getElementById('internetSpeed');
        
        if (!name || !email || !phone || !country || !deviceType || !internetSpeed) return;
        
        document.getElementById('reviewName').textContent = name.value;
        document.getElementById('reviewEmail').textContent = email.value;
        document.getElementById('reviewPhone').textContent = phone.value;
        document.getElementById('reviewCountry').textContent = country.options[country.selectedIndex].text;
        document.getElementById('reviewDevice').textContent = deviceType.options[deviceType.selectedIndex].text;
        document.getElementById('reviewSpeed').textContent = internetSpeed.options[internetSpeed.selectedIndex].text;
    }
    
    // Trial form submission
    const trialForm = document.getElementById('trialForm');
    if (trialForm) {
        // Add event listeners for next/prev buttons
        document.querySelectorAll('[onclick^="nextStep"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const step = parseInt(this.getAttribute('onclick').match(/nextStep\((\d+)\)/)[1]);
                nextStep(step);
            });
        });
        
        document.querySelectorAll('[onclick^="prevStep"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const step = parseInt(this.getAttribute('onclick').match(/prevStep\((\d+)\)/)[1]);
                prevStep(step);
            });
        });
        
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const agreeTerms = document.getElementById('agreeTerms');
            if (agreeTerms && !agreeTerms.checked) {
                alert('يرجى الموافقة على شروط الاستخدام وسياسة الخصوصية');
                return;
            }
            
            // Generate random order number
            const orderNum = 'TR' + Date.now().toString().slice(-8);
            const orderNumberElement = document.getElementById('orderNumber');
            if (orderNumberElement) {
                orderNumberElement.textContent = orderNum;
            }
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
            }
            
            // Hide form
            trialForm.style.display = 'none';
            
            // Scroll to success message
            if (successMessage) {
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Here you would normally send the form data to a server
            const formData = {
                name: document.getElementById('fullName')?.value,
                email: document.getElementById('email')?.value,
                phone: document.getElementById('phone')?.value,
                country: document.getElementById('country')?.value,
                device: document.getElementById('deviceType')?.value,
                orderNumber: orderNum,
                timestamp: new Date().toISOString()
            };
            
            console.log('Trial request submitted:', formData);
            
            // Track conversion
            console.log('Trial request completed successfully');
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً على رسالتك! سنرد عليك في أقرب وقت ممكن.');
            contactForm.reset();
        });
    }
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});
