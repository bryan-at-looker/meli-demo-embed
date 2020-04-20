export const TREND_SPACE = '10'

export const LOGIN_USER = [
  {
    id: 'Nike',
    logo: 'https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png',
    introduction: 'Welcome Nike',
    welcome_text: 'Enhance your advertising and retargeting with MercadoLibre analytics'
  }
]

export const BLAST_ITEMS = [
  {
    qid: '9gWbJb60kVvMmcqIOLJ3Jy',
    heading:'Recent Purchases',
    text:'Customers who have purchased any item in the last 7 days',
    toggle: 'dat,vis'
  },
  {
    qid:'9gWbJb60kVvMmcqIOLJ3Jy',
    heading:'Abandoned Carts',
    text: "Users who added one of your items into a cart in the last 7 days, but haven't purchased and have been inactive for a day",
  },
  {
    qid:'JAxLbDmdSTkxFsF5TBUjYg',
    heading:'Search Views',
    text: "Search for these product views",
    input: {field: 'product_viewed.item_name', value: '', placeholder: 'Product Search'},
    toggle: 'dat,vis'
  },
  {
    qid:'9gWbJb60kVvMmcqIOLJ3Jy',
    heading:'Abandoned Carts',
    text: "Users who added our item into a cart in the last 7 days, but haven't purchased and have been inactive for a day",
  },
  {
    qid:'9gWbJb60kVvMmcqIOLJ3Jy',
    heading:'MercadoPago Customers',
    text: "Active Customers who used MercadoPago to pay for at least one of their orders in the last 30 days",
  },
  {
    qid:'9gWbJb60kVvMmcqIOLJ3Jy',
    heading:'Users who clicked this campaigns ad',
    text: "All the users who clicked on this campaign, but didn't buy within 30 days",
    input: {field: 'product_viewed.item_name', value: 'cool', placeholder: 'Campaign Name'},
  }
]

export const USER_ATTRIBUTE = 'user_login'
export const IMAGE_URL = 'https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png'
export const EVENT_TAB_FIELD = 'events.event_type'
export const EVENT_TAB_PIVOT = 'events.previous_period'
export const EVENT_TAB_FILTER = 'events.previous_period_filter'
export const QUERY_FIELD = 'events.event_type'
export const QUERY_DATE_FILTER = 'events.previous_period_filter'
export const DATE_FIELD = 'events.event_date'
export const FILTERS = {[DATE_FIELD]: '28 days ago for 28 days'}

export const EXTRA_TABS = [
  {
    [QUERY_FIELD]: 'PABS Insights',
    type: -1
  },
  {
    [QUERY_FIELD]: 'Web Analytics',
    type: 1
  },
  {
    [QUERY_FIELD]: 'User Retention',
    type: 1
  }
]

export const EVENT_TYPE_QUERY = {
  model: "thelook-snowflake",
  view: "events",
  fields: [
    "events.previous_period",
    "events.event_type",
    "events.count"
  ],
  pivots: ["events.previous_period"],
  "sorts": [
    "events.event_type",
    "events.previous_period"
  ],
  filters: {'events.event_date': '7 days ago for 7 days'}
}

export const QUERY = {
  model: 'thelook-snowflake',
  view: 'events',
  fields: ['events.event_date', 'events.count'],
  sorts: ['events.event_type asc']
}

export const VIS_CONFIG = {
  type: 'looker_column',
  show_value_labels: true,
  show_x_axis_label: false,
  y_axis_gridlines: false,
}

export const COLORS = ['#FFBA00', '#F56F02', '#CB1F47', '#645DAC', '#0088D2', '#00B345']

export const TIMEFRAMES = [
  { value: '7 days ago for 7 days', label: '7 days' },
  { value: '14 days ago for 14 days', label: '14 days' },
  { value: '28 days ago for 28 days', label: '28 days' },
  { value: '90 days ago for 90 days', label: '90 days' },
]

export const MEASURE_TYPES = [
  { value: 'events.count', label: 'Events' },
  { value: 'events.sessions_count', label: 'Sessions' },
  { value: 'users.count', label: 'Users' },
]