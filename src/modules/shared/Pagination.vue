<template>
    <div class="pagination-container">
        <b-row>
            <b-col :cols="buttonColumns" class="mt-2">
                <b-input-group>
                    <b-input-group-append is-text>
                        Items per Page
                    </b-input-group-append>
                    <b-form-select :options="perPageOptions"
                                   v-model="perPage"
                                   @change="onUpdatePerPage"></b-form-select>
                </b-input-group>
            </b-col>
            <b-col :cols="buttonColumns" class="mt-2">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-button variant="outline-secondary"
                                  title="Jump to Start"
                                  v-b-tooltip.hover
                                  @click="onJumpToStart">
                            <font-awesome-icon icon="backward"/>
                        </b-button>
                    </b-input-group-prepend>
                    <b-input-group-prepend>
                        <b-button variant="outline-secondary"
                                  title="Previous Page"
                                  v-b-tooltip.hover
                                  @click="onPrevious">
                            <font-awesome-icon size="lg" icon="caret-left"/>
                        </b-button>
                    </b-input-group-prepend>
                    <b-input-group-prepend is-text>Page #</b-input-group-prepend>
                    <b-form-input class="text-center" id="pageInput" type="number" v-model="page" @input="onManualUpdate($event)" @change="onManualUpdate($event)"></b-form-input>
                    <b-input-group-append is-text>
                        of {{ lastPage }} Pages
                    </b-input-group-append>
                    <b-input-group-append>
                        <b-button variant="outline-secondary"
                                  title="Next Page"
                                  v-b-tooltip.hover
                                  @click="onNext">
                            <font-awesome-icon size="lg" icon="caret-right"/>
                        </b-button>
                    </b-input-group-append>
                    <b-input-group-append>
                        <b-button variant="outline-secondary"
                                  title="Jump to End"
                                  v-b-tooltip.hover
                                  @click="onJumpToEnd">
                            <font-awesome-icon icon="forward"/>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Pagination",
    props: {
        items: {
            type: Array,
            default: function(){
                return [];
            }
        },
        refreshOn: {
            default: function() {
                return null
            }
        }
    },
    data() {
        return {
            page: 1,
            perPage: 10,
            perPageOptions: [5,10,25,50,100]
        }
    },
    created() {
        this.emitPageUpdated();
        this.emitPerPage();
        this.$nextTick(()=>{
            this.setContainerWidth();
        })
        window.addEventListener("resize",this.onWindowResize);
    },
    computed: {
        ...mapGetters([
            "paginationContainerWidth"
        ]),
        lastPage(){
            return this.items.length % this.perPage === 0 ? Math.floor(this.items.length/this.perPage) : Math.floor(this.items.length/this.perPage) + 1;
        },
        buttonColumns(){
            if(this.paginationContainerWidth < 700){
                return 12;
            } else {
                return 6
            }
        }
    },
    methods: {
        onWindowResize(){
            this.setContainerWidth();
        },
        setContainerWidth(){
            this.$store.dispatch("setPaginationContainerWidth",true);
        },
        onNext(){
            if(this.page < this.lastPage){
                this.page = this.page + 1;
                this.emitPageUpdated();
            }
        },
        onPrevious(){
            if(this.page > 1){
                this.page = this.page -1;
                this.emitPageUpdated();
            }
        },
        onUpdatePerPage(){
            this.page = 1;
            this.emitPageUpdated();
            this.emitPerPage();
        },
        onManualUpdate(_event){
            if(parseInt(_event) <= 1){
                this.$nextTick(()=>{
                    this.page = 1;
                })
            }
            if(parseInt(_event) > this.lastPage){
                this.$nextTick(()=>{
                    this.page = this.lastPage;
                })
            }
            this.$nextTick(()=>{
                this.emitPageUpdated();
            });
        },
        onJumpToStart(){
            this.page = 1;
            this.emitPageUpdated();
        },
        onJumpToEnd(){
            this.page = this.lastPage;
            this.emitPageUpdated();
        },
        emitPageUpdated(){
            this.$emit('pageUpdated',this.page);
        },
        emitPerPage(){
            this.$emit('perPageUpdated',this.perPage);
        }
    },
    components: {

    },
    watch: {
        items(){
            this.page = 1;
            this.emitPageUpdated();
        },
        refreshOn(){
            this.setContainerWidth();
        }
    }
}
</script>

<style scoped>

</style>
