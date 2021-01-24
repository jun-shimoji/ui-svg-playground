<template>
    <div>
        <v-btn icon @click.stop="click_btn"><v-app-bar-nav-icon /></v-btn>    
    </div>
</template>

<script>
export default {
    data: () => ({
        mini: false
    }),
    methods: {
        click_btn() {
            this.mini = !this.mini
            this.$emit('click_btn', this.mini)
        }
    }
}
</script>