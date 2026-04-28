/* ═══════════════════════════════════════════════════
   LabCalcs — Navigation & Tool Registry v1.0
   ═══════════════════════════════════════════════════ */

const LC = window.LC || {};

LC.categories = [
  { id: 'general-lab', name: 'General Lab', icon: '🧪', color: '#2dd4bf', path: '/general-lab/' },
  { id: 'analytical', name: 'Analytical Chemistry', icon: '🔬', color: '#34d399', path: '/analytical-chemistry/' },
  { id: 'biology', name: 'Biology & Biochemistry', icon: '🧬', color: '#818cf8', path: '/biology-biochemistry/' },
  { id: 'spectroscopy', name: 'Spectroscopy', icon: '📊', color: '#f59e0b', path: '/spectroscopy/' },
  { id: 'organic', name: 'Organic Chemistry', icon: '⚗️', color: '#f472b6', path: '/organic-chemistry/' },
  { id: 'inorganic', name: 'Inorganic Chemistry', icon: '🪨', color: '#38bdf8', path: '/inorganic-chemistry/' },
  { id: 'physical', name: 'Physical Chemistry', icon: '📐', color: '#a78bfa', path: '/physical-chemistry/' },
];

LC.tools = [
  // General Lab
  { name: 'Molarity Calculator', cat: 'general-lab', path: '/general-lab/molarity-calculator.html', aka: ['moles','molar','concentration','molecular weight'], desc: 'Calculate molarity, mass, volume, or moles.' },
  { name: 'Dilution Calculator', cat: 'general-lab', path: '/general-lab/dilution-calculator.html', aka: ['C1V1','C2V2','dilute','serial dilution'], desc: 'C₁V₁ = C₂V₂ with flexible units.' },
  { name: 'RCF ↔ RPM Converter', cat: 'general-lab', path: '/general-lab/rcf-rpm-converter.html', aka: ['centrifuge','g-force','rotor','spin'], desc: 'Convert between RCF and RPM.' },
  { name: 'Stock Solution Calculator', cat: 'general-lab', path: '/general-lab/stock-solution-calculator.html', aka: ['buffer','reagent','recipe','weigh','prep','tris','HEPES','NaCl'], desc: 'How much to weigh for 60+ reagents.' },

  // Analytical Chemistry
  { name: 'Mass Accuracy Calculator', cat: 'analytical', path: '/analytical-chemistry/mass-accuracy-calculator.html', aka: ['ppm','Da','mass error','mass spec'], desc: 'Convert between ppm and Da mass error.', soon: true },
  { name: 'Theoretical Plates Calculator', cat: 'analytical', path: '/analytical-chemistry/theoretical-plates-calculator.html', aka: ['column efficiency','N','HETP','plate count'], desc: 'Calculate column efficiency.', soon: true },
  { name: 'Resolution Calculator', cat: 'analytical', path: '/analytical-chemistry/resolution-calculator.html', aka: ['Rs','peak resolution','separation'], desc: 'Determine chromatographic resolution.', soon: true },
  { name: 'LOD/LOQ Calculator', cat: 'analytical', path: '/analytical-chemistry/lod-loq-calculator.html', aka: ['limit of detection','limit of quantitation','sensitivity','calibration'], desc: 'Estimate detection and quantitation limits.', soon: true },

  // Biology & Biochemistry
  { name: 'Henderson-Hasselbalch Calculator', cat: 'biology', path: '/biology-biochemistry/henderson-hasselbalch-calculator.html', aka: ['buffer pH','pKa','acid base'], desc: 'Calculate buffer pH from component ratios.' },
  { name: 'PCR Master Mix Calculator', cat: 'biology', path: '/biology-biochemistry/pcr-master-mix-calculator.html', aka: ['polymerase','reaction','Taq','primer'], desc: 'Scale PCR reactions with overage.', soon: true },
  { name: 'SDS-PAGE Gel Recipe', cat: 'biology', path: '/biology-biochemistry/sds-page-gel-recipe.html', aka: ['acrylamide','gel percentage','stacking','separating'], desc: 'Get exact volumes for pouring gels.', soon: true },

  // Spectroscopy
  { name: 'Beer-Lambert Calculator', cat: 'spectroscopy', path: '/spectroscopy/beer-lambert-calculator.html', aka: ['absorbance','extinction coefficient','path length','A=elc'], desc: 'Solve A = εlc for any variable.', soon: true },
  { name: 'A280 Protein Concentration', cat: 'spectroscopy', path: '/spectroscopy/a280-protein-concentration.html', aka: ['UV absorbance','nanodrop','protein quantitation','280nm'], desc: 'Protein concentration from UV absorbance.', soon: true },

  // Organic Chemistry
  { name: 'Theoretical Yield Calculator', cat: 'organic', path: '/organic-chemistry/theoretical-yield-calculator.html', aka: ['product','stoichiometry','reaction yield'], desc: 'Calculate maximum product from reactants.' },
  { name: 'Percent Yield Calculator', cat: 'organic', path: '/organic-chemistry/percent-yield-calculator.html', aka: ['actual yield','efficiency'], desc: 'Determine reaction efficiency.', soon: true },
  { name: 'Degree of Unsaturation', cat: 'organic', path: '/organic-chemistry/degree-of-unsaturation-calculator.html', aka: ['DoU','IHD','index of hydrogen deficiency','double bond equivalents'], desc: 'Calculate degrees of unsaturation from formula.', soon: true },

  // Inorganic Chemistry
  { name: 'Oxidation State Calculator', cat: 'inorganic', path: '/inorganic-chemistry/oxidation-state-calculator.html', aka: ['oxidation number','redox'], desc: 'Determine oxidation states in compounds.', soon: true },
  { name: 'Electron Configuration', cat: 'inorganic', path: '/inorganic-chemistry/electron-configuration.html', aka: ['orbital','aufbau','periodic table'], desc: 'Generate electron configurations.', soon: true },

  // Physical Chemistry
  { name: 'Ideal Gas Law Calculator', cat: 'physical', path: '/physical-chemistry/ideal-gas-law-calculator.html', aka: ['PV=nRT','pressure','volume','temperature','gas'], desc: 'Solve PV=nRT for any variable.' },
  { name: 'Nernst Equation Calculator', cat: 'physical', path: '/physical-chemistry/nernst-equation-calculator.html', aka: ['cell potential','electrochemistry','EMF'], desc: 'Calculate cell potential at non-standard conditions.', soon: true },
  { name: 'Gibbs Free Energy Calculator', cat: 'physical', path: '/physical-chemistry/gibbs-free-energy-calculator.html', aka: ['delta G','enthalpy','entropy','spontaneous'], desc: 'Calculate ΔG from ΔH and ΔS.', soon: true },
];

// Get base path (works whether site is at root or in subfolder)
LC.basePath = '';

function getToolsByCat(catId) {
  return LC.tools.filter(t => t.cat === catId && !t.soon);
}

function getAllToolsByCat(catId) {
  return LC.tools.filter(t => t.cat === catId);
}

// ── Build Navigation ──
function buildNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  let linksHTML = '';
  LC.categories.forEach(cat => {
    const tools = getAllToolsByCat(cat.id);
    let menuHTML = `<a class="dd-cat-link" href="${LC.basePath}${cat.path}">All ${cat.name} →</a>`;
    tools.forEach(t => {
      if (t.soon) {
        menuHTML += `<a href="#" style="opacity:0.4;pointer-events:none;">${t.name} (soon)</a>`;
      } else {
        menuHTML += `<a href="${LC.basePath}${t.path}">${t.name}</a>`;
      }
    });

    linksHTML += `
      <div class="nav-dropdown" data-cat="${cat.id}">
        <button>${cat.name}</button>
        <div class="nav-dropdown-menu">${menuHTML}</div>
      </div>`;
  });

  nav.innerHTML = `
    <a class="nav-logo" href="${LC.basePath}/">Lab<span>Calcs</span></a>
    <div class="nav-links">${linksHTML}</div>
    <div class="nav-search">
      <input type="text" placeholder="Search tools..." id="navSearchInput" autocomplete="off">
      <div class="nav-search-results" id="navSearchResults"></div>
    </div>
    <button class="nav-hamburger" id="navHamburger" aria-label="Menu">☰</button>
  `;

  // Build mobile overlay
  let mobileHTML = `<button class="nav-mobile-close" id="navMobileClose">✕</button>`;
  LC.categories.forEach(cat => {
    const tools = getAllToolsByCat(cat.id);
    mobileHTML += `<h3>${cat.icon} ${cat.name}</h3>`;
    mobileHTML += `<a href="${LC.basePath}${cat.path}">Browse all →</a>`;
    tools.forEach(t => {
      if (!t.soon) {
        mobileHTML += `<a href="${LC.basePath}${t.path}">${t.name}</a>`;
      }
    });
  });

  let overlay = document.getElementById('navMobileOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'navMobileOverlay';
    overlay.className = 'nav-mobile-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = mobileHTML;

  // Dropdown behavior — position fixed menus relative to buttons
  function positionDropdown(dd) {
    const btn = dd.querySelector('button');
    const menu = dd.querySelector('.nav-dropdown-menu');
    if (!btn || !menu) return;
    const rect = btn.getBoundingClientRect();
    menu.style.top = (rect.bottom + 4) + 'px';
    menu.style.left = rect.left + 'px';
  }

  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    dd.addEventListener('mouseenter', function() {
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      positionDropdown(this);
      this.classList.add('open');
    });
    dd.addEventListener('mouseleave', function() {
      this.classList.remove('open');
    });
  });

  document.querySelectorAll('.nav-dropdown > button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const dd = this.parentElement;
      const wasOpen = dd.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      if (!wasOpen) {
        positionDropdown(dd);
        dd.classList.add('open');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  });

  // Hamburger
  document.getElementById('navHamburger').addEventListener('click', () => {
    document.getElementById('navMobileOverlay').classList.add('open');
  });

  document.getElementById('navMobileClose').addEventListener('click', () => {
    document.getElementById('navMobileOverlay').classList.remove('open');
  });

  // Nav search
  const navInput = document.getElementById('navSearchInput');
  const navResults = document.getElementById('navSearchResults');

  navInput.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    if (q.length < 1) { navResults.classList.remove('open'); return; }
    const matches = searchTools(q);
    if (matches.length === 0) {
      navResults.innerHTML = '<div style="padding:12px;color:var(--text-dim);font-size:13px;">No results</div>';
    } else {
      navResults.innerHTML = matches.slice(0, 8).map(t => {
        const cat = LC.categories.find(c => c.id === t.cat);
        return `<a href="${LC.basePath}${t.path}"><span>${t.name}</span><span class="sr-cat">${cat ? cat.name : ''}</span></a>`;
      }).join('');
    }
    navResults.classList.add('open');
  });

  navInput.addEventListener('blur', () => {
    setTimeout(() => navResults.classList.remove('open'), 200);
  });
}

// ── Search ──
function searchTools(query) {
  const q = query.toLowerCase();
  return LC.tools.filter(t => !t.soon).map(t => {
    let score = 0;
    const name = t.name.toLowerCase();
    if (name === q) score = 100;
    else if (name.startsWith(q)) score = 90;
    else if (name.includes(q)) score = 70;
    else if (t.desc && t.desc.toLowerCase().includes(q)) score = 50;
    else if (t.aka && t.aka.some(a => a.toLowerCase().includes(q))) score = 60;
    else score = 0;
    return { ...t, score };
  }).filter(t => t.score > 0).sort((a, b) => b.score - a.score);
}

// ── Breadcrumb ──
function buildBreadcrumb(catId, toolName) {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  const cat = LC.categories.find(c => c.id === catId);
  if (!cat) return;
  bc.innerHTML = `<a href="${LC.basePath}/">Home</a><span class="sep">›</span><a href="${LC.basePath}${cat.path}">${cat.name}</a><span class="sep">›</span>${toolName}`;
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
});

window.LC = LC;
