// ============================================
// COMPACT CASINO SHOWCASE COMPONENT
// Smaller version for content sections
// ============================================

class CasinoShowcaseCompact {
    constructor(containerId, casinoIds, title = '') {
        this.container = document.getElementById(containerId);
        this.casinoIds = casinoIds;
        this.title = title;
        this.init();
    }

    init() {
        if (!this.container) {
            console.error(`Compact showcase container not found`);
            return;
        }
        this.render();
    }

    createStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHTML += '<span class="rating-stars__star">★</span>';
            } else if (i === fullStars && hasHalfStar) {
                starsHTML += '<span class="rating-stars__star">★</span>';
            } else {
                starsHTML += '<span class="rating-stars__star empty">★</span>';
            }
        }

        return starsHTML;
    }

    createCompactCard(casino) {
        return `
      <div class="casino-card-compact">
        <img src="${casino.logo}" alt="${casino.name} Logo" class="casino-card-compact__logo" loading="lazy">
        <div class="casino-card-compact__info">
          <a href="${casino.reviewUrl}" class="casino-card-compact__name">${casino.name}</a>
          <div class="casino-card-compact__rating">
            <div class="rating-stars">${this.createStars(casino.rating)}</div>
            ${casino.rating}/5
          </div>
        </div>
        <div class="casino-card-compact__action">
          <a href="${casino.playUrl}" class="btn btn-success btn-sm" target="_blank" rel="nofollow noopener">Play</a>
        </div>
      </div>
    `;
    }

    render() {
        const titleHTML = this.title ? `<h3 class="showcase-compact__title">${this.title}</h3>` : '';

        const cardsHTML = this.casinoIds
            .map(id => {
                const casino = casinosData[id];
                if (!casino) {
                    console.warn(`Casino data not found for ID: ${id}`);
                    return '';
                }
                return this.createCompactCard(casino);
            })
            .join('');

        this.container.innerHTML = `
      ${titleHTML}
      <div class="showcase-compact__grid">
        ${cardsHTML}
      </div>
    `;
    }
}

// Auto-initialize compact showcases on page load
document.addEventListener('DOMContentLoaded', () => {
    const compactElements = document.querySelectorAll('[data-showcase-compact]');

    compactElements.forEach(element => {
        const casinoIds = element.getAttribute('data-casinos');
        const title = element.getAttribute('data-title') || '';

        if (casinoIds) {
            const ids = casinoIds.split(',').map(id => id.trim());
            new CasinoShowcaseCompact(element.id, ids, title);
        }
    });
});
