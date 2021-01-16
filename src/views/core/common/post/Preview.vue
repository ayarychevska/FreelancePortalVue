<template>
    <vk-card
        type="default"
        hover="true"
        class="uk-text-left"
        style="min-height: 280px;"
        padding="small"
    >
        <vk-label slot="badge">
            {{ post.subjectTitle }}
        </vk-label>

        <vk-card-title> {{ post.title }} </vk-card-title>

        <span> Description: </span>
        <span
            v-if="post.text.length > 0"
            class="preview"
            v-html="post.text"
        />

        <div v-else>
            <span> No additional description provided </span>
        </div>

        <p class="uk-text-left"> Created by: {{ post.userName }} </p>

        <div
            slot="footer"
            class="uk-text-center"
        >
            <vk-button-link
                type="text"
                @click="readMore(post.id)"
            >Read more</vk-button-link>
            <vk-button-link
                class="ml-5"
                type="text"
                @click="edit(post.id)"
            >Edit</vk-button-link>
        </div>
    </vk-card>
</template>

<script lang="ts">
import { UserLoginModel } from "@/models/core/common/Users";
import { PostListViewModel } from "@/models/core/teacher/Posts";
import router from "@/router";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Rreview extends Vue {
    @Prop({ required: true }) post!: PostListViewModel;

    private readMore(id) {
        this.$router.push({ name: "post-details", params: { id: id } });
    }

    private edit(id) {
        this.$router.push({ name: "post-edit", params: { id: id } });
    }
}
</script>

<style lang="scss" scoped>
.preview {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
}

.uk-card-footer {
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
}
</style>