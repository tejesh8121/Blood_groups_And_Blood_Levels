/* ============================================
   Blood Group Compatibility Tool
   ============================================ */

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

/* Compatibility data: who can donate to whom, who can receive from whom */
const COMPATIBILITY = {
  'A+':  { donate: ['A+', 'AB+'],            receive: ['A+', 'A-', 'O+', 'O-'] },
  'A-':  { donate: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] },
  'B+':  { donate: ['B+', 'AB+'],            receive: ['B+', 'B-', 'O+', 'O-'] },
  'B-':  { donate: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] },
  'AB+': { donate: ['AB+'],                  receive: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  'AB-': { donate: ['AB+', 'AB-'],           receive: ['A-', 'B-', 'AB-', 'O-'] },
  'O+':  { donate: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'] },
  'O-':  { donate: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], receive: ['O-'] },
};

const GROUP_INFO = {
  'A+':  { prevalence: '30%', desc: 'The second most common blood type. Can donate to A+ and AB+ recipients.' },
  'A-':  { prevalence: '6%',  desc: 'A rare type. Important for platelet donation to A and AB patients.' },
  'B+':  { prevalence: '8%',  desc: 'Particularly common in Asian populations. Can donate to B+ and AB+ patients.' },
  'B-':  { prevalence: '2%',  desc: 'One of the rarest blood types. Universal importance for B and AB recipients.' },
  'AB+': { prevalence: '4%',  desc: 'The universal plasma donor and universal red cell recipient.' },
  'AB-': { prevalence: '1%',  desc: 'The rarest of all blood types. Plasma is valuable for all patients.' },
  'O+':  { prevalence: '40%', desc: 'The most common blood type. Can donate to O+, A+, B+, and AB+ patients.' },
  'O-':  { prevalence: '7%',  desc: 'The universal red cell donor. Critical for emergencies and trauma.' },
};

/* ----- Render blood group selector cards ----- */
function renderGroupCards() {
  const grid = document.querySelector('#groupCards');
  if (!grid) return;

  grid.innerHTML = BLOOD_GROUPS.map(
    (g) => `
    <div class="blood-group-card" data-group="${g}">
      <div class="blood-group-symbol">${g}</div>
      <div class="label">${GROUP_INFO[g].desc.split('.')[0]}.</div>
    </div>`
  ).join('');

  grid.querySelectorAll('.blood-group-card').forEach((card) => {
    card.addEventListener('click', () => {
      grid.querySelectorAll('.blood-group-card').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const group = card.getAttribute('data-group');
      showCompatibility(group);
    });
  });
}

/* ----- Show compatibility result ----- */
function showCompatibility(group) {
  const result = document.querySelector('#compatResult');
  const info = document.querySelector('#groupInfo');
  if (!result) return;

  const data = COMPATIBILITY[group];
  const infoData = GROUP_INFO[group];

  result.innerHTML = `
    <div class="compat-section donate">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
        Can Donate To
      </h4>
      <div class="compat-tags">
        ${data.donate.map((g) => `<span class="compat-tag donate">${g}</span>`).join('')}
      </div>
    </div>
    <div class="compat-section receive">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>
        Can Receive From
      </h4>
      <div class="compat-tags">
        ${data.receive.map((g) => `<span class="compat-tag receive">${g}</span>`).join('')}
      </div>
    </div>
  `;

  if (info) {
    info.innerHTML = `
      <div class="info-banner">
        <p><strong>${group}</strong> — Prevalence: ${infoData.prevalence}. ${infoData.desc}</p>
      </div>
    `;
  }

  result.classList.add('animate-fade-in-up');
}

/* ----- Select dropdown compatibility ----- */
function initCompatSelect() {
  const select = document.querySelector('#compatSelect');
  if (!select) return;

  select.addEventListener('change', () => {
    const group = select.value;
    if (group && COMPATIBILITY[group]) {
      showCompatibility(group);
      const card = document.querySelector(`.blood-group-card[data-group="${group}"]`);
      if (card) {
        document.querySelectorAll('.blood-group-card').forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
      }
    }
  });
}

/* ----- Init ----- */
document.addEventListener('DOMContentLoaded', () => {
  renderGroupCards();
  initCompatSelect();
});
