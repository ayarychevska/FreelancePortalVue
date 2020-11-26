<template>
    <div id="app">
        <div id="nav">
            <router-link to="/"> Home </router-link> |
            <router-link to="/about"> About </router-link> |
            <router-link :to="{ 'name': 'auth-registration' }"> Registration </router-link>
        </div>

        <default-empty />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultEmpty from './DefaultEmpty.vue'

@Component({ components: { DefaultEmpty } })
export default class Default extends Vue {
}
</script>