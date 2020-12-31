<template>
    <div>
        <div class="search-container">
            <search-input v-if="this.searchableItems.length > 0"
                          class="mb-2"
                          :list="searchableItems"
                          @setSearch="onSetSearch($event)"
                          @setFilteredList="onSetFilteredList($event)"></search-input>
        </div>
        <div class="pagination-container">
            <pagination :items="items" :refresh-on="documentationVisible" @pageUpdated="onPageUpdated($event)" @perPageUpdated="onPerPageUpdated($event)"></pagination>
        </div>
        <div class="list-container">
            <b-list-group v-if="searchableItems.length > 0">
                <list-item v-for="documentation in displayableItems" :item="documentation" :key="documentation.id" :search="search"></list-item>
            </b-list-group>
            <placeholder v-if="filteredList && filteredList.length === 0" variant="danger" message="No matches for search term."></placeholder>
        </div>
    </div>
</template>

<script>
import DocumentationListItem from "@/modules/documentation/components/DocumentationListItem";
import {mapGetters} from "vuex";
import Pagination from "@/modules/shared/Pagination";
import helpers from "@/core/utilities/helpers";
import DocumentationListSearch from "@/modules/documentation/components/DocumentationListSearch";
import Placeholder from "@/modules/shared/Placeholder";
export default {
    name: "DocumentationList",
    data() {
        return {
            search : '',
            filteredList: null,
            page: 1,
            perPage: 5,
        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'availableDocumentation',
            'documentationVisible'
        ]),
        items(){
            return this.filteredList ? this.filteredList : this.availableDocumentation;
        },
        displayableItems(){
            return helpers.setListItemsForPage(this.items,this.page,this.perPage);
        },
        searchableItems(){
            return [...this.availableDocumentation];
        }
    },
    methods: {
        onPageUpdated(_value){
            this.page = _value;
        },
        onPerPageUpdated(_value){
            this.perPage = _value;
        },
        onSetFilteredList(_value){
            this.filteredList = _value;
        },
        onSetSearch(_value){
            this.search = _value;
        }
    },
    components: {
        'list-item': DocumentationListItem,
        'pagination': Pagination,
        'search-input': DocumentationListSearch,
        'placeholder': Placeholder
    }
}
</script>

<style scoped>

.search-container {

}

.pagination-container {
    margin-bottom: 10px;
}

.list-container {

}

</style>
