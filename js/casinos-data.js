// ============================================
// CASINO DATA REGISTRY
// Central data source for all casinos
// ============================================

const casinosData = {
  'sportaza': {
    name: 'Sportaza Casino',
    logo: 'images/logos/sportaza.png',
    rating: 4.8,
    bonus: '100% up to €500 + 200 Free Spins',
    reviewUrl: 'reviews/sportaza/index.html',
    playUrl: 'https://sportaza.com',
    // Review page specific data
    license: 'Curacao eGaming',
    games: '3000+ Games',
    paymentMethods: 'Bitcoin, USDT, Ethereum, Litecoin',
    minDeposit: '€10',
    withdrawalTime: '24-48 hours',
    established: '2020'
  },
  '22bet': {
    name: '22bet Casino',
    logo: 'images/logos/22bet.png',
    rating: 4.7,
    bonus: '100% up to €300 Welcome Bonus',
    reviewUrl: 'reviews/22bet/index.html',
    playUrl: 'https://22bet.com',
    license: 'Curacao eGaming',
    games: '5000+ Games',
    paymentMethods: 'Bitcoin, USDT, Tether, Dogecoin',
    minDeposit: '€1',
    withdrawalTime: '1-2 hours',
    established: '2018'
  },
  'national-casino': {
    name: 'National Casino',
    logo: 'images/logos/national-casino.png',
    rating: 4.9,
    bonus: '100% up to €100 + 100 Free Spins',
    reviewUrl: 'reviews/national-casino/index.html',
    playUrl: 'https://nationalcasino.com',
    license: 'Curacao eGaming',
    games: '2500+ Games',
    paymentMethods: 'Bitcoin, USDT, Ethereum, Bank Transfer',
    minDeposit: '€20',
    withdrawalTime: '24 hours',
    established: '2021'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = casinosData;
}
