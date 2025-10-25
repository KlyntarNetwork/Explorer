export enum LOCATION {
  HEADER = 'header',
  MOBILE_MENU = 'mobile_menu',
  HOME_PAGE = 'home_page',
  FOOTER = 'footer',
}

export enum USER_ACTIONS {
  SWITCH_NETWORK = 'switch_network', // location, value(network)
  SEARCH_VIA_MAIN_BAR = 'search_via_main_bar', // value(search_option)
  VISIT_PAGE = 'visit_page', // url, location
  VISIT_DOCUMENTATION = 'visit_docs',
  VISIT_SITE = 'visit_site',
  RETRY_ON_ERROR = 'retry_on_error',
  GO_BACK_FROM_COMING_SOON_PAGE = 'go_back_from_coming_soon_page',
  JOIN = 'join', // location

  VISIT_SOCIAL_MEDIA = 'go_to_social_media', // provider, location

  VISIT_EXPLORER = 'visit_explorer', // location
  VISIT_THIRD_PARTY_SOURCE = 'visit_third_party_source', // url, location

  OPEN_CONNECT_NETWORK_MODAL = 'open_connect_network_modal', // location
  CONNECT_NETWORK = 'connect_network', // provider

  LOGIN_VIA_TELEGRAM = 'login_via_telegram',
  LOGOUT = 'logout',

  CONNECT_WALLET = 'connect_wallet', // provider

  SIGN_MESSAGE_ON_CONTRACTS = 'sign_message_on_contracts',
  SUBMIT_TO_CONTRACTS = 'submit_to_contracts',

  DEPOSIT_TO_MULTISTAKING = 'deposit_to_multistaking',
  UNSTAKE_FROM_MULTISTAKING = 'unstake_from_multistaking',
  WITHDRAW_FROM_MULTISTAKING = 'withdraw_from_multistaking',

  DEPOSIT_TO_STAKING = 'deposit_to_staking',
  UNSTAKE_FROM_STAKING = 'unstake_from_staking',

  TRY_TESTNET_FAUCET = 'try_testnet_faucet'
}
