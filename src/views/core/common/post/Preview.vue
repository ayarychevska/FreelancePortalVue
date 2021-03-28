<template>
    <vk-card
        type="default"
        :hover="true"
        :class="['uk-text-left' ]"
        style="min-height: 280px;"
        padding="small"
    >
        <div slot="header">
            <vk-grid
                gutter="small"
                class="uk-flex-middle"
            >
                <div class="uk-width-expand">
                    <vk-card-title
                        class="uk-margin-remove-bottom"
                        style="width: 70%"
                    > {{ post.title }}</vk-card-title>
                    <p class="uk-text-meta uk-margin-remove-top"><time :datetime="prettyPostDate"> {{ prettyPostDate }}</time></p>
                </div>
            </vk-grid>
        </div>

        <vk-label
            slot="badge"
            :type="statusType"
        >
            {{ postStatus }}
        </vk-label>

        <div class="row minus-margin">
            <div class="col-6">
                <small><i>Author: </i></small>
                <vk-button
                    type="text"
                    class="uk-margin-remove "
                    @click="$router.push({ name: 'user-view', params: { id: post.userId }})"
                ><small><i> {{ post.userName }} </i> </small></vk-button>
            </div>
            <div class="col-6 uk-text-right">
                <small><i> Subject: {{ post.subjectTitle }} </i></small>
            </div>
        </div>

        <span
            v-if="post.text.length > 0"
            class="preview mt-3"
            v-html="post.text"
        />

        <div
            v-else
            class="mt-3"
        >
            <span> No additional description provided </span>
        </div>

        <div
            slot="footer"
            class="uk-text-center"
        >
            <vk-button-link
                type="text"
                @click="readMore(post.id)"
            >
                <vk-icon
                    icon="forward"
                    ratio="0.6"
                    class="mr-1"
                ></vk-icon>Read more
            </vk-button-link>
            <vk-button-link
                v-if="editable"
                class="ml-5"
                type="text"
                @click="edit(post.id)"
            >
                <vk-icon
                    icon="file-edit"
                    ratio="0.6"
                    class="mr-1"
                ></vk-icon>Edit
            </vk-button-link>
        </div>
    </vk-card>
</template>

<script lang="ts">
import { UserLoginModel } from "@/models/core/common/Users";
import { PostListViewModel, StatusTranslate } from "@/models/core/teacher/Posts";
import router from "@/router";
import { DateTime } from "luxon";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Preview extends Vue {
    @Prop({ required: true }) post!: PostListViewModel;
    @Prop({ required: true, default: false }) editable!: boolean;

    private readMore(id) {
        this.$router.push({ name: "post-details", params: { id: id } });
    }

    private get postStatus() {
        return StatusTranslate.find(x => x.status == this.post.status).value;
    }

    private edit(id) {
        this.$router.push({ name: "post-edit", params: { id: id } });
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
        return DateTime.fromISO(this.post.dateUtc.toString()).toLocaleString(DateTime.DATETIME_MED);
    }
}
</script>

<style lang="scss" scoped>
.preview {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
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
    margin-top: -15px;
}
</style>