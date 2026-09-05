`script.js`
/**
 * Personal Portfolio Functional Logic Layer
 * Alina Faizan Ali Portfolio — 2026 Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Theme Controller Switch Logic Module ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Verify default choices cached within localStorage variables
  const savedTheme = localStorage.getItem('portfolio-theme-preference');
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    // Check client machine OS preferred styles layout
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const incomingTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', incomingTheme);
    localStorage.setItem('portfolio-theme-preference', incomingTheme);
  });


  // --- Mobile Sidebar Navigation Drawer Navigation Controller ---
  const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileSidebar = () => {
    mobileMenuTrigger.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    document.body.classList.toggle('lock-scroll-fix');
  };

  mobileMenuTrigger.addEventListener('click', toggleMobileSidebar);

  // Close sidebar drawer immediately on trigger link click selection
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMobileSidebar();
      }
    });
  });


  // --- Contact Form Submission Interception Architecture Engine ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitButton = document.getElementById('submit-email-action');
  const btnLabel = submitButton.querySelector('.btn-label-text');
  const loadingSpinner = submitButton.querySelector('.loading-spinner-svg');
  const successBanner = document.getElementById('form-success-banner');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop raw tracking layout form reloading

    // Transition elements into a loading configuration layout state
    submitButton.disabled = true;
    btnLabel.textContent = "Sending Info...";
    loadingSpinner.classList.remove('hide-spinner');
    
    // Simulate API form delivery pipeline delay metrics
    setTimeout(() => {
      // Revert loading mechanics states
      loadingSpinner.classList.add('hide-spinner');
      btnLabel.textContent = "Email Sent!";
      
      // Reveal success alert box module UI panels
      successBanner.classList.remove('hide-alert');
      
      // Clear current form inputs data properties safely
      contactForm.reset();

      // Reset submit action button back state properties after presentation interval
      setTimeout(() => {
        submitButton.disabled = false;
        btnLabel.textContent = "Email Me";
        successBanner.classList.add('hide-alert');
      }, 5000);

    }, 1800);
  });

});