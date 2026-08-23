const modal = document.getElementById('briefModal');
const form = document.getElementById('briefForm');
const questions = [...document.querySelectorAll('.question')];
const stepLabel = document.getElementById('stepLabel');
const progress = document.getElementById('progressBar');
let current = 0;

function showStep(index) {
  current = index;
  questions.forEach((question, questionIndex) => question.classList.toggle('active', questionIndex === current));
  stepLabel.textContent = `${String(current + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
  progress.style.width = `${((current + 1) / questions.length) * 100}%`;
  const input = questions[current].querySelector('input:not([type="radio"]), textarea');
  if (input) setTimeout(() => input.focus(), 100);
}

function openBrief() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  showStep(0);
}

function closeBrief() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.open-brief').forEach(button => button.addEventListener('click', openBrief));
document.querySelectorAll('.close-brief').forEach(button => button.addEventListener('click', closeBrief));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeBrief(); });

document.querySelectorAll('.next').forEach(button => button.addEventListener('click', () => {
  const required = [...questions[current].querySelectorAll('[required]')];
  const firstInvalid = required.find(field => !field.checkValidity());
  if (firstInvalid) { firstInvalid.reportValidity(); return; }
  if (current < questions.length - 1) showStep(current + 1);
}));

document.querySelectorAll('.back').forEach(button => button.addEventListener('click', () => {
  if (current > 0) showStep(current - 1);
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const message = `Hi Hamza! I’d like to discuss a website project.\n\n*CLIENT DETAILS*\nName: ${data.name}\nContact: ${data.contact}\nBusiness: ${data.business}\nWhat they offer: ${data.businessDescription}\n\n*WEBSITE BRIEF*\nWebsite type: ${data.type}\nPrimary goal: ${data.goal}\nIdeal audience: ${data.audience}\nRequired pages: ${data.pages}\nBrand assets: ${data.branding}\nContent & images: ${data.content}\nDomain & hosting: ${data.domain}\nSpecial features: ${data.features}\nTimeline: ${data.timeline}\nBudget: ${data.budget}\n\n*EXTRA NOTES*\n${data.extra || 'None provided'}`;
  window.open(`https://wa.me/923393962005?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
