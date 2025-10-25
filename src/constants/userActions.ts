export enum LOCATION {
  HEADER = 'header',
  MOBILE_MENU = 'mobile_menu',
  HOME_PAGE = 'home_page'
}

export enum USER_ACTIONS {
  SWITCH_NETWORK = 'switch_network', // location, value(network)
  SEARCH_VIA_MAIN_BAR = 'search_via_main_bar', // value(search_option)
  VISIT_PAGE = 'visit_page', // url, location
  RETRY_ON_ERROR = 'retry_on_error',
  GO_BACK_FROM_COMING_SOON_PAGE = 'go_back_from_coming_soon_page',
}
