// ============================================
// FAQ ACCORDION COMPONENT
// Interactive FAQ section
// ============================================

class FAQAccordion {
    constructor() {
        this.init();
    }

    init() {
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }
}

// Initialize FAQ on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.faq__item')) {
        new FAQAccordion();
    }
});
