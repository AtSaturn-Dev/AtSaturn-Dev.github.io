// Track article sections without changing the reading column's position.
const sectionLinks = Array.from(document.querySelectorAll('.post-contents a'));
const headings = sectionLinks.map(link => document.getElementById(link.hash.slice(1)));
let scheduled = false;
function updateSection() {
  let active = -1;
  headings.forEach((heading, index) => {
    if (heading && heading.getBoundingClientRect().top <= 120) active = index;
  });
  sectionLinks.forEach((link, index) => {
    if (index === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateSection);
  }
}, { passive: true });
const outline = document.querySelector('.post-outline');
const desktop = window.matchMedia('(min-width: 1180px)');
function updateOutline() { if (outline) outline.open = desktop.matches; }
desktop.addEventListener('change', updateOutline);
updateOutline();
updateSection();
