<template>
    <div class="container">
        <div class="uk-margin-medium-top">
            <vk-card
                type="default"
                hover="true"
                :class="['uk-text-left' ]"
                padding="large"
            >
                <div slot="header">
                    <vk-grid
                        gutter="small"
                        class="uk-flex-middle"
                    >
                        <div class="uk-width-expand">
                            <vk-card-title class="uk-margin-remove-bottom"> {{ post.title }}</vk-card-title>
                            <p class="uk-text-meta uk-margin-remove-top"> {{ prettyPostDate }}</p>
                        </div>
                    </vk-grid>
                </div>

                <vk-label
                    slot="badge"
                    :type="statusType"
                >
                    {{ postStatus }}
                </vk-label>

                <div class="row minus-margin mb-3">
                    <div class="col-6">
                        <vk-button
                            type="text"
                            class="uk-margin-remove "
                            @click="$router.push({ name: 'user-view', params: { id: post.userId }})"
                        ><small><i> Author: {{ post.userName }} </i> </small></vk-button>
                    </div>
                    <div class="col-6 uk-text-right">
                        <small><i> Subject: {{ post.subjectTitle }} </i></small>
                    </div>
                </div>

                <p
                    v-if="post.text.length > 0"
                    v-html="post.text"
                />

                <p v-else> No additional description provided </p>

                <vk-button
                    v-if="isAuthor"
                    type="secondary"
                    @click="edit(post.id)"
                >
                    <vk-icon
                        icon="file-edit"
                        class="mr-1"
                    ></vk-icon> Edit
                </vk-button>
            </vk-card>
        </div>
    </div>
</template>

<script lang="ts">
import { UserLoginModel } from "@/models/core/common/Users";
import { PostViewModel, StatusTranslate } from "@/models/core/teacher/Posts";
import router from "@/router";
import { DateTime } from "luxon";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class View extends Vue {
    private post: PostViewModel = {
        id: 0,
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

    private get postStatus() {
        return StatusTranslate.find(x => x.status == this.post.status).value;
    }

    private get isAuthor(): boolean {
        return this.$store.state.auth.user.id == this.post.userId;
    }

    public get statusType() {
        switch (this.post.status) {
            case 0: return 'danger';
            case 1: return 'primary';
            case 2: return 'warning';
            default: return '';
        }
    }

    get prettyPostDate() {
        return DateTime.fromISO(this.post.dateUtc.toString()).toLocaleString(DateTime.DATETIME_MED).toString();
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

.draft {
    background: rgb(189, 26, 26);
}

.archive {
    background: rgb(204, 121, 12);
}

.published {
    background: rgb(29, 74, 197);
}

.minus-margin {
    margin-top: -40px;
}
</style>