<template>
    <div class="release-image-details-container">
        <b-row>
            <b-col cols="12" class="text-center bold image-details-header">
                <b-icon icon="box" aria-hidden="true" class="mr-2"></b-icon><span>Image Details</span>
                <hr>
            </b-col>
            <b-col cols="12">
                <span class="bold mr-2">Tag:</span><a :href="details.url" target="_blank">{{details.name}}</a>
            </b-col>
            <b-col cols="12">
                <span class="bold mr-2">Last Pushed:</span>{{lastUpdatedDateFromNow}}
            </b-col>
            <b-col cols="12">
                <span class="bold mr-2">Pushed by:</span>{{details.last_updater_username}}
            </b-col>
            <b-col cols="12">
                <span class="bold mr-2">Digest:</span>{{details.short_digest}}
            </b-col>
            <b-col cols="12">
                <span class="bold mr-2">OS/ARCH:</span>{{details.os}}/{{details.architecture}}
            </b-col>
            <b-col cols="12">
                <span class="bold mr-2">Size:</span>{{details.full_size_mb}} MB
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import helpers from "@/core/utilities/helpers";

export default {
    name: "ReleaseImageDetails",
    props: {
        details: {
            type: Object
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
        lastUpdatedDateFromNow(){
            return helpers.toMomentFromNow(this.details.last_tag_pushed);
        }
    },
    methods: {

    },
    components: {

    }
}
</script>

<style scoped>

@media only screen and (min-width: 1601px) {
    .release-image-details-container {
        width: 40%;
    }
}

@media only screen and (max-width: 1600px) {
    .release-image-details-container {
        width: 50%;
    }
}

@media only screen and (max-width: 1400px) {
    .release-image-details-container {
        width: 60%;
    }
}

@media only screen and (max-width: 1200px) {
    .release-image-details-container {
        width: 70%;
    }
}

@media only screen and (max-width: 1000px) {
    .release-image-details-container {
        width: 80%;
    }
}

@media only screen and (max-width: 800px) {
    .release-image-details-container {
        width: 100%;
    }
}








.release-image-details-container {
    background-color: #f7f7f7;
    padding: 10px 10px 5px 10px;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    font-size: 1.3rem;
}

.image-details-header {

}

</style>
