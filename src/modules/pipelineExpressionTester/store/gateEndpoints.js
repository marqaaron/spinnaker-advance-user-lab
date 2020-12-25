import {store} from "@/main";
import alerts from "@/core/utilities/alerts";

export default {
    applicationsUrl(_config){
        let baseGateUrl = _config.VUE_APP_BASE_GATE_URL;
        let trailingSlashPresent = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresent){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'applications';
    },
    pipelineConfigsUrl(_config,_applicationName){
        let baseGateUrl = _config.VUE_APP_BASE_GATE_URL;
        let trailingSlashPresent = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresent){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'applications/' + _applicationName + '/pipelineConfigs'
    },
    pipelineExecutionsUrl(_config,_applicationName){
        let baseGateUrl = _config.VUE_APP_BASE_GATE_URL;
        let trailingSlashPresent = baseGateUrl.match(/^.*\/$/);
        if(!trailingSlashPresent){
            baseGateUrl = baseGateUrl + '/';
        }
        return baseGateUrl + 'applications/' + _applicationName + '/pipelines'
    },
    evaluateExpressionUrl(_config,_pipelineId){
        let baseGateUrl = _config.VUE_APP_BASE_GATE_URL;
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