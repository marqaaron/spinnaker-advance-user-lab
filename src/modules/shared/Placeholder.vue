<template>
    <div>
        <b-row>
            <b-col>
                <b-alert :variant="variant" show>{{ message }}</b-alert>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "Placeholder",
    props: {
        message: {
            type: String,
            default: 'New Content Coming Soon!'

        },
        variant: {
            type: String,
            default: 'primary'
        }
    },
    data() {
        return {

        }
    },
    created() {

    },
    computed: {

    },
    methods: {

    },
    components: {

    },
    watch: {

    }
}
</script>

<style scoped>

</style>
