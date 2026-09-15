(function () {
  'use strict';

  // Sticky header: add a border/shadow once the page has scrolled.
  var header = document.getElementById('site-header');
  var setScrolled = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  // Mobile nav toggle.
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  navToggle.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      mobileNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Reservation form: front-end only. Validate, then show a confirmation
  // message in place of a real submission until a booking backend exists.
  var form = document.getElementById('reservation-form');
  var status = document.getElementById('form-status');

  var errorMessages = {
    name: 'Enter your name.',
    phone: 'Enter a phone number.',
    date: 'Choose a date.',
    time: 'Choose a time.',
    party: 'Select a party size.',
    email: 'Enter a valid email address.'
  };

  function setFieldError(field, message) {
    var errorEl = form.querySelector('[data-error-for="' + field.id + '"]');
    if (errorEl) {
      errorEl.textContent = message || '';
    }
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var valid = true;
    ['name', 'phone', 'date', 'time', 'party', 'email'].forEach(function (name) {
      var field = form.elements[name];
      var message = '';
      if (!field.value.trim()) {
        message = errorMessages[name];
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        message = errorMessages[name];
      }
      if (message) {
        valid = false;
      }
      setFieldError(field, message);
    });

    status.classList.remove('is-success');
    status.classList.add('is-visible');

    if (!valid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      return;
    }

    var partySize = form.elements.party.value;
    var date = form.elements.date.value;
    status.classList.add('is-success');
    status.textContent = 'Thanks — we have your request for ' + partySize + ' on ' + date +
      '. We will confirm by phone or email within one business day.';
    form.reset();
  });
})();
