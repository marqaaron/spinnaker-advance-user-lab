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
