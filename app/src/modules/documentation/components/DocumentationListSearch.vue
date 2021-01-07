<template>
    <b-row>
        <b-col>
            <b-input-group>
                <b-input-group-prepend is-text>
                    Search
                </b-input-group-prepend>
                <b-input-group-prepend>
                    <b-form-select :options="options" v-model="property"></b-form-select>
                </b-input-group-prepend>
                <b-input type="text" placeholder="Enter Search Term..." v-model="search" @update="onSearchUpdate"></b-input>
            </b-input-group>
        </b-col>
    </b-row>
</template>

<script>
import {mapGetters} from "vuex";
import helpers from "@/core/utilities/helpers";

export default {
    name: "DocumentationListSearch",
    props: {
        list: {
            type: Array
        }
    },
    data() {
        return {
            search: '',
            property: '',
            options: [
                {
                    value: '',
                    text: 'All Item Data'
                }
            ],
            allowedPropertyTypes: [
                'string',
                'number'
            ],
            itemPropertyTypes: {}
        }
    },
    created() {
        this.setSearcherConfiguration();
    },
    computed: {
        ...mapGetters([

        ]),
        filteredList(){
            if(this.search !== ''){
                if(this.property !== ''){
                    return helpers.filterArrayByObjPropertyContainsValue(this.list,this.property,this.search)
                } else {
                    return helpers.filterArrayByAllObjectPropertiesContainingValue(this.list,this.allowedPropertyTypes,this.search);
                }
            } else {
                return this.list;
            }
        }
    },
    methods: {
        onSearchUpdate(){
            this.$emit('setFilteredList',this.filteredList);
            this.$emit('setSearch',this.search);
        },
        setSearcherConfiguration(){
            if(this.list && this.list.length > 0){
                let sampleListItem = this.list[0];
                let itemKeys = Object.keys(sampleListItem);
                itemKeys.forEach((value)=>{
                    if(this.allowedPropertyTypes.includes(typeof sampleListItem[value])){
                        let option = {
                            value: value,
                            text: value
                        };
                        this.options.push(option);
                    }
                    this.itemPropertyTypes[value] = typeof sampleListItem[value];
                })
            }
        }
    },
    components: {

    },
    watch: {

    }
}
</script>

<style scoped>

</style>
