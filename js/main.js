/**
 * Peninsula Insights - Interactive Website Scripts
 */
(function() {
  'use strict';

  // 1. Mobile navigation menu
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  if (btn && nav) {
    var updateBtnText = function(isOpen) {
      btn.setAttribute('aria-expanded', isOpen);
      var span = btn.querySelector('span');
      if (span) {
        span.textContent = isOpen ? 'Close' : 'Menu';
      } else {
        btn.textContent = isOpen ? 'Close' : 'Menu';
      }
    };

    btn.addEventListener('click', function() {
      var isOpen = nav.classList.toggle('open');
      updateBtnText(isOpen);
    });

    nav.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        updateBtnText(false);
      }
    });

    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        updateBtnText(false);
      }
    });
  }

  // 2. Dynamic Year
  var yrElements = document.querySelectorAll('.dynamic-yr, #yr');
  var currentYear = new Date().getFullYear();
  yrElements.forEach(function(el) {
    el.textContent = currentYear;
  });

  // 3. Consultation Form Validation & Mailto
  var form = document.getElementById('form');
  var status = document.getElementById('status');
  var TO = 'info@peninsulainsights.com';

  if (form) {
    var setErr = function(name, msg) {
      var errEl = form.querySelector('[data-for="' + name + '"]');
      if (errEl) errEl.textContent = msg;
    };

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var f = form.elements;
      var ok = true;

      setErr('name', '');
      setErr('email', '');
      setErr('topic', '');

      if (!f.name || !f.name.value.trim()) {
        setErr('name', 'Enter your name.');
        ok = false;
      }
      if (!f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) {
        setErr('email', 'Enter a valid email address.');
        ok = false;
      }
      if (f.topic && !f.topic.value) {
        setErr('topic', 'Choose a topic.');
        ok = false;
      }

      if (!ok) {
        if (status) status.textContent = 'Please fix the highlighted fields above.';
        return;
      }

      var body = [
        'Name: ' + (f.name ? f.name.value : ''),
        'Email: ' + (f.email ? f.email.value : ''),
        'Organisation: ' + (f.org ? f.org.value : ''),
        'Phone: ' + (f.phone ? f.phone.value : ''),
        'Topic: ' + (f.topic ? f.topic.value : ''),
        'Preferred Format: ' + (f.format ? f.format.value : ''),
        '',
        'Message:',
        (f.message ? f.message.value : '')
      ].join('\n');

      var subject = 'Consultation request: ' + (f.name ? f.name.value : 'Peninsula Insights');
      window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      if (status) {
        status.textContent = 'Your email client is opening with your request details. If it does not open automatically, please send your message directly to ' + TO + '.';
      }
    });
  }

  // 4. Gallery Category Filtering
  var filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
  var galleryCards = document.querySelectorAll('.gallery-card');

  if (filterButtons.length && galleryCards.length) {
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        filterButtons.forEach(function(b) { b.classList.remove('active'); });
        button.classList.add('active');

        var filter = button.getAttribute('data-filter');

        galleryCards.forEach(function(card) {
          var category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(function() {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Gallery Modal / Lightbox
  var modal = document.getElementById('galleryModal');
  if (modal) {
    var modalImg = modal.querySelector('.modal-img');
    var modalTitle = modal.querySelector('.modal-title');
    var modalBadge = modal.querySelector('.modal-badge');
    var modalDesc = modal.querySelector('.modal-desc');
    var modalClose = modal.querySelector('.modal-close');

    function openModal(card) {
      var img = card.querySelector('.gallery-img');
      var title = card.querySelector('.gallery-title');
      var badge = card.querySelector('.gallery-badge');
      var desc = card.querySelector('.gallery-desc');

      if (modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      }
      if (modalTitle && title) {
        modalTitle.textContent = title.textContent;
      }
      if (modalBadge && badge) {
        modalBadge.textContent = badge.textContent;
      }
      if (modalDesc && desc) {
        modalDesc.textContent = desc.textContent;
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-action="open-modal"]').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        var card = trigger.closest('.gallery-card');
        if (card) openModal(card);
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // 6. Image Graceful Fallback Helper
  // If an image src="photos/photoX.jpg" fails because the user hasn't copied the photo yet,
  // automatically fall back to the vector placeholder "photos/photoX.svg".
  document.querySelectorAll('img.gallery-img').forEach(function(img) {
    img.addEventListener('error', function() {
      var currentSrc = img.getAttribute('src');
      if (currentSrc && !currentSrc.endsWith('.svg')) {
        var base = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
        img.src = base + '.svg';
      }
    });
  });

})();
