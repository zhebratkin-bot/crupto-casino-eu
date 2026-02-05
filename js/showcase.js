// ============================================
// MAIN CASINO SHOWCASE COMPONENT
// Dynamically renders casino cards from data
// ============================================

class CasinoShowcase {
    constructor(containerId, casinoIds) {
        this.container = document.getElementById(containerId);
        this.containerId = containerId;
        this.casinoIds = casinoIds;
        this.init();
    }

    init() {
        if (!this.container) {
            console.error(`Showcase container #${this.containerId} not found`);
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

    createCasinoCard(casino) {
                // Normalize logo path: allow absolute/http paths, root-relative, or remove leading ../ if present
                let logoSrc = casino.logo || '';
                if (!logoSrc.startsWith('http') && !logoSrc.startsWith('/')) {
                        // remove any leading ../ segments that were included in data
                        logoSrc = logoSrc.replace(/^(?:\.\.|\/)*/g, '');
                        // assume paths without leading slash are relative to the site root from index.html
                        logoSrc = logoSrc;
                }

                return `
            <div class="casino-card">
                <img src="${logoSrc}" alt="${casino.name} Logo" class="casino-card__logo" loading="lazy">
                <a href="${casino.reviewUrl}" class="casino-card__name">${casino.name}</a>
                <div class="casino-card__rating">
                    <div class="rating-stars">${this.createStars(casino.rating)}</div>
                    <span>${casino.rating}/5</span>
                </div>
                <div class="casino-card__bonus">
                    <strong>Best Bonus:</strong><br>
                    ${casino.bonus}
                </div>
                <div class="casino-card__actions">
                    <a href="${casino.reviewUrl}" class="btn btn-secondary btn-sm">Review</a>
                    <a href="${casino.playUrl}" class="btn btn-primary btn-sm" target="_blank" rel="nofollow noopener">Play Now</a>
                </div>
            </div>
        `;
    }

    render() {
        const cardsHTML = this.casinoIds
            .map(id => {
                const casino = casinosData[id];
                if (!casino) {
                    console.warn(`Casino data not found for ID: ${id}`);
                    return '';
                }
                return this.createCasinoCard(casino);
            })
            .join('');

        this.container.innerHTML = cardsHTML;
    }
}

// Auto-initialize showcases on page load
document.addEventListener('DOMContentLoaded', () => {
    // Find all showcase containers
    const showcaseElements = document.querySelectorAll('[data-showcase]');

    showcaseElements.forEach(element => {
        const casinoIds = element.getAttribute('data-casinos');
        if (casinoIds) {
            const ids = casinoIds.split(',').map(id => id.trim());
            new CasinoShowcase(element.id, ids);
        }
    });
});
