export const roastLevels = [
  "Light",
  "Medium Light",
  "Medium",
  "Medium Dark",
  "Dark",
] as const;

export const productionAreas = {
  'Latin America': [
    'Brazil',
    'Colombia',
    'Guatemala', 
    'Costa Rica',
    'Panama',
    'El Salvador',
    'Honduras',
    'Nicaragua',
    'Mexico',
    'Peru',
    'Dominican Republic',
    'Jamaica'
  ],
  'Africa': [
    'Ethiopia',
    'Kenya',
    'Rwanda',
    'Burundi', 
    'Tanzania',
    'Uganda'
  ],
  'Asia & Oceania': [
    'Indonesia',
    'Vietnam',
    'India',
    'Thailand',
    'China',
    'Philippines',
    'Taiwan',
    'Papua New Guinea'
  ],
  'Other': [
    'Other'
  ]
} as const;

export const processingMethods = [
  'Washed',
  'Natural',
  'White Honey',
  'Yellow Honey', 
  'Red Honey',
  'Black Honey',
  'Anaerobic Fermentation',
  'Carbonic Maceration',
  'Wet-Hulled',
  'Barrel Aged',
  'Inoculated Yeast',
  'Cold Fermentation',
  'Cold Smoked',
  'Other'
] as const;

export const getAllAreas = Object.entries(productionAreas).reduce((acc, [region, countries]) => {
  return [...acc, ...countries.map(country => ({ region, country }))]
}, [] as Array<{ region: string, country: string }>);