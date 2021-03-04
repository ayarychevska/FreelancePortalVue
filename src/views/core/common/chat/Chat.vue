<template>
    <div class="row mx-0 px-3">
        <!-- Conversations -->
        <div class="col-md-3 uk-padding-remove mt-3">
            <div style="display: block">
                <div
                    style="cursor: pointer;"
                    :style="selectedConversation && selectedConversation.receiverId == conversation.receiverId ? 'background: red' : ''"
                    @click="selectDialog(conversation)"
                    v-for="conversation in conversations"
                    :key="conversation.id"
                >
                    <conversation :conversation="conversation" />
                </div>
            </div>
        </div>

        <!-- Messages -->
        <div
            id="scroll-div"
            class="col-md-9"
            style="display: block; max-height: 800px; overflow: auto"
        >
            <div
                class="uk-text-left"
                v-if="messages.length > 0"
            >
                <div
                    v-for="message in messages"
                    :key="message.id"
                    :class="isMyMessage(message) ? 'uk-text-right': 'uk-text-left'"
                >
                    <message
                        :message="message"
                        :myMessage="isMyMessage(message)"
                    />
                </div>
            </div>

        </div>

        <!-- Create message -->
        <div class="footer col-md-9 ml-1 mb-2">
            <b-input-group
                prepend="Text"
                class="mt-3"
                style="min-height: 60px;"
            >
                <b-form-textarea
                    style="min-height: 60px;"
                    v-model="newMessage.text"
                ></b-form-textarea>
                <b-input-group-append>
                    <b-button
                        :disabled="!newMessage || newMessage.text.length == 0"
                        variant="info"
                        @click="send()"
                    >
                        <vk-icon icon="arrow-right"></vk-icon>
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { DateTime } from "luxon";
import Message from '@/views/core/common/chat/Message.vue';
import Conversation from '@/views/core/common/chat/Conversation.vue';
import { MessageCreateModel, MessageViewModel } from '@/models/core/common/Messages';


@Component({ components: { Message, Conversation } })
export default class Chat extends Vue {
    private conversations: MessageViewModel[] = [];
    private messages: MessageViewModel[] = [];
    private newMessage: MessageCreateModel = {
        text: "",
        status: 0,
        senderId: "",
        receiverId: ""
    }

    private data =
        {
            isTeacher: false,
            viewModels: [],
            pager: null
        };


    private selectedConversation = null;

    async created(): Promise<void> {
        await this.loadData();
        await this.wsEventHandler();
    }

    private isMyMessage(msg): boolean {
        return msg.senderId == this.userId ? true : false;
    }

    get userId() {
        return this.$store.state.auth.user.id;
    }

    async loadData() {
        this.conversations = (await this.$axios.get("/messages/conversations/" + this.userId)).data;
        console.log(this.conversations);
        this.newMessage.senderId = this.userId;

        this.$nextTick(() => this.scrollToTheBottom());

    }

    async completeReload() {
        await this.loadData();
        await this.loadConversation(this.newMessage.receiverId, this.userId);
        this.scrollToTheBottom();
    }

    async selectDialog(conversation: MessageViewModel) {
        this.selectedConversation = conversation;
        await this.loadConversation(conversation.senderId, conversation.receiverId);
    }

    async loadConversation(senderId, receiverId) {
        if (senderId == this.userId) {
            this.messages = (await this.$axios.get("/messages/conversation", { params: { who: senderId, withWho: receiverId } })).data;
            this.newMessage.receiverId = receiverId;
        }
        else {
            this.messages = (await this.$axios.get("/messages/conversation", { params: { who: receiverId, withWho: senderId } })).data;
            this.newMessage.receiverId = senderId;
        }
    }

    async wsEventHandler() {
        await this.$store.dispatch("ws/setHandler", this.completeReload);
    }

    async send() {
        await this.$store.dispatch("ws/sendMsg", { text: this.newMessage.text, to: this.newMessage.receiverId });
        this.newMessage.text = '';
    }

    scrollToTheBottom() {
        const element = this.$el.querySelector("#scroll-div");
        element.scrollTop = element.scrollHeight;
    }
}
</script>


<style lang="scss" scoped>
.footer {
    position: absolute;
    bottom: 0px;
    right: 0px;
}

#dialog {
    background-color: #b0b0b0;
}

#dialog a:focus {
    background-color: yellow;
}
</style>
