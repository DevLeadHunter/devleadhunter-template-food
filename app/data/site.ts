/** Static content mirrored from the Pencil Food trucks landingpage. */

export const site = {
  name: 'food trucks',
  phoneDisplay: '(123) 495–34–54',
  phoneRaw: '1234953454',
  reservationPhone: '62 123 456789',
  email: 'mail@example.com',
  address: 'Riverside 25, San Diego, California',
  hours: 'Mon To Fri 9:00 AM - 9:00 PM',
  copyright: '© Copyright 2023 food trucks - All right reserved',
}

export const hero = {
  label: 'food truck',
  title: 'The best meal on wheels in town',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames. Sed a molestie enim ac sed.',
  cta: 'View Menu',
  image: '/images/image-import-2.jpg',
}

export const aboutInfo = [
  {
    title: 'Locate Us',
    text: 'Riverside 25, San Diego, California',
    icon: '/images/about-icon-0.svg',
  },
  {
    title: 'Open Hours',
    text: 'Mon To Fri 9:00 AM - 9:00 PM',
    icon: '/images/about-icon-1.svg',
  },
  {
    title: 'Reservation',
    text: '62 123 456789 - mail@example.com',
    icon: '/images/about-icon-2.svg',
  },
]

export const about = {
  label: 'about us',
  title: 'The Delicious Story',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames. Sed a molestie enim ac sed. Aliquam sit amet mauris sit amet nisi sodales aliquam eu vel dolor. Nullam et erat nec magna interdum rutrum sed at nisl. Vestibulum sit amet eros in nunc varius mollis ',
  collage: {
    left: '/images/image-import-4.jpg',
    right: '/images/image-import-7.jpg',
    center: '/images/image-import-8.jpg',
  },
  stats: [
    {
      value: '14K+',
      title: 'follow us',
      subtitle: 'Followers on instagram',
      position: 'top-right' as const,
    },
    {
      value: '14K+',
      title: 'subscribe',
      subtitle: 'subscribers on youtube',
      position: 'bottom-left' as const,
    },
  ],
}

export const menu = {
  label: 'our menu',
  title: 'Try Our Special Dishes',
  items: [
    {
      title: 'Turkey, egg and cheese',
      description: 'Nullam at nibh id lacus condimentum ultrices et a massa',
      price: '$15',
      image: '/images/image-import.png',
    },
    {
      title: 'Hot Wings and Fries',
      description: 'Nullam at nibh id lacus condimentum ultrices et a massa',
      price: '$15',
      image: '/images/image-import-2.png',
    },
    {
      title: '2 Hot Dog with Fries & Soda',
      description: 'Nullam at nibh id lacus condimentum ultrices et a massa',
      price: '$15',
      image: '/images/image-import-1.png',
    },
    {
      title: 'Soda float ice cream',
      description: 'Nullam at nibh id lacus condimentum ultrices et a massa',
      price: '$15',
      image: '/images/image-import-3.png',
    },
  ],
}

export const testimonial = {
  label: 'testimonials',
  title: 'What other are saying',
  quote:
    'They known for its fabulous taste and food anywhere you go your hunger is satisfied the best chicken & burgers those are yummy.',
  author: 'Natasha D',
  city: 'Salt Lake City',
  image: '/images/image-import-1.jpg',
  features: [
    { title: 'High Quality Products', icon: '/images/feature-icon-0.svg' },
    { title: 'Cozy Atmosphere', icon: '/images/feature-icon-1.svg' },
    { title: 'Reasonable Prices', icon: '/images/feature-icon-2.svg' },
  ],
}

export const contact = {
  label: 'book your table',
  title: 'Make a Reservation',
  description:
    'Call (123) 495–34–54 from 5a – 11p daily, or book online Reservations required for parties of 4 or more.',
  cta: 'Book a Table',
  socials: [
    { name: 'facebook', icon: '/images/social-0.svg', href: '#' },
    { name: 'twitter', icon: '/images/social-1.svg', href: '#' },
    { name: 'instagram', icon: '/images/social-2.svg', href: '#' },
    { name: 'pinterest', icon: '/images/social-3.svg', href: '#' },
  ],
}
