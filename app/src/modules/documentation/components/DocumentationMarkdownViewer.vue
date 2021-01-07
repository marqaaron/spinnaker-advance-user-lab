<template>
    <div class="markdown-viewer-wrapper">
        <b-card :class="markdownContainerClasses">
            <vue-markdown :source="markdown"></vue-markdown>
        </b-card>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import VueMarkdown from 'vue-markdown-v2';
export default {
    name: "DocumentationMarkdownViewer",
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
            'documentationSliderWidth',
            'standaloneDocumentation',
            'windowWidth'
        ]),
        markdownContainerClasses(){
            return {
                'markdown-container': true,
                'markdown-container-standalone': this.standaloneDocumentation,
                'markdown-container-33': (this.documentationSliderWidth === '33%' && this.standaloneDocumentation === false),
                'markdown-container-50': (this.documentationSliderWidth === '50%' && this.standaloneDocumentation === false),
                'markdown-container-100': (this.documentationSliderWidth === '100%' && this.standaloneDocumentation === false)
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

.markdown-container img{
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
}

@media only screen and (min-width: 1601px) {
    .markdown-container-standalone img{
        width: 35%;
    }
}

@media only screen and (max-width: 1600px) {
    .markdown-container-standalone img{
        width: 35%;
    }
}

@media only screen and (max-width: 1400px) {
    .markdown-container-standalone img{
        width: 45%;
    }
}

@media only screen and (max-width: 1200px) {
    .markdown-container-standalone img{
        width: 55%;
    }
}

@media only screen and (max-width: 1000px) {
    .markdown-container-standalone img{
        width: 65%;
    }
}

.markdown-container-33 img{
    width: 90%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
}

.markdown-container-50 img{
    width: 55%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
}

.markdown-container-100 img{
    width: 35%;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
}

.markdown-container blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    border-left: 5px solid #eee;
}

.markdown-container .warning blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    border-left: 5px solid #e27777;
}

.markdown-container code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
}

pre > code {
    background-color: #ececec !important;
    padding: 10px !important;
    display: block;
    color: black !important;
}

.markdown-container li > p {
    margin-bottom: 0;
    margin-top: 5px;
}

.markdown-container strong {
    font-weight: bold;
}

.markdown-container h1 {
    font-size: 2.0rem;
    font-weight: bold;
}

.markdown-container h2 {
    font-size: 1.8rem;
    font-weight: bold;
}

.markdown-container h3 {
    font-size: 1.6rem;
    font-weight: bold;
}

</style>
