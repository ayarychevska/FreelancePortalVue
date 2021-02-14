<template>
    <div class="container">
        <vk-button
            class="uk-width-1-1 uk-button-primary"
            @click="add"
        >Add post</vk-button>

        <div class="row mt-4">
            <div
                class="col-md-4"
                v-for="post in myPosts"
                :key="post.id"
            >
                <post-preview
                    class="mb-3"
                    :post="post"
                    :editable="true"
                />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import PostPreview from '@/views/core/common/post/Preview.vue'
import { Component, Vue } from "vue-property-decorator";
import { PostCreateModel, PostListViewModel } from '@/models/core/teacher/Posts';
import { DateTime } from "luxon";

@Component({ components: { PostPreview } })
export default class MyPostsList extends Vue {
    private myPosts: PostListViewModel[] = [];

    async created(): Promise<void> {
        const response = await this.$axios.get("/posts/my-posts", { params: { 'userId': this.$store.state.auth.user.id } });
        this.myPosts = response.data;
    }

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
