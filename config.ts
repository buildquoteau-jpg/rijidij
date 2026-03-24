// 🔧 CHANGE PER CUSTOMER — update all values below for each new property

const config = {
  propertyName: 'Your Property Name',
  tagline: 'Your property tagline goes here',
  ownerEmail: 'owner@email.com',

  // 🔧 Privacy — noIndex blocks Google and all search engines
  noIndex: true,
  sitePrivate: false,

  location: {
    lat: -33.6139,
    lng: 115.3450,
    region: 'Southwest WA',
  },

  pages: {
    gallery:     { enabled: true,  private: false, emoji: '📷', title: 'Gallery',     description: 'Photos of the property, seasons and life on the land.' },
    theLand:     { enabled: true,  private: false, emoji: '🌿', title: 'The Land',    description: 'A record of stewardship — the history of this land and all who have tended it.' },
    ourFamily:   { enabled: true,  private: false, emoji: '📖', title: 'Our Family',  description: 'The people who call this place home.' },
    orchard:     { enabled: true,  private: false, emoji: '🍊', title: 'Orchard',     description: 'What blooms when, seasonal jobs and harvest notes.' },
    water:       { enabled: true,  private: false, emoji: '💧', title: 'Water',       description: 'Bore data, tank levels and rainfall records.' },
    wildlife:    { enabled: true,  private: false, emoji: '🦜', title: 'Wildlife',    description: 'Sightings log, bird list and pest species.' },
    maps:        { enabled: true,  private: true,  emoji: '🗺️', title: 'Maps',        description: 'Irrigation maps, property boundaries and landmarks.' },
    calendar:    { enabled: true,  private: true,  emoji: '📅', title: 'Calendar',    description: 'Visitors, firebreaks, rates and property reminders.' },
    theArea:     { enabled: true,  private: false, emoji: '🌏', title: 'The Area',    description: 'Local knowledge, neighbours, landmarks and things to do.' },
    ownerReadme: { enabled: true,  private: true,  emoji: '🔑', title: 'Owner Notes', description: 'Credentials, account details and handover notes.' },
  },
}

export default config
