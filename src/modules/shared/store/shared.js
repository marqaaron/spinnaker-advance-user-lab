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
            if(document.querySelector('.pagination-container') !== null){
                state.paginationContainerWidth = document.querySelector('.pagination-container').clientWidth;
            }
        }
    }
}
