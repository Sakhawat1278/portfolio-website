export type ProjectCategory = 'WordPress' | 'Android App' | 'WP Plugin' | 'Web App' | 'Full Stack' | 'Ecommerce' | 'Institutional' | 'Portfolio' | 'Service';

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    description: string;
    image: string;
    tags: string[];
    link: string;
    video?: string;
}

export const projects: Project[] = [
    {
        id: 'master-1',
        title: 'Business Tycoon Pro',
        category: 'Full Stack',
        description: 'All-in-one multi-vendor enterprise system with manager support, delivery logistics, and integrated CRM.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Next.js', 'Prisma', 'Socket.io', 'CRM'],
        link: ''
    },
    {
        id: 'master-2',
        title: 'Universal E-commerce App',
        category: 'Android App',
        description: 'Universal plug-and-play ecommerce app with seamless WordPress website integration.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Flutter', 'WordPress API', 'Cross-platform'],
        link: ''
    },
    {
        id: 'master-3',
        title: 'Liquid Property Platform',
        category: 'Full Stack',
        description: 'Industrial-grade property management dashboard focused on high-speed data rendering and complex orchestration.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Next.js', 'Prisma', 'Lenis', 'Real Estate'],
        link: ''
    },
    {
        id: 'master-4',
        title: 'MediCore CMS',
        category: 'Full Stack',
        description: 'Complete Clinic & Hospital Management System with medical record tracking and administrative control.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Node.js', 'React', 'SQLite', 'Healthcare'],
        link: ''
    },
    {
        id: 'master-5',
        title: 'Universal Booking Hub',
        category: 'Web App',
        description: 'Map-based discovery and booking portal featuring high-end rental architecture and Leaflet integration.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Next.js', 'Leaflet', 'Stripe', 'Booking'],
        link: ''
    },
    {
        id: 'master-6',
        title: 'ModernWallet',
        category: 'Android App',
        description: 'Secure finance hub and encrypted mobile wallet for digital assets.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Android', 'Java', 'Security', 'Finance'],
        link: ''
    },
    {
        id: 'master-7',
        title: 'Live Lodgify Dynamic Sync',
        category: 'WP Plugin',
        description: 'Real-time property data synchronization from Lodgify with live payment processing bridge.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['PHP', 'Lodgify API', 'Automation'],
        link: ''
    },
    {
        id: 'master-8',
        title: 'Dokan-Sticker Bulk Sync',
        category: 'WP Plugin',
        description: 'Integration enabling vendors to bulk-upload sticker products with automated design rules.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Dokan', 'WooCommerce', 'Sticker Builder'],
        link: ''
    },
    {
        id: 'master-9',
        title: 'Cushion Configurator',
        category: 'WP Plugin',
        description: 'Complex dynamic configuration engine for cushion variations, density, and material layering.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['PHP', 'Dynamic Logic', 'Interactive'],
        link: ''
    },
    {
        id: 'master-10',
        title: 'Tiered Subscription Pricing',
        category: 'WP Plugin',
        description: 'Automated "Commitment Discounts" engine calculating savings based on purchase duration.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['WooCommerce', 'Subscription', 'Marketing'],
        link: ''
    },
    {
        id: 'master-11',
        title: 'Woodmart File Uploader',
        category: 'WP Plugin',
        description: 'Specialized file uploading terminal widget engineered specifically for the Woodmart theme.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Woodmart', 'PHP', 'Utility'],
        link: ''
    },
    {
        id: 'master-12',
        title: 'Airbnb Booking Pro',
        category: 'WP Plugin',
        description: 'Professional rental booking engine with Elementor widget support for high-end hosts.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['PHP', 'Elementor', 'Booking Pro'],
        link: ''
    },
    {
        id: 'master-13',
        title: 'Sticker Designer Pro',
        category: 'WP Plugin',
        description: 'Custom interactive canvas tool for automated sticker product design inside WooCommerce.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Canvas API', 'WooCommerce', 'Design'],
        link: ''
    },
    {
        id: 'master-14',
        title: 'Vibe Mobile Hub',
        category: 'Android App',
        description: 'High-performance testing hub for advanced Lottie animations and NativeWind styling.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['React Native', 'Lottie', 'UI Testing'],
        link: ''
    },
    {
        id: '1',
        title: 'BuyMyLand',
        category: 'WordPress',
        description: 'A streamlined real estate platform specialized in fast land acquisitions and fair pricing in Dallas, TX.',
        image: '/projects/optimized/buymyland.webp',
        tags: ['Real Estate', 'Custom Theme', 'SEO'],
        link: 'https://buymyland.com'
    },
    {
        id: '2',
        title: 'Mayberry Media',
        category: 'WordPress',
        description: 'A premium photography portfolio and blog showcasing professional media services with a minimalist aesthetic.',
        image: '/projects/optimized/mayberrymediaphotography.webp',
        tags: ['Photography', 'Portfolio', 'Modern Design'],
        link: 'https://www.mayberrymediaphotography.com'
    },
    {
        id: '3',
        title: 'Equilibria Wellness',
        category: 'WordPress',
        description: 'High-end ecommerce platform for organic cannabis and supplements with personalized support systems.',
        image: '/projects/optimized/shop-myeq.webp',
        tags: ['WooCommerce', 'Women Empowerment', 'Subscription'],
        link: 'https://shop.myeq.com'
    },
    {
        id: '4',
        title: 'Armateurs de France',
        category: 'WordPress',
        description: 'Institutional portal for French maritime transport companies, featuring complex content hierarchy and French localization.',
        image: '/projects/optimized/armateursdefrance-org.webp',
        tags: ['Institutional', 'Enterprise', 'Multi-language'],
        link: 'https://www.armateursdefrance.org'
    },
    {
        id: '5',
        title: 'Pedestal Design',
        category: 'WordPress',
        description: 'Elegant ecommerce store for minimalist designer TV stands and high-end home accessories.',
        image: '/projects/optimized/pedestal.webp',
        tags: ['Ecommerce', 'Minimalist', 'Litespeed'],
        link: 'https://www.pedestal.com'
    },
    {
        id: '6',
        title: 'AXIA Books',
        category: 'WordPress',
        description: 'Comprehensive online bookstore specializing in educational resources and foreign language materials.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['WooCommerce', 'Education', 'Listing'],
        link: 'https://axiabooks.com'
    },
    {
        id: '7',
        title: 'Steffie de Leeuw',
        category: 'WordPress',
        description: 'An artistic portfolio showcasing murals, wallpapers, and fine art with a focus on visual storytelling.',
        image: '/projects/optimized/steffiedeleeuw.webp',
        tags: ['Artist', 'Wall Art', 'Creative'],
        link: 'https://steffiedeleeuw.com'
    },
    {
        id: '8',
        title: 'Blaturia Adventures',
        category: 'WordPress',
        description: 'A travel and tour booking platform for unique Swedish archipelago experiences and museum tours.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Travel', 'Booking System', 'UX/UI'],
        link: 'https://blaturia.com'
    },
    {
        id: '9',
        title: 'Noma Restaurant',
        category: 'WordPress',
        description: 'World-renowned restaurant digital experience featuring season-based booking and pantry product shop.',
        image: '/projects/optimized/noma-dk.webp',
        tags: ['Hospitality', 'Gourmet', 'Branding'],
        link: 'https://noma.dk'
    },
    {
        id: '10',
        title: 'Vapoorz Shop',
        category: 'WordPress',
        description: 'Bespoke vape product ecommerce site featuring age verification and custom product filtering.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Vape', 'WooCommerce', 'Inventory'],
        link: 'https://vapoorz.com'
    },
    {
        id: '11',
        title: 'Touch Free Payments',
        category: 'WordPress',
        description: 'Secure payment processing platform for independent businesses and emerging industries.',
        image: '/projects/optimized/touchfree-us.webp',
        tags: ['Fintech', 'B2B', 'Payment Gateway'],
        link: 'http://touchfree.us'
    },
    {
        id: '12',
        title: 'Rodrigue & Sons',
        category: 'WordPress',
        description: 'A robust business presence site for a specialized family enterprise focused on quality and reliability.',
        image: '/projects/optimized/rodrigue-sons.webp',
        tags: ['Business', 'Family Owned', 'Legacy'],
        link: 'https://rodrigue-sons.com'
    },
    {
        id: '13',
        title: 'Sashco International',
        category: 'WordPress',
        description: 'Engineering-focused site for architectural facade systems and global construction performance standards.',
        image: '/projects/optimized/sashcoint.webp',
        tags: ['Engineering', 'Architecture', 'Global'],
        link: 'https://www.sashcoint.com'
    },
    {
        id: '14',
        title: 'Tsilal Foundation',
        category: 'WordPress',
        description: 'A non-profit community platform focusing on empowerment, language, and cultural integration in the Netherlands.',
        image: '/projects/optimized/tsilal.webp',
        tags: ['Non-Profit', 'Community', 'Integration'],
        link: 'https://tsilal.com'
    },
    {
        id: '15',
        title: 'Ranch Tamri Tours',
        category: 'WordPress',
        description: 'Adventure tourism site offering desert activities like quad biking and camel rides in Agadir.',
        image: '/projects/optimized/ranchtamri.webp',
        tags: ['Tourism', 'Experience', 'Agadir'],
        link: 'https://ranchtamri.com'
    },
    {
        id: '16',
        title: 'Zyrax Labs Peptides',
        category: 'WordPress',
        description: 'Bio-scientific research product shop with high-purity testing and pharmaceutical-grade assurance.',
        image: '/projects/optimized/zyraxlabs.webp',
        tags: ['Scientific', 'WooCommerce', 'Elementor'],
        link: 'https://zyraxlabs.com'
    },
    {
        id: '17',
        title: 'Premiere Dance Academy',
        category: 'WordPress',
        description: 'Education platform for recreational and competitive dance programs with class registration systems.',
        image: '/projects/optimized/pdawp-mrkd-co.webp',
        tags: ['Dance', 'Academy', 'Membership'],
        link: 'https://pdawp.mrkd.co'
    },
    {
        id: '18',
        title: 'Santa Tecla Luxury',
        category: 'WordPress',
        description: 'Exclusive real estate agency site specializing in prestigious and luxury properties in Italy.',
        image: '/projects/optimized/santateclaimmobiliare.webp',
        tags: ['Luxury Real Estate', 'Italy', 'Property Listing'],
        link: 'https://www.santateclaimmobiliare.com'
    },
    {
        id: '19',
        title: 'Amish Made Custom',
        category: 'WordPress',
        description: 'Ecommerce for handmade custom furniture and products showcasing quality Amish craftsmanship.',
        image: '/projects/optimized/amishmadecustomproducts.webp',
        tags: ['Custom Furniture', 'Handmade', 'WooCommerce'],
        link: 'https://amishmadecustomproducts.com'
    },
    {
        id: '20',
        title: 'Pillar Engineering',
        category: 'WordPress',
        description: 'Reliable engineering firm portal highlighting world-class results and target-oriented solutions.',
        image: '/projects/optimized/pillarengineerings.webp',
        tags: ['Engineering', 'B2B', 'Innovation'],
        link: 'https://pillarengineerings.com'
    },
    {
        id: '21',
        title: 'Watercolor Designs',
        category: 'WordPress',
        description: 'A digital marketplace for high-quality watercolor clipart and design elements for creatives.',
        image: '/projects/optimized/watercolordesign.webp',
        tags: ['Creative', 'Digital Shop', 'Resources'],
        link: 'https://watercolordesign.com'
    },
    {
        id: '22',
        title: 'Infinity Garage Repair',
        category: 'WordPress',
        description: "Service-based site for Seattle's leading garage door repair and installation company.",
        image: '/projects/optimized/infinitygaragedoorsrepairs.webp',
        tags: ['Service', 'Seattle', 'Local Business'],
        link: 'https://infinitygaragedoorsrepairs.com'
    },
    {
        id: '23',
        title: 'Auto Trader Africa',
        category: 'WordPress',
        description: 'Dynamic marketplace for vehicle sales and construction equipment rentals in Nigeria.',
        image: '/projects/optimized/autotraderafrica.webp',
        tags: ['Automotive', 'Listing', 'Marketplace'],
        link: 'https://autotraderafrica.com'
    },
    {
        id: '24',
        title: 'JLN Solar Energy',
        category: 'WordPress',
        description: 'Alternative energy solutions platform focused on powering communities with solar technology.',
        image: '/projects/optimized/jlnsolars.webp',
        tags: ['Energy', 'Solar', 'Sustainability'],
        link: 'https://jlnsolars.com'
    },
    {
        id: '25',
        title: 'Pooch Emporium',
        category: 'WordPress',
        description: 'Premium dog fashion ecommerce store featuring "Haute Couture for Canines" with high-end apparel.',
        image: '/projects/optimized/poochemporium-co-uk.webp',
        tags: ['Pet Fashion', 'Ecommerce', 'Premium'],
        link: 'https://poochemporium.co.uk'
    },
    {
        id: '26',
        title: 'Thought Club Education',
        category: 'WordPress',
        description: 'A structured educational environment reimagining learning through personalized tutoring and conversation.',
        image: '/projects/optimized/thoughtclub.webp',
        tags: ['Education', 'Tutoring', 'Methodology'],
        link: 'https://thoughtclub.com'
    },
    {
        id: '27',
        title: 'Gordon Builders Inc',
        category: 'WordPress',
        description: 'Premier general contractor site in Omaha, specializing in remodeling and insurance claims.',
        image: '/projects/optimized/gordonbuildersinc.webp',
        tags: ['Construction', 'Contractor', 'Omaha'],
        link: 'https://gordonbuildersinc.com'
    },
    {
        id: '28',
        title: 'Leads Recovery Center',
        category: 'WordPress',
        description: 'Healthcare platform dedicated to addiction recovery with structured independence support systems.',
        image: '/projects/optimized/leadsrecovery.webp',
        tags: ['Healthcare', 'Recovery', 'Support'],
        link: 'https://leadsrecovery.com'
    },
    {
        id: '29',
        title: 'BHV.care LMS',
        category: 'WordPress',
        description: 'Sophisticated Learning Management System for online emergency response (BHV) certifications.',
        image: '/projects/optimized/bhv-care.webp',
        tags: ['LMS', 'Healthcare', 'Certification'],
        link: 'https://bhv.care'
    },
    {
        id: '30',
        title: 'Anlara Wellness',
        category: 'WordPress',
        description: 'Soothing digital presence for a premium wellness and spa retreat focused on balanced health.',
        image: '/projects/optimized/placeholder.webp',
        tags: ['Wellness', 'Spa', 'Aesthetic'],
        link: 'https://anlarawellness.com'
    },
    {
        id: '31',
        title: 'Uniekgrace Artist',
        category: 'WordPress',
        description: 'Music artist portfolio featuring afro-gospel music, videos, and hearts-to-yours melodies.',
        image: '/projects/optimized/uniekgracemusic.webp',
        tags: ['Artist', 'Music', 'Portfolio'],
        link: 'https://www.uniekgracemusic.com'
    },
    {
        id: '32',
        title: 'Cloud9 FreedomTV',
        category: 'WordPress',
        description: 'Streaming service platform for live TV and on-the-go entertainment subscription management.',
        image: '/projects/optimized/cloud9freedomtv.webp',
        tags: ['Streaming', 'IPTV', 'Subscription'],
        link: 'https://cloud9freedomtv.com'
    },
    {
        id: '33',
        title: 'Geoff Nelder Author',
        category: 'WordPress',
        description: 'Professional author portfolio showcasing the Aria Trilogy and award-winning science fiction thrillers.',
        image: '/projects/optimized/geoffnelder.webp',
        tags: ['Author', 'Books', 'Portfolio'],
        link: 'https://geoffnelder.com'
    },
];
