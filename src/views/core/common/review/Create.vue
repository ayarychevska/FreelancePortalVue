<template>
    <vk-card>
        <div
            slot="header"
            class="uk-text-left"
        >
            <vk-card-title>
                Add review
            </vk-card-title>
        </div>

        <vk-label slot="badge">
            <div
                class="rating"
                style="font-size: 1.3em;"
            >
                <span
                    :class="{ 'granted' : review.rate == 5 }"
                    @click="review.rate = 5"
                >☆</span>
                <span
                    :class="{ 'granted' : review.rate == 4 }"
                    @click="review.rate = 4"
                >☆</span>
                <span
                    :class="{ 'granted' : review.rate == 3 }"
                    @click="review.rate = 3"
                >☆</span>
                <span
                    :class="{ 'granted' : review.rate == 2 }"
                    @click="review.rate = 2"
                >☆</span>
                <span
                    :class="{ 'granted' : review.rate == 1 }"
                    @click="review.rate = 1"
                >☆</span>
            </div>
        </vk-label>

        <div class="uk-text-left pb-3">
            <textarea
                class="uk-textarea"
                v-model="review.text"
            ></textarea>
        </div>

        <vk-button
            class="uk-width-1-1 uk-button-secondary"
            @click="addreview"
        >Add review</vk-button>
    </vk-card>
</template>

<script lang="ts">
import router from "@/router";
import { DateTime } from "luxon";
import { ReviewCreateModel } from "@/models/core/common/Reviews";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Create extends Vue {
    @Prop({ required: true, default: false }) editable!: boolean;
    @Prop({ required: true }) reviewingUserId!: string;
    private review: ReviewCreateModel =
        {
            id: 0,
            datePostedUTC: null,
            text: '',
            rate: 0,
            reviewerId: '',
            reviewingUserId: ''
        }

    async addreview(): Promise<void> {
        this.review.reviewerId = this.$store.state.auth.user.id;
        this.review.reviewingUserId = this.reviewingUserId;
        try {
            await this.$axios.post("/reviews", this.review);

            this.$swal.fire({
                icon: 'success',
                title: 'You posted the review!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            });

            this.$emit('update-reviews');
        }
        catch {
            this.$swal.fire({
                icon: 'error',
                title: 'You did not posted the review!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.rating {
    unicode-bidi: bidi-override;
    direction: rtl;
}
.rating > span {
    display: inline-block;
    position: relative;
    width: 1.1em;
}

.rating > span:hover:before,
.rating > span.granted ~ span:before,
.rating > span:hover ~ span:before {
    content: "\2605";
    position: absolute;
}
</style>