import '../css/styles.css'
import { setupEventListeners } from './eventHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  const fixedTop = document.querySelector('.fixed-top');
  const navLinks = document.querySelectorAll('nav a');

  function adjustBodyPadding() {
    const fixedHeight = fixedTop.offsetHeight;
    document.body.style.paddingTop = fixedHeight + 'px';
  }

  window.addEventListener('load', adjustBodyPadding);
  window.addEventListener('resize', adjustBodyPadding);

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const fixedHeight = fixedTop.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - fixedHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

