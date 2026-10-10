import { OPEN_WEEKDAYS, OPENING_TIME, CLOSING_TIME } from '../config/businessHours'

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const openDayNames = OPEN_WEEKDAYS.map((d) => dayNames[d])

export default function Seo({
  title = 'Drika Santana — Studio de Embelezamento em Itaquera',
  description = 'Studio de Embelezamento em Itaquera, São Paulo. Especialista em visagismo, corte a seco para cacheados e crespos (Dry Cut), chanel de bico, barbearia e colorimetria avançada.',
  canonicalUrl = 'https://drikasantana.vercel.app',
}) {
  const fullTitle = title.includes('Drika Santana')
    ? title
    : `${title} | Drika Santana Studio`

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Drika Santana — Studio de Embelezamento',
    image: 'https://drikasantana.vercel.app/logo.png',
    '@id': 'https://drikasantana.vercel.app',
    url: 'https://drikasantana.vercel.app',
    telephone: '+5511978466027',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Parada XV de Novembro',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '08247-040',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.5414,
      longitude: -46.4447,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: openDayNames,
        opens: OPENING_TIME,
        closes: CLOSING_TIME,
      },
    ],
    sameAs: [
      'https://www.instagram.com/drika_hair_santana/',
      'https://maps.app.goo.gl/WebmxAJGxbsLZ4FQ7',
    ],
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://drikasantana.vercel.app/logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  )
}
