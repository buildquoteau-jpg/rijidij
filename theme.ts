// 🔧 CHANGE PER CUSTOMER — update colours and fonts below
// Ask the customer for colours from their surroundings (sky, soil, foliage, bark, stone)
// Ask the customer for fonts — browse fonts.google.com → Handwriting / Serif categories

const theme = {
  // 🔧 Colours
  primary:   '#2D5A27',  // main brand colour — nav, headings, buttons
  secondary: '#8B6914',  // accent colour — highlights, borders, labels
  accent:    '#C4472A',  // pop colour — icons, hover states, alerts

  // 📋 TEMPLATE — these stay the same for every customer
  light:     '#F9F6F0',  // warm off-white — page backgrounds
  dark:      '#1C1C1A',  // near black — body text

  // 🔧 Fonts — use exact Google Fonts names
  headingFont:  'Playfair Display',  // property name — banner + nav
  taglineFont:  'Pinyon Script',     // tagline — banner
  locationFont: 'Josefin Sans',      // coordinates bar

  // 🔧 Google Fonts import URL — update when changing fonts
  // Build URL at: https://fonts.google.com
  fontImportUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Pinyon+Script&family=Josefin+Sans:wght@300&display=swap',
}

export default theme
