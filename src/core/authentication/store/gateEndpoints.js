export default {
    loginRedirectUrl(_config){
        let baseGateUrl = _config.VUE_APP_BASE_GATE_URL;
        let trailingSlashPresentGate = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresentGate){
            baseGateUrl = baseGateUrl + '/';
        }
        let baseDeckUrl = _config.VUE_APP_BASE_DECK_URL;
        let trailingSlashPresentDeck = baseDeckUrl.match(/^.*\/$/);
        if(!trailingSlashPresentDeck){
            baseDeckUrl = baseDeckUrl + '/';
        }
        let appPath = (typeof _config.VUE_APP_APP_PATH !== 'undefined' ) ? _config.VUE_APP_APP_PATH : '';
        return baseGateUrl + 'auth/redirect?to=' + baseDeckUrl + appPath;
    },
    userDetailsUrl(_config){
        let baseGateUrl = _config.VUE_APP_BASE_GATE_URL;
        let trailingSlashPresentGate = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresentGate){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'auth/user';
    },
    logOutUrl(_config){
        let baseGateUrl = _config.VUE_APP_BASE_GATE_URL;
        let trailingSlashPresentGate = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresentGate){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'auth/loggedOut';
    }
}