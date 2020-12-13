<template>
    <div class="container">
        <div class="uk-margin-medium-top">
            <vk-tabs align="justify">
                <vk-tabs-item title="Main information">
                    <main-info />
                </vk-tabs-item>
                <vk-tabs-item title="Security">
                    <security />
                </vk-tabs-item>
                <vk-tabs-item title="Subjects">
                    <subjects />
                </vk-tabs-item>
            </vk-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainInfo from "./MainInfo.vue";
import Security from "./Security.vue";
import Subjects from "./UserSubjects.vue";

@Component({ components: { MainInfo, Security, Subjects } })
export default class Profile extends Vue {
}
</script>

<style lang="scss" scoped>
label {
    font-size: 13px;
}
</style>
