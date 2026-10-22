document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('annee');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const mesActivites = [
    {
      titre: 'Fête du village',
      date: 'Samedi 17 et dimanche 18 Juillet 2027',
      image: 'fete2026.jpg',
      inscrits: 100,
      quota: 300,
      color: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
    },
    {
      titre: 'Burger frites',
      date: 'Samedi 5 Juin 2027',
      image: 'Burger.jpeg',
      inscrits: 50,
      quota: 240,
      color: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)'
    },
    {
      titre: 'Moules frites karaoké',
      date: 'Samedi 17 Avril 2027',
      image: 'moulesfrites.jpg',
      inscrits: 90,
      quota: 240,
      color: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
    },
    {
      titre: 'Aligot saucisse',
      date: 'Samedi 20 Février 2027',
      image: 'aligot.jpg',
      inscrits: 29,
      quota: 150,
      color: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'
    }
  ];

  const container = document.getElementById('listeActivites');
  const sommaire = document.getElementById('listeDates');

  if (container && sommaire) {
    container.innerHTML = '';
    sommaire.innerHTML = '';

    mesActivites.forEach(function (act) {
      const dateParts = act.date.match(/(\d{1,2})\s+(.*?)(\d{4})/i);
      const day = dateParts ? dateParts[1] : '';
      const month = dateParts ? dateParts[2].trim() : '';

      sommaire.innerHTML +=
        '<li>' +
        '<strong>' + day + '</strong>' +
        '<span>' + month + '</span>' +
        '<small>' + act.titre + '</small>' +
        '</li>';

      const pourcentage = Math.min((act.inscrits / act.quota) * 100, 100);
      let couleurJauge = '#22c55e';

      if (pourcentage > 70) couleurJauge = '#f59e0b';
      if (pourcentage >= 100) couleurJauge = '#ef4444';

      const badge = act.inscrits >= act.quota ? '<div class="badge-complet">Complet</div>' : '';

      const eventCard = document.createElement('article');
      eventCard.className = 'event-card';

      eventCard.innerHTML =
        badge +
        '<div class="event-poster" aria-hidden="true">' +
        '<div>' +
        '<p class="poster-title">' + act.titre + '</p>' +
        '<p class="poster-date">' + act.date + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="card-content">' +
        '<div class="progress-bg"><div class="progress-bar" style="width:' + pourcentage + '%; background:' + couleurJauge + ';"></div></div>' +
        '<div class="card-meta"><span>Places</span><strong>' + act.inscrits + ' / ' + act.quota + '</strong></div>' +
        '</div>';

      const poster = eventCard.querySelector('.event-poster');
      if (act.image) {
        poster.style.backgroundImage = 'url("' + act.image + '")';
      } else {
        poster.style.background = act.color;
      }

      container.appendChild(eventCard);
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
});
