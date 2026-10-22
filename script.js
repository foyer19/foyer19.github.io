document.getElementById('annee').textContent = new Date().getFullYear();

const mesActivites = [
  { titre: 'Fête du village', date: 'Samedi 17 et dimanche 18 Juillet 2027', image: '', inscrits: 0, quota: 300 },
  { titre: 'Burger frites', date: 'Samedi 5 Juin 2027', image: '', inscrits: 0, quota: 240 },
  { titre: 'Moules frites karaoké', date: 'Samedi 17 Avril 2027', image: '', inscrits: 0, quota: 240 },
  { titre: 'Aligot saucisse', date: 'Samedi 20 Février 2027', image: '', inscrits: 0, quota: 150 }
];

const container = document.getElementById('listeActivites');
const sommaire = document.getElementById('listeDates');

if (container && sommaire) {
  container.innerHTML = '';
  sommaire.innerHTML = '';

  mesActivites.forEach(function (act) {
    sommaire.innerHTML += '<li><strong>' + act.date + '</strong> : ' + act.titre + '</li>';

    const pourcentage = Math.min((act.inscrits / act.quota) * 100, 100);
    let couleurJauge = '#22c55e';

    if (pourcentage > 70) couleurJauge = '#f59e0b';
    if (pourcentage >= 100) couleurJauge = '#ef4444';

    const badge = act.inscrits >= act.quota ? '<div class="badge-complet">Complet</div>' : '';
    const initiales = act.titre
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');

    const carte = '<article class="event-card">' +
      badge +
      '<div class="card-visual" aria-hidden="true">' + initiales + '</div>' +
      '<div class="card-content">' +
      '<h3>' + act.titre + '</h3>' +
      '<p class="card-date">' + act.date + '</p>' +
      '<div class="progress-bg"><div class="progress-bar" style="width:' + pourcentage + '%; background:' + couleurJauge + ';"></div></div>' +
      '<p class="card-meta">Places : ' + act.inscrits + ' / ' + act.quota + '</p>' +
      '</div>' +
      '</article>';

    container.innerHTML += carte;
  });
}

fetch('https://api.countapi.xyz/hit/foyer19.github.io/visits')
  .then(function (response) {
    if (!response.ok) {
      throw new Error('API inaccessible');
    }
    return response.json();
  })
  .then(function (data) {
    const countEl = document.getElementById('visit-count');
    if (countEl && typeof data.value !== 'undefined') {
      countEl.textContent = Number(data.value).toLocaleString('fr-FR');
    }
  })
  .catch(function () {
    const countEl = document.getElementById('visit-count');
    if (countEl) {
      countEl.textContent = '0';
    }
  });
