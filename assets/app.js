(() => {
  const root = document.documentElement;
  const button = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  const indexPanel = navigation?.closest('.section-index') || navigation;
  const header = document.querySelector('.site-header');
  const mobile = window.matchMedia('(max-width: 980px)');
  const links = [...document.querySelectorAll('#site-nav a[href^="#"]')];
  const targets = links.map(link => {
    const id = decodeURIComponent(link.hash.slice(1));
    return { link, section: document.getElementById(id) };
  }).filter(item => item.section);

  function updateHeaderHeight() {
    if (header) root.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
  }

  function setMenu(open, returnFocus = false) {
    if (!button || !indexPanel) return;
    const expanded = open && mobile.matches;
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
    const label = button.querySelector('.menu-label');
    if (label) label.textContent = expanded ? 'Close' : 'Menu';
    else if (!button.querySelector('svg')) button.textContent = expanded ? 'Close' : 'Menu';
    indexPanel.classList.toggle('is-open', expanded);
    navigation?.classList.toggle('is-open', expanded);
    if (expanded) navigation?.querySelector('a')?.focus({ preventScroll: true });
    if (returnFocus) button.focus();
  }

  function setActive(link) {
    links.forEach(item => {
      if (item === link) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
      item.classList.toggle('is-active', item === link);
    });
  }

  if (button && indexPanel) {
    button.addEventListener('click', () => {
      setMenu(button.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setMenu(false, true);
      }
    });
    document.addEventListener('click', event => {
      if (button.getAttribute('aria-expanded') === 'true' &&
          !indexPanel.contains(event.target) && !button.contains(event.target)) {
        setMenu(false);
      }
    });
    const handleViewportChange = () => { setMenu(false); updateHeaderHeight(); };
    if (mobile.addEventListener) mobile.addEventListener('change', handleViewportChange);
    else mobile.addListener(handleViewportChange);
    setMenu(false);
  }

  links.forEach(link => link.addEventListener('click', () => {
    const wasMenuOpen = button?.getAttribute('aria-expanded') === 'true';
    setActive(link);
    setMenu(false);
    if (wasMenuOpen) {
      const section = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      section?.setAttribute('tabindex', '-1');
      section?.focus({ preventScroll: true });
    }
  }));

  document.querySelectorAll('.figure-marker[data-credit]').forEach(marker => {
    marker.addEventListener('click', () => {
      const credit = document.getElementById(marker.dataset.credit);
      const details = credit?.closest('details');
      if (!credit || !details) return;
      details.open = true;
      credit.scrollIntoView({ block: 'start', behavior: 'auto' });
      credit.querySelector('a')?.focus({ preventScroll: true });
    });
  });

  updateHeaderHeight();
  if ('ResizeObserver' in window && header) {
    new ResizeObserver(updateHeaderHeight).observe(header);
  }

  function updateActiveSection() {
    const headerBottom = header?.getBoundingClientRect().bottom || 78;
    const activationLine = Math.max(headerBottom + 75, window.innerHeight * 0.3);
    let selected = targets[0];
    for (const item of targets) {
      if (item.section.getBoundingClientRect().top <= activationLine) selected = item;
    }
    if (selected) setActive(selected.link);
  }

  if ('IntersectionObserver' in window && targets.length) {
    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: '-95px 0px -55% 0px',
      threshold: [0, 0.1, 0.4, 0.8]
    });
    targets.forEach(item => observer.observe(item.section));
  }
  window.addEventListener('hashchange', () => {
    const match = targets.find(item => item.link.hash === window.location.hash);
    if (match) setActive(match.link);
  });
  window.addEventListener('load', () => { updateHeaderHeight(); updateActiveSection(); }, { once: true });
  updateActiveSection();
  root.classList.add('js');
})();
