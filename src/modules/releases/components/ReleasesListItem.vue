<template>
    <b-list-group-item class="list-group-item">
        <b-row>
            <b-col cols="3" class="summary-content">
                <b-row>
                    <b-col cols="12">
                        <b-icon-tag></b-icon-tag> {{item.tag_name}}
                    </b-col>
                    <b-col cols="12" v-if="index === 0">
                        <b-badge variant="success" size="sm">Latest</b-badge>
                    </b-col>
                    <b-col cols="12" v-if="item.tag_name === currentVersion">
                        <b-badge variant="danger" size="sm">Currently Deployed</b-badge>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="9" class="main-content">
                <b-row>
                    <b-col cols="12">
                        <h4>
                            <a :href="item.html_url" target="_blank">{{item.name}}</a>
                        </h4>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <p>
                            <img :src="item.author.avatar_url" :alt="item.author.login" class="avatar mr-2">
                            <span><span class="bold">{{item.author.login}}</span> released this <span class="release-date" :title="releaseDate" v-b-tooltip.hover>{{releaseDateFromNow}}</span></span>
                        </p>
                    </b-col>
                </b-row>
                <b-row v-if="item.body !== ''">
                    <b-col cols="12">
                        <release-markdown-viewer :markdown="item.body"></release-markdown-viewer>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <hr>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <p class="bold">Assets</p>
                    </b-col>
                    <b-col cols="12">
                        <b-list-group>
                            <b-list-group-item >
                                <b-row>
                                    <b-col>
                                        <b-icon-file-zip class="mr-2"></b-icon-file-zip><a :href="item.zipball_url"><span class="bold">Source code</span> (zip)</a>
                                    </b-col>
                                </b-row>
                            </b-list-group-item>
                            <b-list-group-item >
                                <b-row>
                                    <b-col>
                                        <b-icon-file-zip class="mr-2"></b-icon-file-zip><a :href="item.tarball_url"><span class="bold">Source code</span> (tar.gz)</a>
                                    </b-col>
                                </b-row>
                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-list-group-item>
</template>

<script>
import {mapGetters} from "vuex";
import helpers from "@/core/utilities/helpers";
import ReleaseBodyMarkdownViewer from "@/modules/releases/components/ReleaseBodyMarkdownViewer";

export default {
    name: "ReleaseListItem",
    props: {
        item: {
            type: Object
        },
        index: {
            type: Number
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
            'appConfig'
        ]),
        releaseDateFromNow(){
            return helpers.toMomentFromNow(this.item.published_at);
        },
        currentVersion(){
            return this.appConfig.VERSION;
        },
        releaseDate(){
            return helpers.toMoment(this.item.published_at,'MM/DD/YYYY h:mm a Z')
        }
    },
    methods: {

    },
    components: {
        'release-markdown-viewer': ReleaseBodyMarkdownViewer
    }
}
</script>

<style scoped>

.list-group-item {
    background-color: initial;
}

.avatar {
    width: 20px;
    height: 20px;
    border-radius:50%;
}

.release-date {
    background-color: #ececec;
    padding: 1px 4px;
    border-radius: 3px;
}

</style>
