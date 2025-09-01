document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile nav with all links
  const initializeMobileNav = () => {
    const mobileNavLinks = document.getElementById('mobile-nav-links');
    const desktopLinks = document.querySelectorAll('#desktop-nav-links a');
    
    if (mobileNavLinks && mobileNavLinks.children.length === 0 && desktopLinks.length > 0) {
      mobileNavLinks.innerHTML = '';
      desktopLinks.forEach(link => {
        const clone = link.cloneNode(true);
        mobileNavLinks.appendChild(clone);
      });
    }
  };

  // Theme switching
  const setupThemeSwitcher = () => {
    const themeInputs = document.querySelectorAll('input[name="theme"]');
    
    themeInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.name === 'theme') {
          document.body.className = e.target.value;
          localStorage.setItem('theme', e.target.value);
        }
      });
    });

    // Set saved theme or default
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
    const correspondingInput = document.querySelector(`input[value="${savedTheme}"]`);
    if (correspondingInput) {
      correspondingInput.checked = true;
    }
  };

  // Liquid glass nav shine effect
  const setupNavShine = () => {
    const navBar = document.querySelector('.nav-bar');
    if (navBar) {
      navBar.addEventListener('mousemove', (e) => {
        const rect = navBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const shine = navBar.querySelector('.liquidGlass-shine');
        if (shine) {
          shine.style.background = 
            `radial-gradient(200px 200px at ${x}px ${y}px,
             rgba(255,255,255,0.28) 0%,
             rgba(255,255,255,0.10) 35%,
             rgba(255,255,255,0.00) 70%)`;
        }
      });
      
      navBar.addEventListener('mouseleave', () => {
        const shine = navBar.querySelector('.liquidGlass-shine');
        if (shine) shine.style.background = 'none';
      });
    }
  };

  // Button liquid highlight
  const setupButtonEffects = () => {
    const glassButtons = document.querySelectorAll('.hero-contact-btn, .education-details-btn');
    glassButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--mx', x + '%');
        btn.style.setProperty('--my', y + '%');
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.removeProperty('--mx');
        btn.style.removeProperty('--my');
      });
    });
  };

  // Mobile nav functions
  const setupMobileNav = () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');

    if (!hamburger || !mobileNav || !mobileNavClose) return;

    const openMobileNav = () => {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.classList.add('is-open');
    };

    const closeMobileNav = () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('is-open');
    };

    hamburger.addEventListener('click', () => {
      if (mobileNav.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileNavClose.addEventListener('click', closeMobileNav);
    
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeMobileNav();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileNav();
      }
    });
  };

  // Smooth scrolling
  const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile nav if open
          const mobileNav = document.getElementById('mobile-nav');
          if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
              hamburger.setAttribute('aria-expanded', 'false');
              hamburger.classList.remove('is-open');
            }
          }
        }
      });
    });
  };

  // Initialize everything
  const init = () => {
    initializeMobileNav();
    setupThemeSwitcher();
    setupNavShine();
    setupButtonEffects();
    setupMobileNav();
    setupSmoothScrolling();

    console.log('Website initialized successfully!');
  };

  // Start initialization
  init();

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const mobileNav = document.getElementById('mobile-nav');
      if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('is-open');
        }
      }
    }, 100);
  });
});