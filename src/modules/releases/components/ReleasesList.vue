<template>
    <div>
        <div class="list-container" v-if="displayableReleases.length > 0">
            <b-row>
                <b-col>
                    <b-list-group>
                        <list-item v-for="(item,index) in displayableReleases" :item="item" :key="item.id" :index="index"></list-item>
                    </b-list-group>
                </b-col>
            </b-row>
        </div>
        <placeholder v-else variant="info" message="Unable to display releases in-app! Visit the Github Repo to review the releases."></placeholder>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ReleasesListItem from "@/modules/releases/components/ReleasesListItem";
import Placeholder from "@/modules/shared/Placeholder";
import helpers from "@/core/utilities/helpers";
export default {
    name: "ReleasesList",
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'releases',
            'imagesAvailable'
        ]),
        displayableReleases(){
            if(this.imagesAvailable){
                return helpers.filterArrayByObjPropertyValue(this.releases,'imageAvailable',true);
            } else {
                return this.releases;
            }
        }
    },
    methods: {

    },
    components: {
        'list-item': ReleasesListItem,
        'placeholder': Placeholder
    }
}
</script>

<style scoped>

.list-container {

}

</style>
