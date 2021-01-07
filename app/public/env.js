
(function (window) {
    window.__env = window.__env || {};
    window.__env.BASE_DECK_URL = "" ? "" : "https://spinnaker.example.com" ;
    window.__env.BASE_GATE_URL = "" ? "" : "https://spinnaker.example.com/api/v1" ;
    window.__env.VERSION = "" ? "" : "local" ;
    window.__env.AUTHENTICATION_ENABLED = true ;
    window.__env.RBAC_ROLE_ADMIN_VIEW = "" ? "" : false;
    window.__env.DEBUG_MODE = "" === 'true';
}(this));