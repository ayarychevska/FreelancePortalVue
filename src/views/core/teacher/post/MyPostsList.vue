<template>
    <div class="container">
        <vk-button
            class="uk-width-1-1 uk-button-primary"
            @click="add"
        >Add post</vk-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PostCreateModel } from '@/models/core/teacher/Posts';
import { DateTime } from "luxon";

@Component({})
export default class MyPostsList extends Vue {
    async add(): Promise<void> {
        this.$router.push({ name: "post-add" });
    }
}
</script>

<style lang="scss" scoped>
label {
    font-size: 13px;
}
</style>
