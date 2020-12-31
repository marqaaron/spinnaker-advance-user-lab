<template>
    <b-list-group-item class="list-group-item">
        <b-row>
            <b-col cols="9" class="pointer" @click="onSelectDocumentation(item.id)">
                <b-row>
                    <b-col class="title">
                        <span v-html="highlightSearchMatch(item.title)"></span>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="summary">
                        <span v-html="highlightSearchMatch(item.summary)"></span>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <span class="categories-label mr-2">Categories:</span>
                        <b-badge
                            class="mr-1"
                            v-for="category in categories"
                            variant="primary"
                            size="sm"
                            :key="category">
                            {{category}}
                        </b-badge>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="3" class="buttons-col">
                <div class="btn-group float-right btn-block">
                    <b-button
                        variant="outline-primary"
                        size="sm"
                        title="View"
                        v-b-tooltip.hover
                        @click="onSelectDocumentation(item.id)">
                        <font-awesome-icon
                            icon="eye"
                        ></font-awesome-icon>
                    </b-button>
                    <b-button
                        variant="outline-primary"
                        size="sm"
                        title="Open in New Window"
                        v-b-tooltip.hover
                        @click="onOpenDocumentation()">
                        <font-awesome-icon
                            icon="external-link-alt"
                        ></font-awesome-icon>
                    </b-button>
                </div>
            </b-col>
        </b-row>
    </b-list-group-item>
</template>

<script>
import {mapGetters} from "vuex";
import helpers from "@/core/utilities/helpers";
import alerts from "@/core/utilities/alerts";
export default {
    name: "DocumentationListItem",
    props: {
        item: {
            type: Object
        },
        search: {
            type: [String,Number]
        }
    },
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        ...mapGetters([

        ]),
        categories(){
            return this.item.categories.split('|');
        }
    },
    methods: {
        onSelectDocumentation(_value){
            this.$store.dispatch('setViewDocumentation',_value);
        },
        highlightSearchMatch(_value){
            return helpers.highlightSearchMatch(_value,this.search)
        },
        onOpenDocumentation(){
            this.$swal(alerts.comingSoon());
        }
    },
    components: {

    }
}
</script>

<style scoped>

.title {
    font-size: 1.5rem;
    font-weight:bold;
}
.buttons-col{
    border-left: 1px solid rgba(0, 0, 0, 0.125);
    margin: auto 0;
}

.categories-label {
    font-size: 1.2rem;
    font-weight:bold;
}

</style>
