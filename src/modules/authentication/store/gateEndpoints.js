export default {
    loginRedirectUrl(_appConfig,_envConfig){
        let baseGateUrl = _appConfig.BASE_GATE_URL;
        let trailingSlashPresentGate = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresentGate){
            baseGateUrl = baseGateUrl + '/';
        }
        let baseDeckUrl = _appConfig.BASE_DECK_URL;
        let trailingSlashPresentDeck = baseDeckUrl.match(/^.*\/$/);
        if(!trailingSlashPresentDeck){
            baseDeckUrl = baseDeckUrl + '/';
        }
        let appPath = _envConfig.VUE_APP_PATH;
        return baseGateUrl + 'auth/redirect?to=' + baseDeckUrl + appPath;
    },
    userDetailsUrl(_appConfig){
        let baseGateUrl = _appConfig.BASE_GATE_URL;
        let trailingSlashPresentGate = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresentGate){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'auth/user';
    },
    logOutUrl(_appConfig){
        let baseGateUrl = _appConfig.BASE_GATE_URL;
        let trailingSlashPresentGate = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresentGate){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'auth/logout';
    }
}