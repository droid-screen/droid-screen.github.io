// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .platform, .dev-feature, .pricing-column');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Platform cards hover effect
    const platforms = document.querySelectorAll('.platform');
    platforms.forEach(platform => {
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Phone mockup animation
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        let isAnimating = false;
        
        const animatePhone = () => {
            if (isAnimating) return;
            isAnimating = true;
            
            phoneMockup.style.transform = 'translateY(-20px) rotate(5deg)';
            phoneMockup.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                phoneMockup.style.transform = 'translateY(0) rotate(0deg)';
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }, 200);
        };

        // Animate phone on scroll
        window.addEventListener('scroll', function() {
            const heroSection = document.querySelector('.hero');
            const rect = heroSection.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animatePhone();
            }
        });
    }

    // Pricing section highlight effect
    const pricingColumn = document.querySelector('.pricing-column');
    if (pricingColumn) {
        pricingColumn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        pricingColumn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
    // Create mobile menu button only on desktop
    if (window.innerWidth > 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #333;
                    cursor: pointer;
                }
                .nav-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    display: none;
                }
                .nav-menu.active {
                    transform: translateY(0);
                    opacity: 1;
                    display: flex;
                }
            }
        `;
        document.head.appendChild(style);
        
        navContainer.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    };

    // Initialize mobile menu
    createMobileMenu();

    // Download button email collection with beautiful modal
    // Configure this with your Google Apps Script Web App URL
    const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxg_GdR_2G2euLvuw52e1whJFSSDUv18GM-ey5M--ta6VBKGJ6Zw12ELbD8sNDSENfS/exec';
    // Scope to hero buttons only and use data-platform for reliable detection
    const downloadButtons = document.querySelectorAll('.hero .btn.btn-primary');
    const modal = document.getElementById('emailModal');
    // platformName element was removed from modal copy; keep logic independent of it
    const emailInput = document.getElementById('emailInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const closeBtn = document.querySelector('.close');
    const langSelect = document.getElementById('langSelect');
    
    let currentPlatform = '';
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dataPlatform = this.getAttribute('data-platform');
            const buttonText = this.textContent.trim();
            currentPlatform = dataPlatform || (
                buttonText.includes('Windows') ? 'Windows' :
                buttonText.includes('Mac') ? 'Mac' :
                buttonText.includes('Web') || buttonText.includes('browser') ? 'Web' : 'Unknown'
            );
            
            // Send Google Analytics event for Windows download
            if (currentPlatform === 'Windows') {
                // Check if gtag is available (Google Analytics 4)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_windows', {
                        'event_category': 'download',
                        'event_label': 'Windows Download Button Clicked'
                    });
                    console.log('Google Analytics event sent: download_windows');
                }
            }

            if (currentPlatform === 'Mac') {
                // Check if gtag is available (Google Analytics 4)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_mac', {
                        'event_category': 'download',
                        'event_label': 'Mac Download Button Clicked'
                    });
                    console.log('Google Analytics event sent: download_mac');
                }
            }

            if (currentPlatform === 'Web') {
                // Check if gtag is available (Google Analytics 4)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_web', {
                        'event_category': 'download',
                        'event_label': 'Web Download Button Clicked'
                    });
                    console.log('Google Analytics event sent: download_web');
                }
            }
            // Update modal content (no platform label in modal body anymore)
            emailInput.value = '';
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus on email input
            setTimeout(() => {
                emailInput.focus();
            }, 100);
        });
    });
    
    // Handle download button in modal
    downloadBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailInput.style.borderColor = '#ef4444';
            emailInput.focus();
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            // Send to Google Sheets (fire-and-forget)
            if (SHEETS_WEB_APP_URL) {
                try {
                    const currentLang = (langSelect && langSelect.value) || (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'en';
                    fetch(SHEETS_WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email,
                            platform: currentPlatform,
                            language: currentLang,
                            timestamp: new Date().toISOString(),
                        }),
                    });
                } catch (err) {
                    console.error('Sheets submit failed (ignored):', err);
                }
            }

            if (typeof gtag !== 'undefined') {
                gtag('event', 'submit_email', {
                    'event_category': 'submit',
                    'event_label': 'Email submitted for beta'
                });
                console.log(`Email logged for ${currentPlatform}`);
            }

            // Success - close modal and show success message
            closeModal();
            showSuccessMessage(email, currentPlatform);
            console.log(`Email collected: ${email} (beta notify) for ${currentPlatform}`);
        } else {
            emailInput.style.borderColor = '#ef4444';
            emailInput.focus();
        }
    });
    
    // Handle cancel button
    cancelBtn.addEventListener('click', closeModal);
    
    // Handle close button
    closeBtn.addEventListener('click', closeModal);
    
    // Handle clicking outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Reset email input border on typing
    emailInput.addEventListener('input', function() {
        this.style.borderColor = '#e2e8f0';
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        emailInput.value = '';
        emailInput.style.borderColor = '#e2e8f0';
    }
    
    function showSuccessMessage(email, platform) {
        // Create a beautiful success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 3000;
            animation: slideInRight 0.5s ease;
            max-width: 400px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                <div>
                    <strong>Thanks!</strong><br>
                    We'll notify ${email} when the ${platform} beta is available.
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }

    // --- i18n ---
    const translations = {
        en: {
            'hero.subtitle': 'A window to your Android',
            'cta.download_windows': 'Download for Windows',
            'cta.download_mac': 'Download for Mac',
            'cta.use_web': 'Use in Web browser',
            'cta.learn_more': 'Learn More',
            'features.title': 'DroidScreen puts your Android on your desktop.',
            'features.subtitle': 'Use apps, play games, control your Android device.',
            'features.description': 'A desktop and web app, compatible with Windows, Mac, and any modern browser.',
            'platform.web': 'Web',
            'cards.keyboard.title': 'Use your Keyboard',
            'cards.keyboard.body': 'Type a hundred words per minute on your phone using your desktop keyboard.',
            'cards.mouse.title': 'Point and Click',
            'cards.mouse.body': 'Point, click, scroll. Your mouse works too.',
            'faq.title': 'Frequently asked questions',
            'faq.q1': 'Does DroidScreen work on Windows and Mac?',
            'faq.a1': 'Yes, our desktop app supports Windows and Mac, and you can also use DroidScreen in a modern web browser.',
            'faq.q2': 'Do I need to enable USB debugging?',
            'faq.a2': 'Depending on your use case, some features may require enabling developer options and USB debugging on your Android device.',
            'faq.q3': 'Can I type and control my phone with mouse and keyboard?',
            'faq.a3': 'Yes, DroidScreen enables keyboard typing and mouse control for a smooth desktop-like experience.',
            'modal.title': 'Get DroidScreen',
            'modal.body': "Thanks for your interest in DroidScreen! We'll notify you when a beta version is available.",
            'modal.submit': 'Submit',
            'modal.cancel': 'Cancel',
            'footer.license': 'Software License',
            'footer.privacy': 'Privacy'
        },
        es: {
            'hero.subtitle': 'Una ventana a tu Android',
            'cta.download_windows': 'Descargar para Windows',
            'cta.download_mac': 'Descargar para Mac',
            'cta.use_web': 'Usar en el navegador',
            'cta.learn_more': 'Saber más',
            'features.title': 'DroidScreen pone tu Android en tu escritorio.',
            'features.subtitle': 'Usa aplicaciones, juega, controla tu dispositivo Android.',
            'features.description': 'Aplicación de escritorio y web, compatible con Windows, Mac y cualquier navegador moderno.',
            'platform.web': 'Web',
            'cards.keyboard.title': 'Usa tu teclado',
            'cards.keyboard.body': 'Escribe a cien palabras por minuto en tu teléfono usando el teclado de tu escritorio.',
            'cards.mouse.title': 'Apuntar y hacer clic',
            'cards.mouse.body': 'Apunta, haz clic, desplázate. Tu ratón también funciona.',
            'faq.title': 'Preguntas frecuentes',
            'faq.q1': '¿DroidScreen funciona en Windows y Mac?',
            'faq.a1': 'Sí, nuestra app de escritorio admite Windows y Mac, y también puedes usar DroidScreen en un navegador moderno.',
            'faq.q2': '¿Necesito activar la depuración USB?',
            'faq.a2': 'Según tu caso de uso, algunas funciones pueden requerir activar opciones de desarrollador y depuración USB.',
            'faq.q3': '¿Puedo escribir y controlar mi teléfono con mouse y teclado?',
            'faq.a3': 'Sí, DroidScreen permite escribir con teclado y controlar con el mouse para una experiencia fluida.',
            'modal.title': 'Obtener DroidScreen',
            'modal.body': '¡Gracias por tu interés en DroidScreen! Te avisaremos cuando haya una versión beta disponible.',
            'modal.submit': 'Enviar',
            'modal.cancel': 'Cancelar',
            'footer.license': 'Licencia de software',
            'footer.privacy': 'Privacidad'
        },
        zh: {
            'hero.subtitle': '连接你的 Android 的窗口',
            'cta.download_windows': '下载 Windows 版',
            'cta.download_mac': '下载 Mac 版',
            'cta.use_web': '在浏览器中使用',
            'cta.learn_more': '了解更多',
            'features.title': 'DroidScreen 让你的 Android 显示在桌面上。',
            'features.subtitle': '使用应用、玩游戏、控制你的 Android 设备。',
            'features.description': '桌面与网页应用，兼容 Windows、Mac 以及任何现代浏览器。',
            'platform.web': '网页',
            'cards.keyboard.title': '使用你的键盘',
            'cards.keyboard.body': '使用桌面键盘在手机上快速输入。',
            'cards.mouse.title': '指点与点击',
            'cards.mouse.body': '指点、点击、滚动。鼠标同样可用。',
            'faq.title': '常见问题',
            'faq.q1': 'DroidScreen 是否支持 Windows 和 Mac？',
            'faq.a1': '是的，我们的桌面应用支持 Windows 和 Mac，你也可以在现代浏览器中使用 DroidScreen。',
            'faq.q2': '需要开启 USB 调试吗？',
            'faq.a2': '根据你的使用场景，某些功能可能需要开启开发者选项与 USB 调试。',
            'faq.q3': '可以用鼠标和键盘控制手机吗？',
            'faq.a3': '可以，DroidScreen 支持键盘输入与鼠标控制，带来桌面般体验。',
            'modal.title': '获取 DroidScreen',
            'modal.body': '感谢关注！我们将在测试版可用时通知你。',
            'modal.submit': '提交',
            'modal.cancel': '取消',
            'footer.license': '软件许可',
            'footer.privacy': '隐私'
        },
        hi: {
            'hero.subtitle': 'आपके Android की खिड़की',
            'cta.download_windows': 'Windows के लिए डाउनलोड करें',
            'cta.download_mac': 'Mac के लिए डाउनलोड करें',
            'cta.use_web': 'वेब ब्राउज़र में उपयोग करें',
            'cta.learn_more': 'और जानें',
            'features.title': 'DroidScreen आपके Android को आपके डेस्कटॉप पर लाता है।',
            'features.subtitle': 'ऐप्स का उपयोग करें, गेम खेलें, अपने Android डिवाइस को नियंत्रित करें।',
            'features.description': 'डेस्कटॉप और वेब ऐप, Windows, Mac और किसी भी आधुनिक ब्राउज़र के साथ संगत।',
            'platform.web': 'वेब',
            'cards.keyboard.title': 'अपना कीबोर्ड उपयोग करें',
            'cards.keyboard.body': 'डेस्कटॉप कीबोर्ड से अपने फोन पर तेज़ी से लिखें।',
            'cards.mouse.title': 'पॉइंट और क्लिक',
            'cards.mouse.body': 'पॉइंट, क्लिक, स्क्रॉल। आपका माउस भी काम करता है।',
            'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
            'faq.q1': 'क्या DroidScreen Windows और Mac पर काम करता है?',
            'faq.a1': 'हाँ, हमारा डेस्कटॉप ऐप Windows और Mac को सपोर्ट करता है, और आप वेब ब्राउज़र में भी उपयोग कर सकते हैं।',
            'faq.q2': 'क्या USB डिबगिंग सक्षम करनी होगी?',
            'faq.a2': 'आपके उपयोग के आधार पर, कुछ फ़ीचर्स के लिए डेवलपर ऑप्शन और USB डिबगिंग सक्षम करना आवश्यक हो सकता है।',
            'faq.q3': 'क्या मैं माउस और कीबोर्ड से फ़ोन नियंत्रित कर सकता हूँ?',
            'faq.a3': 'हाँ, DroidScreen से कीबोर्ड टाइपिंग और माउस कंट्रोल संभव है।',
            'modal.title': 'DroidScreen प्राप्त करें',
            'modal.body': 'रुचि दिखाने के लिए धन्यवाद! बीटा उपलब्ध होते ही हम आपको सूचित करेंगे।',
            'modal.submit': 'सबमिट करें',
            'modal.cancel': 'रद्द करें',
            'footer.license': 'सॉफ़्टवेयर लाइसेंस',
            'footer.privacy': 'गोपनीयता'
        },
        ar: {
            'hero.subtitle': 'نافذة إلى جهاز Android الخاص بك',
            'cta.download_windows': 'تنزيل لـ Windows',
            'cta.download_mac': 'تنزيل لـ Mac',
            'cta.use_web': 'استخدم في المتصفح',
            'cta.learn_more': 'اعرف المزيد',
            'features.title': 'يجعل DroidScreen جهاز Android الخاص بك على سطح المكتب.',
            'features.subtitle': 'استخدم التطبيقات، العب الألعاب، وتحكم في جهاز Android.',
            'features.description': 'تطبيق لسطح المكتب والويب، متوافق مع Windows وMac وأي متصفح حديث.',
            'platform.web': 'الويب',
            'cards.keyboard.title': 'استخدم لوحة المفاتيح',
            'cards.keyboard.body': 'اكتب بسرعة على هاتفك باستخدام لوحة مفاتيح سطح المكتب.',
            'cards.mouse.title': 'أشر وانقر',
            'cards.mouse.body': 'أشر، انقر، مرر. يعمل الماوس أيضًا.',
            'faq.title': 'الأسئلة الشائعة',
            'faq.q1': 'هل يعمل DroidScreen على Windows وMac؟',
            'faq.a1': 'نعم، يدعم تطبيقنا لسطح المكتب Windows وMac، ويمكنك أيضًا استخدام DroidScreen في متصفح حديث.',
            'faq.q2': 'هل أحتاج إلى تفعيل تصحيح USB؟',
            'faq.a2': 'اعتمادًا على حالتك، قد تتطلب بعض الميزات تفعيل خيارات المطور وتصحيح USB.',
            'faq.q3': 'هل يمكنني التحكم في الهاتف باستخدام الماوس ولوحة المفاتيح؟',
            'faq.a3': 'نعم، يتيح DroidScreen الكتابة بلوحة المفاتيح والتحكم بالماوس لتجربة سلسة.',
            'modal.title': 'احصل على DroidScreen',
            'modal.body': 'شكرًا لاهتمامك! سنخطرك عند توفر الإصدار التجريبي.',
            'modal.submit': 'إرسال',
            'modal.cancel': 'إلغاء',
            'footer.license': 'رخصة البرنامج',
            'footer.privacy': 'الخصوصية'
        }
    };

    function applyTranslations(lang) {
        const dict = translations[lang] || translations.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        // RTL support for Arabic
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            try { localStorage.setItem('lang', lang); } catch (_) {}
            applyTranslations(lang);
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (hero && phoneMockup) {
        const rate = scrolled * -0.5;
        phoneMockup.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing animation to hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
    // Initialize saved language
    try {
        const sel = document.getElementById('langSelect');
        let savedLang = localStorage.getItem('lang');
        let initialLang = savedLang;
        if (!initialLang) {
            const navLangs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']).map(l => (l || '').toLowerCase());
            const pick = (langs) => {
                if (langs.some(l => l.startsWith('hi'))) return 'hi';
                if (langs.some(l => l.startsWith('zh'))) return 'zh';
                if (langs.some(l => l.startsWith('es'))) return 'es';
                if (langs.some(l => l.startsWith('ar'))) return 'ar';
                return 'en';
            };
            initialLang = pick(navLangs);
            try { localStorage.setItem('lang', initialLang); } catch (_) {}
        }
        if (sel) { sel.value = initialLang; }
        applyTranslations(initialLang || 'en');
    } catch (_) {}
});
