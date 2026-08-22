/* ============================================
   Forms: validation and submission
   ============================================ */

/* ----- Validation helpers ----- */
function showError(field, message) {
  const wrapper = field.closest('.form-field');
  if (!wrapper) return;
  wrapper.classList.add('error');
  const msg = wrapper.querySelector('.error-msg');
  if (msg) msg.textContent = message;
}

function clearError(field) {
  const wrapper = field.closest('.form-field');
  if (!wrapper) return;
  wrapper.classList.remove('error');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[+]?[\d\s\-()]{7,15}$/.test(phone);
}

/* ----- Feedback form ----- */
function initFeedbackForm() {
  const form = document.querySelector('#feedbackForm');
  if (!form) return;

  /* Star rating */
  const stars = form.querySelectorAll('.rating-stars span');
  let rating = 0;

  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      rating = idx + 1;
      stars.forEach((s, i) => s.classList.toggle('active', i < rating));
    });
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i <= idx));
    });
  });

  form.querySelector('.rating-stars')?.addEventListener('mouseleave', () => {
    stars.forEach((s, i) => s.classList.toggle('active', i < rating));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
    else clearError(name);

    if (!email.value.trim()) { showError(email, 'Please enter your email'); valid = false; }
    else if (!isValidEmail(email.value)) { showError(email, 'Please enter a valid email'); valid = false; }
    else clearError(email);

    if (!message.value.trim()) { showError(message, 'Please enter your feedback'); valid = false; }
    else if (message.value.trim().length < 10) { showError(message, 'Feedback must be at least 10 characters'); valid = false; }
    else clearError(message);

    if (rating === 0) {
      const ratingField = form.querySelector('.form-field.rating');
      if (ratingField) showError(ratingField.querySelector('.rating-stars'), 'Please select a rating');
      valid = false;
    }

    if (valid) {
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Thank you for your feedback! We appreciate your input.';
      }
      form.reset();
      stars.forEach((s) => s.classList.remove('active'));
      rating = 0;
      setTimeout(() => { if (success) success.classList.remove('show'); }, 5000);
    }
  });
}

/* ----- Contact form ----- */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#cName');
    const email = form.querySelector('#cEmail');
    const subject = form.querySelector('#cSubject');
    const message = form.querySelector('#cMessage');

    if (!name.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
    else clearError(name);

    if (!email.value.trim()) { showError(email, 'Please enter your email'); valid = false; }
    else if (!isValidEmail(email.value)) { showError(email, 'Please enter a valid email'); valid = false; }
    else clearError(email);

    if (!subject.value.trim()) { showError(subject, 'Please enter a subject'); valid = false; }
    else clearError(subject);

    if (!message.value.trim()) { showError(message, 'Please enter your message'); valid = false; }
    else clearError(message);

    if (valid) {
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Your message has been sent! We will get back to you soon.';
      }
      form.reset();
      setTimeout(() => { if (success) success.classList.remove('show'); }, 5000);
    }
  });
}

/* ----- Donor registration form ----- */
function initDonorForm() {
  const form = document.querySelector('#donorForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#dName');
    const age = form.querySelector('#dAge');
    const bloodGroup = form.querySelector('#dBloodGroup');
    const phone = form.querySelector('#dPhone');
    const city = form.querySelector('#dCity');

    if (!name.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
    else clearError(name);

    if (!age.value) { showError(age, 'Please enter your age'); valid = false; }
    else if (parseInt(age.value, 10) < 18 || parseInt(age.value, 10) > 65) {
      showError(age, 'Donors must be between 18 and 65 years old'); valid = false;
    } else clearError(age);

    if (!bloodGroup.value) { showError(bloodGroup, 'Please select your blood group'); valid = false; }
    else clearError(bloodGroup);

    if (!phone.value.trim()) { showError(phone, 'Please enter your phone number'); valid = false; }
    else if (!isValidPhone(phone.value)) { showError(phone, 'Please enter a valid phone number'); valid = false; }
    else clearError(phone);

    if (!city.value.trim()) { showError(city, 'Please enter your city'); valid = false; }
    else clearError(city);

    if (valid) {
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Thank you for registering as a donor! You will be contacted soon.';
      }
      form.reset();
      setTimeout(() => { if (success) success.classList.remove('show'); }, 5000);
    }
  });
}

/* ----- Init ----- */
document.addEventListener('DOMContentLoaded', () => {
  initFeedbackForm();
  initContactForm();
  initDonorForm();
});
