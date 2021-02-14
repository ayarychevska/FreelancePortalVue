<template>
    <vk-card>
        <div slot="header">
            <vk-grid
                gutter="small"
                class="uk-flex-middle uk-text-left"
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
                    <vk-card-title
                        style="cursor: pointer"
                        class="uk-margin-remove-bottom"
                        @click="$router.push({ name: 'user-view', params: { id: review.reviewerId }})"
                    >{{ review.reviewerName }}</vk-card-title>
                    <p class="uk-text-meta uk-margin-remove-top"> {{ prettyReviewDate }} </p>
                </div>
            </vk-grid>
        </div>

        <vk-label slot="badge">
            <div
                class="rating"
                style="font-size: 1.3em;"
            >
                <span :class="{ 'granted' : review.rate == 1 }">☆</span>
                <span :class="{ 'granted' : review.rate == 2 }">☆</span>
                <span :class="{ 'granted' : review.rate == 3 }">☆</span>
                <span :class="{ 'granted' : review.rate == 4 }">☆</span>
                <span :class="{ 'granted' : review.rate == 5 }">☆</span>
            </div>
        </vk-label>

        <div class="uk-text-left">
            <p>{{ review.text }}</p>
        </div>
    </vk-card>
</template>

<script lang="ts">
import { UserLoginModel } from "@/models/core/common/Users";
import { ReviewViewModel } from "@/models/core/common/Reviews";
import router from "@/router";
import { DateTime } from "luxon";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Preview extends Vue {
    @Prop({ required: true }) review!: ReviewViewModel;
    @Prop({ required: true, default: false }) editable!: boolean;

    private edit(id) {
        this.$router.push({ name: "post-edit", params: { id: id } });
    }

    get prettyReviewDate() {
        return DateTime.fromISO(this.review.datePostedUTC.toString()).toLocaleString(DateTime.DATETIME_MED);
    }
}
</script>

<style lang="scss" scoped>
.rating {
    unicode-bidi: bidi-override;
    direction: ltr;
}

.rating > span {
    display: inline-block;
    position: relative;
    width: 1.1em;
}

.rating > span.granted ~ span:before {
    content: "\2605";
    position: absolute;
}

// .granted {
//     content: "\2604";
//     color: red;
//     position: absolute;
// }
</style>