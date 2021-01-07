<template>
    <div class="markdown-viewer-wrapper">
        <div :class="markdownContainerClasses">
            <vue-markdown :source="markdown" :linkify="false"></vue-markdown>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import VueMarkdown from 'vue-markdown-v2';
export default {
    name: "ReleaseMarkdownViewer",
    props: {
        'markdown': {
            type: String,
            default(){
                return '### Testing'
            }
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
        markdownContainerClasses(){
            return {
                'release-markdown-container': true,
            }
        },
    },
    methods: {

    },
    components: {
        'vue-markdown' : VueMarkdown
    }
}
</script>

<style>

.release-markdown-container img{
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
}

@media only screen and (min-width: 1601px) {
    .release-markdown-container img{
        width: 25%;
    }
}

@media only screen and (max-width: 1600px) {
    .release-markdown-container img{
        width: 35%;
    }
}

@media only screen and (max-width: 1400px) {
    .release-markdown-container img{
        width: 45%;
    }
}

@media only screen and (max-width: 1200px) {
    .release-markdown-container img{
        width: 55%;
    }
}

@media only screen and (max-width: 1000px) {
    .release-markdown-container img{
        width: 65%;
    }
}

.release-markdown-container blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    border-left: 5px solid #eee;
}

.release-markdown-container .warning blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    border-left: 5px solid #e27777;
}

.release-markdown-container code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
}

.release-markdown-container li > p {
    margin-bottom: 0;
    margin-top: 5px;
}

.release-markdown-container strong {
    font-weight: bold;
}

.release-markdown-container h1 {
    font-size: 2.0rem;
    font-weight: bold;
}

.release-markdown-container h2 {
    font-size: 1.8rem;
    font-weight: bold;
}

.release-markdown-container h3 {
    font-size: 1.6rem;
    font-weight: bold;
}

</style>
