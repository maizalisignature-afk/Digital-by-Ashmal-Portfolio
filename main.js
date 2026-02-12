/*~~~~~~~~~~~~~~~ TOGGLE BUTTON ~~~~~~~~~~~~~~~*/
const hamBurger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu")
const navLink = document.querySelectorAll(".nav-links")
const closeIcon = document.getElementById("nav-close")

navLink.forEach((link) => (
    link.addEventListener("click", () => {
navMenu.classList.add("hidden")
        
    })
))
    closeIcon.addEventListener("click", () => {
navMenu.classList.add("hidden")
        
    })

    hamBurger.addEventListener("click", () => {
navMenu.classList.remove("hidden")
        
    })


/*~~~~~~~~~~~~~~~ DARK LIGHT THEME ~~~~~~~~~~~~~~~*/
const html = document.querySelector("html");
const themeBtn = document.getElementById("theme-toggle");

// Check saved mode from localStorage
if (localStorage.getItem("mode") === "dark") {
  enableDarkMode();
} else {
  enableLightMode();
}

// Toggle when user clicks the icon
themeBtn.addEventListener("click", () => {
  if (localStorage.getItem("mode") === "dark") {
    enableLightMode();
  } else {
    enableDarkMode();
  }
});

// ====== FUNCTIONS ======

function enableDarkMode() {
  html.classList.add("dark");
  themeBtn.classList.replace("ri-moon-line", "ri-sun-line");
  localStorage.setItem("mode", "dark");
}

function enableLightMode() {
  html.classList.remove("dark");
  themeBtn.classList.replace("ri-sun-line", "ri-moon-line");
  localStorage.setItem("mode", "light");
}


/*~~~~~~~~~~~~~~~ CHANGE BACKGROUND HEADER ~~~~~~~~~~~~~~~*/
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("bg-whiteColor", "dark:bg-darkBodyColor", "shadow-lg");
    navbar.classList.remove("bg-transparent");
  } else {
    navbar.classList.remove("bg-whiteColor", "dark:bg-darkBodyColor", "shadow-lg");
    navbar.classList.add("bg-transparent");
  }
});

/*~~~~~~~~~~~~~~~ SHOW SCROLL UP ~~~~~~~~~~~~~~~*/
const scrollUp = document.getElementById("scroll-up");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollUp.classList.remove("translate-y-20", "opacity-0");
    scrollUp.classList.add("translate-y-0", "opacity-100");
  } else {
    scrollUp.classList.add("translate-y-20", "opacity-0");
    scrollUp.classList.remove("translate-y-0", "opacity-100");
  }
});

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/*~~~~~~~~~~~~~~~ SCROLL SECTIONS ACTIVE LINK ~~~~~~~~~~~~~~~*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute("id");
    }
  });

  navLink.forEach((link) => {
    link.classList.remove("text-primaryColor");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("text-primaryColor");
    }
  });
});

/*~~~~~~~~~~~~~~~ SCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      
      // Animate progress bars when skills section is visible
      if (entry.target.classList.contains('skill-card')) {
        const progressFill = entry.target.querySelector('.progress-fill');
        if (progressFill) {
          const progress = progressFill.style.getPropertyValue('--progress');
          progressFill.style.width = progress;
        }
      }
      
      // Add floating animation to review cards
      if (entry.target.classList.contains('review-card')) {
        entry.target.style.animation = 'float 3s ease-in-out infinite';
      }
    }
  });
}, observerOptions);

// Observe all elements with section-animate class
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".section-animate");
  animatedElements.forEach((el) => observer.observe(el));
  
  // Add floating animation to hero elements
  const heroElements = document.querySelectorAll(".hero-content, .hero-image, .hero-stats");
  heroElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    
    setTimeout(() => {
      el.style.transition = "all 0.8s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  });
  
  // Initialize progress bars
  initializeProgressBars();
  
  // Add floating particles
  createFloatingParticles();
  
  // Add mouse parallax effect
  initMouseParallax();
  
  // Add hover sound effects (optional)
  initHoverEffects();
});

/*~~~~~~~~~~~~~~~ PROGRESS BAR ANIMATION ~~~~~~~~~~~~~~~*/
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach((bar, index) => {
    const progress = bar.style.getPropertyValue('--progress');
    bar.style.width = '0%';
    
    // Animate progress bars when they come into view
    const skillCard = bar.closest('.skill-card');
    if (skillCard) {
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.transition = 'width 1.5s ease-out';
              bar.style.width = progress;
            }, index * 200); // Stagger the animations
          }
        });
      }, { threshold: 0.5 });
      
      cardObserver.observe(skillCard);
    }
  });
}

/*~~~~~~~~~~~~~~~ FLOATING PARTICLES ~~~~~~~~~~~~~~~*/
function createFloatingParticles() {
  const skillsSection = document.getElementById('skills');
  const reviewsSection = document.getElementById('reviews');
  
  [skillsSection, reviewsSection].forEach((section) => {
    if (section) {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 6) + 's';
        section.appendChild(particle);
      }
    }
  });
}

/*~~~~~~~~~~~~~~~ MOUSE PARALLAX EFFECT ~~~~~~~~~~~~~~~*/
function initMouseParallax() {
  const cards = document.querySelectorAll('.review-card, .skill-card');
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/*~~~~~~~~~~~~~~~ ENHANCED HOVER EFFECTS ~~~~~~~~~~~~~~~*/
function initHoverEffects() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn, .btn_outline');
  
  buttons.forEach((button) => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add glow effect to skill icons on hover
  const skillIcons = document.querySelectorAll('.skill-card .w-20');
  skillIcons.forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      icon.style.filter = 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.6))';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.filter = 'none';
    });
  });
}

/*~~~~~~~~~~~~~~~ SMOOTH SCROLL ENHANCEMENT ~~~~~~~~~~~~~~~*/
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    const offset = 80; // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Update navigation links to use smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScrollTo(target);
    });
  });
  
  // Initialize particle system
  initParticleSystem();
  
  // Initialize contact form
  initContactForm();
});

/*~~~~~~~~~~~~~~~ ADVANCED PARTICLE SYSTEM ~~~~~~~~~~~~~~~*/
function initParticleSystem() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  const particles = [];
  const maxParticles = 50;
  const connectionDistance = 150;
  
  // Create particles
  for (let i = 0; i < maxParticles; i++) {
    createParticle(container, particles);
  }
  
  // Animate particles
  animateParticles(particles, container);
  
  // Add mouse interaction
  addMouseInteraction(container, particles);
  
  // Create particle burst on click
  document.addEventListener('click', (e) => {
    createParticleBurst(e.clientX, e.clientY);
  });
}

function createParticle(container, particles) {
  const particle = document.createElement('div');
  const types = ['particle-small', 'particle-medium', 'particle-large', 'particle-glow'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  particle.className = `particle ${type}`;
  
  // Random starting position
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  
  particle.style.left = startX + 'px';
  particle.style.top = startY + 'px';
  
  // Random animation duration
  const duration = Math.random() * 10 + 10; // 10-20 seconds
  particle.style.animationDuration = duration + 's';
  
  // Random animation delay
  const delay = Math.random() * 5;
  particle.style.animationDelay = delay + 's';
  
  container.appendChild(particle);
  
  particles.push({
    element: particle,
    x: startX,
    y: startY,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -Math.random() * 0.5 - 0.2,
    size: type.includes('small') ? 2 : type.includes('medium') ? 4 : type.includes('large') ? 6 : 8
  });
}

function animateParticles(particles, container) {
  function animate() {
    particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.y < 0) particle.y = window.innerHeight;
      if (particle.y > window.innerHeight) particle.y = 0;
      
      // Update DOM element
      particle.element.style.transform = `translate(${particle.x - parseFloat(particle.element.style.left)}px, ${particle.y - parseFloat(particle.element.style.top)}px)`;
    });
    
    // Draw connections
    drawConnections(particles, container);
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

function drawConnections(particles, container) {
  // Remove old connection lines
  const oldLines = container.querySelectorAll('.connection-line');
  oldLines.forEach(line => line.remove());
  
  // Draw new connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const line = document.createElement('div');
        line.className = 'connection-line';
        
        const angle = Math.atan2(dy, dx);
        const length = distance;
        
        line.style.width = length + 'px';
        line.style.left = particles[j].x + 'px';
        line.style.top = particles[j].y + 'px';
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0 50%';
        line.style.opacity = (1 - distance / 150) * 0.3;
        
        container.appendChild(line);
      }
    }
  }
}

function addMouseInteraction(container, particles) {
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Repel particles from mouse
    particles.forEach(particle => {
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.1;
        particle.vy += (dy / distance) * force * 0.1;
      }
    });
  });
}

function createParticleBurst(x, y) {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  const burst = document.createElement('div');
  burst.className = 'particle-burst';
  burst.style.left = x + 'px';
  burst.style.top = y + 'px';
  
  // Create burst particles
  for (let i = 0; i < 12; i++) {
    const burstParticle = document.createElement('div');
    burstParticle.className = 'burst-particle';
    
    const angle = (Math.PI * 2 * i) / 12;
    const distance = Math.random() * 50 + 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    burstParticle.style.setProperty('--tx', tx + 'px');
    burstParticle.style.setProperty('--ty', ty + 'px');
    
    burst.appendChild(burstParticle);
  }
  
  container.appendChild(burst);
  
  // Remove burst after animation
  setTimeout(() => {
    burst.remove();
  }, 1000);
}

/*~~~~~~~~~~~~~~~ CONTACT FORM FUNCTIONALITY ~~~~~~~~~~~~~~~*/
function initContactForm() {
  // Initialize EmailJS with your service details
  (function() {
    emailjs.init("9pANBXoQjtlKCo2HY"); // Your actual EmailJS public key
  })();
  
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    setLoadingState(true);
    hideMessages();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_7cra2ag', // Gmail service ID
        'template_awr57ha', // Contact template ID
        formData
      );
      
      if (response.status === 200) {
        showSuccess();
        form.reset();
      } else {
        showError();
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      showError();
    } finally {
      setLoadingState(false);
    }
  });
  
  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
    } else {
      submitBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
    }
  }
  
  function showSuccess() {
    successMessage.classList.remove('hidden');
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 5000);
  }
  
  function showError() {
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
      errorMessage.classList.add('hidden');
    }, 5000);
  }
  
  function hideMessages() {
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
  }
}

/*~~~~~~~~~~~~~~~ PARALLAX EFFECT ~~~~~~~~~~~~~~~*/
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".animate-scaleAnimation");
  
  parallaxElements.forEach((el) => {
    const speed = 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/*~~~~~~~~~~~~~~~ TYPING ANIMATION ~~~~~~~~~~~~~~~*/
const typingText = document.querySelector(".title");
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = "";
  let index = 0;
  
  function typeWriter() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
    }
  }
  
  setTimeout(typeWriter, 1000);
}
