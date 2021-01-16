<template>
    <div class="container">
        <div class="uk-margin-medium-top">
            <vk-card
                type="default"
                hover="true"
                class="uk-text-left"
                padding="large"
            >
                <vk-label slot="badge">
                    {{ post.subjectTitle }}
                </vk-label>

                <vk-card-title> {{ post.title }} </vk-card-title>

                <span> Description: </span>
                <span
                    v-if="post.text.length > 0"
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
                        @click="readMore"
                    >Read more</vk-button-link>
                    <vk-button-link
                        class="ml-5"
                        type="text"
                        @click="edit(post.id)"
                    >Edit</vk-button-link>
                </div>
            </vk-card>
        </div>
    </div>
</template>

<script lang="ts">
import { UserLoginModel } from "@/models/core/common/Users";
import { PostViewModel } from "@/models/core/teacher/Posts";
import router from "@/router";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class View extends Vue {
    private post: PostViewModel = {
        title: "",
        text: "",
        userId: "",
        status: 0,
        subjectId: null,
        dateUtc: null,
        userName: "",
        subjectTitle: ""
    }

    async created() {
        const step1 = this.$axios.get<PostViewModel>(`/posts/${this.$route.params.id}/view`);
        const step2 = await step1;
        const step3 = step2.data;

        this.post = step3;
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