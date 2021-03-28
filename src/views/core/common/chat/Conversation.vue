<template>
    <div class="pb-1 mb-2">
        <b-card
            no-body
            class="overflow-hidden"
        >
            <b-row no-gutters>
                <b-col md="2">
                    <b-card-img
                        :src="avatar"
                        alt="Image"
                        id="Avatar"
                        class="rounded-2"
                    ></b-card-img>
                </b-col>
                <b-col md="10">
                    <b-card-body class="pt-1 pb-1 pl-3">
                        <b-card-title class="uk-margin-remove uk-text-left">
                            <vk-button
                                type="text"
                                class="uk-margin-remove "
                                @click="$router.push({ name: 'user-view', params: { id: conversationWith.id }})"
                            >{{ conversationWith.name }}</vk-button>
                        </b-card-title>
                        <p
                            class="uk-text-meta uk-margin-remove-top uk-text-left pb-0 mb-0"
                            style="font-size: 9pt"
                        > {{ prettyMessageDate }} </p>
                        <b-card-text class="mt-1">
                            <div class="uk-text-left pl-1 mt-0 pt-0">
                                <span
                                    v-if="this.conversation.senderId == userId"
                                    class="preview"
                                    v-html="'<i><small>you: </small></i>' + conversation.text"
                                > </span>
                                <span
                                    v-else
                                    class="preview"
                                    v-html="conversation.text"
                                > </span>
                            </div>
                        </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script lang="ts">
import { UserLoginModel } from "@/models/core/common/Users";
import { MessageViewModel } from "@/models/core/common/Messages";
import router from "@/router";
import { DateTime } from "luxon";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Preview extends Vue {
    @Prop({ required: true }) conversation!: MessageViewModel;

    get prettyMessageDate() {
        return DateTime.fromISO(this.conversation.dateTimeSendedUTC.toString()).toLocaleString(DateTime.DATETIME_MED);
    }

    get userId() {
        return this.$store.state.auth.user.id;
    }

    conversationWith =
        {
            id: this.$store.state.auth.user.id == this.conversation.senderId ? this.conversation.receiverId : this.conversation.senderId,
            name: this.$store.state.auth.user.id == this.conversation.senderId ? this.conversation.receiverName : this.conversation.senderName,
            avatar: this.$store.state.auth.user.id == this.conversation.senderId ? this.conversation.receiverAvatar : this.conversation.senderAvatar
        }

    get avatar() {
        return this.conversationWith.avatar ? process.env.VUE_APP_API_URL + "/application-users/" + this.conversationWith.avatar + "/avatar" : '';
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

.minus-margin {
    margin-top: -15px;
}

.message-style {
    display: block;
    border-bottom: 1px solid rgb(136, 136, 136) !important;
}

.preview {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
}
</style>