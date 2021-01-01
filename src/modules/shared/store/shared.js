import api from "@/core/utilities/api";
import helpers from "@/core/utilities/helpers";
import log from "@/core/utilities/log";
import gateEndpoints from "@/modules/pipelineExpressionTester/store/gateEndpoints";
import {appConfig} from "@/main";
import {envConfig} from "@/main";

export default {
    state: {
        paginationContainerWidth: 0,
    },
    getters: {
        paginationContainerWidth(state){
            return state.paginationContainerWidth;
        }
    },
    actions: {
        setPaginationContainerWidth(context,payload){
            context.commit("setPaginationContainerWidth",payload);
        }
    },
    mutations: {
        setPaginationContainerWidth(state,payload){
            state.paginationContainerWidth = document.querySelector('.pagination-container').clientWidth;
        }
    }
}
