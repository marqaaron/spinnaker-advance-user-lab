<template>
    <div>
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
            'documentationSliderWidth'
        ]),
        markdownContainerWidth(){
            return document.querySelector('.markdown-container').clientWidth
        },
        markdownContainerClasses(){
            return {
                'markdown-container': true,
                'markdown-container-33': this.documentationSliderWidth === '33%',
                'markdown-container-50': this.documentationSliderWidth === '50%',
                'markdown-container-100': this.documentationSliderWidth === '100%'
            }
        }
    },
    methods: {

    },
    components: {
        'vue-markdown' : VueMarkdown
    }
}
</script>

<style>

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
    width: 75%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
}

.markdown-container-100 img{
    width: 40%;
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
