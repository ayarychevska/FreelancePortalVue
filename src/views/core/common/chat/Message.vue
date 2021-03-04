<template>
    <div
        class="mt-2 mb-2"
        style="display: inline-block; min-width: 40%; max-width: 60%"
    >
        <b-card
            :border-variant="!myMessage ? 'info' : 'default'"
            :header-bg-variant="!myMessage ? 'info' : 'default'"
            :header-text-variant="!myMessage ? 'white' : 'default'"
            header-tag="header"
            footer-tag="footer"
        >
            <template #header>
                <div class="uk-margin-remove uk-padding-remove">
                    <vk-grid
                        gutter="small"
                        class="uk-flex-middle uk-text-left "
                    >
                        <div class="uk-width-auto">
                            <img
                                class="uk-border-circle"
                                width="40"
                                height="40"
                                src="/images/guide/avatar.jpg"
                            >
                        </div>
                        <div class="uk-width-expand">
                            <p @click="$router.push({ name: 'user-view', params: { id: message.senderId }})"> <i><b> {{ message.senderName }} </b> said:</i></p>

                        </div>
                    </vk-grid>
                </div>
            </template>
            <b-card-text class="uk-text-left">{{ message.text }}</b-card-text>

            <template #footer>
                <p class="uk-margin-remove uk-text-left uk-text-meta">{{ prettyMessageDate }}</p>
            </template>
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
    @Prop({ required: true }) message!: MessageViewModel;
    @Prop({ required: true }) myMessage!: boolean;

    get prettyMessageDate() {
        return DateTime.fromISO(this.message.dateTimeSendedUTC.toString()).toLocaleString(DateTime.DATETIME_MED);
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

.minus-margin {
    margin-top: -15px;
}

.message-style {
    border: 1px solid rgb(136, 136, 136) !important;
}
</style>