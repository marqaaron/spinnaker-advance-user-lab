import {store} from "@/main";
import alerts from "@/core/utilities/alerts";

export default {
    applicationsUrl(_appConfig){
        let baseGateUrl = _appConfig.BASE_GATE_URL;
        let trailingSlashPresent = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresent){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'applications';
    },
    pipelineConfigsUrl(_appConfig,_applicationName){
        let baseGateUrl = _appConfig.BASE_GATE_URL;
        let trailingSlashPresent = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresent){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'applications/' + _applicationName + '/pipelineConfigs'
    },
    pipelineExecutionsUrl(_appConfig,_applicationName){
        let baseGateUrl = _appConfig.BASE_GATE_URL;
        let trailingSlashPresent = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresent){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'applications/' + _applicationName + '/pipelines'
    },
    evaluateExpressionUrl(_appConfig,_pipelineId){
        let baseGateUrl = _appConfig.BASE_GATE_URL;
        let trailingSlashPresent = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresent){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'pipelines/' + _pipelineId + '/evaluateExpression'
    },
    sessionValid(_response){
        let responseData = _response.data;
        if(typeof responseData === 'string'){
            return !responseData.match(/^([.|\n]*)?<html.*/);
        } else {
            return true;
        }

    }
}