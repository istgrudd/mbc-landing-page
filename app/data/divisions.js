// The five MBC Lab divisions. `color` drives the spectrum signal system used
// across the whole site; `members` is the live roster count. Project and
// research counts are NOT stored here — they're derived at runtime from the
// markdown frontmatter via `getDivisionCounts()` in lib/content.js.
export const divisions = [
  {
    id: 'cybersec',
    name: 'Cyber Security',
    short: 'SEC',
    icon: 'Shield',
    color: '#E5484D',
    tagline: 'Offensive and defensive security.',
    description:
      'Exploring offensive and defensive security, CTF competitions, and vulnerability research — from red-team tradecraft to blue-team monitoring.',
    members: 9,
  },
  {
    id: 'bigdata',
    name: 'Big Data',
    short: 'DATA',
    icon: 'Database',
    color: '#2D5BFF',
    tagline: 'Analytics pipelines and applied ML.',
    description:
      'Processing large-scale datasets with modern analytics pipelines and machine learning, turning raw signals into models that hold up in production.',
    members: 12,
  },
  {
    id: 'gis',
    name: 'Geographic Information System',
    short: 'GIS',
    icon: 'Map',
    color: '#13A36B',
    tagline: 'Spatial analysis and geovisualisation.',
    description:
      'Mapping, spatial analysis, and geospatial data visualisation for real-world problems — from tourism platforms to smart-city infrastructure.',
    members: 9,
  },
  {
    id: 'gametech',
    name: 'Game Tech',
    short: 'GAME',
    icon: 'Gamepad2',
    color: '#8B5CF6',
    tagline: 'Interactive games and immersive media.',
    description:
      'Designing and developing interactive games and immersive digital experiences, with several titles registered under intellectual property rights.',
    members: 9,
  },
  {
    id: 'practicum',
    name: 'Practicum',
    short: 'LAB',
    icon: 'GraduationCap',
    color: '#F5A524',
    tagline: 'Hands-on engineering practice.',
    description:
      'Hands-on laboratory sessions bridging theory and practical software engineering skills for Faculty of Electrical Engineering students.',
    members: 14,
  },
]
