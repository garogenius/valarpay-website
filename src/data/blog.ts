export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'valarpay-reaches-1-million-active-users',
    title: 'ValarPay Reaches 1 Million Active Users Globally',
    excerpt: 'A massive milestone for our platform as we continue to democratize financial access across borders.',
    content: `
      <h2>A Milestone to Remember</h2>
      <p>Today marks a historic moment for ValarPay. We are incredibly proud to announce that we have officially crossed the 1 million active user mark globally. This achievement is a testament to the trust our community has placed in us to handle their daily financial needs securely and efficiently.</p>
      
      <h2>The Journey Here</h2>
      <p>When we launched ValarPay, our mission was simple: make money movement seamless, irrespective of borders. By focusing relentlessly on user experience, robust security, and forming the right banking partnerships, we have been able to scale our operations faster than we ever imagined.</p>
      
      <h3>What's Next?</h3>
      <p>Reaching 1 million users is not the finish line; it is just the beginning. We are already rolling out significant infrastructure upgrades to ensure that as our user base grows to 5 million and beyond, our platform remains as fast and reliable as day one. Thank you for being a part of the ValarPay journey.</p>
    `,
    category: 'Company News',
    author: 'Management Team',
    date: 'August 06, 2026',
    readTime: '3 min read',
    image: '/images/blog/growth.png',
  },
  {
    id: '2',
    slug: 'introducing-global-multicurrency-wallets',
    title: 'Introducing Our New Global Multi-Currency Wallets',
    excerpt: 'Hold, convert, and spend in USD, EUR, GBP, and NGN all from a single unified interface.',
    content: `
      <h2>True Financial Borderlessness</h2>
      <p>We are thrilled to unveil the most requested feature in ValarPay history: the Global Multi-Currency Wallet. Starting today, all verified users can instantly open virtual accounts in USD, EUR, and GBP directly alongside their local NGN wallets.</p>
      
      <h2>How It Works</h2>
      <p>The multi-currency wallet allows you to receive payments from international clients, hold funds in stable currencies to hedge against inflation, and convert between balances instantly at highly competitive market rates.</p>
      <ul>
        <li><strong>USD:</strong> Routing number and account number provided by our US banking partners.</li>
        <li><strong>EUR:</strong> Personal IBAN for SEPA transfers.</li>
        <li><strong>GBP:</strong> UK Sort Code and Account Number.</li>
      </ul>
      
      <h2>Security First</h2>
      <p>As always, security remains our top priority. All multi-currency wallets are safeguarded by our enhanced encryption protocols and are fully compliant with international anti-money laundering (AML) regulations.</p>
    `,
    category: 'Product Update',
    author: 'Product Team',
    date: 'July 22, 2026',
    readTime: '4 min read',
    image: '/images/blog/wallet.png',
  },
  {
    id: '3',
    slug: 'valarpay-partners-top-european-banks',
    title: 'ValarPay Partners with Top European Banks',
    excerpt: 'Strategic alliances formed to guarantee lightning-fast SEPA settlements for our users.',
    content: `
      <h2>Strengthening Our European Presence</h2>
      <p>In our continuous effort to provide the fastest cross-border payment experience, ValarPay has officially partnered with a consortium of top-tier European banks. This strategic alliance allows us to plug directly into the SEPA (Single Euro Payments Area) network.</p>
      
      <h2>What This Means for You</h2>
      <p>Previously, cross-border settlements could take up to 48 hours depending on intermediary banks. With our new direct banking partnerships, EUR transfers initiated from your ValarPay wallet will now settle in mere seconds.</p>
      
      <h3>Corporate Banking Excellence</h3>
      <p>This partnership is also a massive win for our ValarPay Business customers who rely on fast liquidity to manage their European suppliers and remote workforce. We are committed to building the financial infrastructure of tomorrow, today.</p>
    `,
    category: 'Partnerships',
    author: 'Partnerships Division',
    date: 'June 15, 2026',
    readTime: '2 min read',
    image: '/images/blog/partnership.png',
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};
