// ============ LOADING SCREEN ============
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 600);
  }, 800);
});

// ============ CUSTOM CURSOR ============
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  if (window.innerWidth <= 768) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    return;
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });
  
  function updateOutline() {
    outlineX += (mouseX - outlineX) * 0.2;
    outlineY += (mouseY - outlineY) * 0.2;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(updateOutline);
  }
  
  updateOutline();
  
  // Hover effects on interactive elements
  document.querySelectorAll('a, button, .service-card, .process-step').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('hovered');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('hovered');
    });
  });
});

// ============ NAVBAR SCROLL EFFECT ============
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============ SCROLL REVEAL ANIMATIONS ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.service-card, .process-step, .pricing-card, .section-title, .included-item').forEach(el => {
  el.classList.add('animate-on-scroll');
  revealObserver.observe(el);
});

// ============ MODAL HANDLING ============
const modal = document.getElementById('briefModal');
const form = document.getElementById('briefForm');
const questions = [...document.querySelectorAll('.question')];
const stepLabel = document.getElementById('stepLabel');
let currentStep = 0;

function showStep(index) {
  currentStep = index;
  
  questions.forEach((question, i) => {
    question.classList.toggle('active', i === currentStep);
  });
  
  stepLabel.textContent = `${String(currentStep + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
  
  const input = questions[currentStep].querySelector('input:not([type="radio"]), textarea');
  if (input) {
    setTimeout(() => input.focus(), 100);
  }
}

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  showStep(0);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.open-brief').forEach(button => {
  button.addEventListener('click', openModal);
});

document.querySelectorAll('.close-brief').forEach(button => {
  button.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Next button
document.querySelectorAll('.next').forEach(button => {
  button.addEventListener('click', () => {
    const currentQuestions = questions[currentStep].querySelectorAll('[required]');
    let isValid = true;
    
    currentQuestions.forEach(field => {
      if (field.type === 'radio') {
        const radios = questions[currentStep].querySelectorAll(`input[name="${field.name}"]`);
        const checked = [...radios].some(r => r.checked);
        if (!checked) isValid = false;
      } else if (!field.value.trim()) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      const firstInvalid = questions[currentStep].querySelector('input:not([type="radio"]):invalid, textarea:invalid');
      if (firstInvalid) {
        firstInvalid.reportValidity();
      } else {
        questions[currentStep].querySelector('input[type="radio"]').closest('label').style.borderColor = 'var(--accent-coral)';
      }
      return;
    }
    
    if (currentStep < questions.length - 1) {
      showStep(currentStep + 1);
    }
  });
});

// Back button
document.querySelectorAll('.back').forEach(button => {
  button.addEventListener('click', () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  const message = `Hi Hamza! I'd like to discuss a website project.\n\n*CLIENT DETAILS*\nName: ${data.name}\nContact: ${data.contact}\nBusiness: ${data.business}\nWhat they offer: ${data.businessDescription}\n\n*WEBSITE BRIEF*\nWebsite type: ${data.type}\nPrimary goal: ${data.goal}\nIdeal audience: ${data.audience}\nRequired pages: ${data.pages}\nBrand assets: ${data.branding}\nContent & images: ${data.content}\nDomain & hosting: ${data.domain}\nSpecial features: ${data.features}\nTimeline: ${data.timeline}\nBudget: ${data.budget}\n\n*EXTRA NOTES*\n${data.extra || 'None provided'}`;
  
  window.open(`https://wa.me/923393962005?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.5;
    const yPos = -(window.scrollY * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// ============ FORM VALIDATION STYLING ============
document.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('focus', () => {
    field.style.borderColor = 'var(--accent-amber)';
  });
  
  field.addEventListener('blur', () => {
    field.style.borderColor = 'var(--border-subtle)';
  });
});
