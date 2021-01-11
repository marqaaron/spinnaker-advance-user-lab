export const appConfig = {
    BASE_DECK_URL: typeof process.env.BASE_DECK_URL !== 'undefined' ? process.env.BASE_DECK_URL : "https://spinnaker.example.com",
    BASE_GATE_URL: typeof process.env.BASE_GATE_URL !== 'undefined' ? process.env.BASE_GATE_URL : "https://spinnaker.example.com/api/v1",
    VERSION: typeof process.env.VERSION !== 'undefined' ? process.env.VERSION : "local-vuecli-mockdata",
    AUTHENTICATION_ENABLED: typeof process.env.AUTHENTICATION_ENABLED !== 'undefined' ? process.env.AUTHENTICATION_ENABLED === 'true' : true,
    RBAC_ROLE_ADMIN_VIEW: typeof process.env.RBAC_ROLE_ADMIN_VIEW !== 'undefined' ? process.env.RBAC_ROLE_ADMIN_VIEW : false,
    DEBUG_MODE: typeof process.env.DEBUG_MODE !== 'undefined' ? process.env.DEBUG_MODE === 'true' : true,
}