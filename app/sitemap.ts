import type { MetadataRoute } from 'next';

const BASE = 'https://calcnest.vercel.app';

const SLUGS = [
  'loan-calculator',
  'savings-calculator',
  'compound-calculator',
  'salary-calculator',
  'bmi-calculator',
  'bmr-calculator',
  'dday-calculator',
  'age-calculator',
  'date-diff-calculator',
  'area-converter',
  'data-converter',
  'vat-calculator',
  'percentage-calculator',
  'severance-calculator',
  'temperature-converter',
  'privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = SLUGS.map(slug => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...pages,
  ];
}
