<template>
    <div class="container">
        <vk-card
            class="uk-card-hover"
            padding="small"
        >
            <div class="row">
                <div class="col-5">
                    <img
                        src="@/assets/images/avatar.jpg"
                        class="avatar uk-center uk-border-circle"
                    >
                    <h2 class="mt-3">{{ user.name }}</h2>
                    <hr>

                    <div class="uk-text-left ml-5 info">
                        <div class="text-capitalize mb-2">
                            <vk-icon
                                icon="social"
                                class="mr-2"
                            ></vk-icon> {{ user.userType }}
                        </div>
                        <div
                            type="email"
                            class="mb-2"
                        >
                            <vk-icon
                                icon="mail"
                                class="mr-2"
                            ></vk-icon> {{ user.email }}
                        </div>
                        <div class="mb-2">
                            <vk-icon
                                icon="calendar"
                                class="mr-2"
                            ></vk-icon> {{ prettyDateOfBirthDate }}
                        </div>
                        <div class="text-capitalize mb-2">
                            <vk-icon
                                icon="user"
                                class="mr-2"
                            ></vk-icon> {{ user.gender }}
                        </div>
                        <span style="font-size: 12px"><b> Subjects:</b></span><br>
                        <div>
                            {{ prettyListOfUserSubjects }}
                        </div>
                        <span style="font-size: 12px"><b> About me:</b></span><br>
                        <span v-html="user.description"></span>

                        <vk-button
                            v-if="$store.state.auth.user.userType == 'teacher' && $store.state.auth.user.id != userId"
                            class="uk-width-1-1 uk-button-secondary mt-3"
                            @click="addAppointment(userId, user.name)"
                        >Make an appointment with user</vk-button>
                    </div>
                </div>

                <!-- Create review -->
                <div class="col-7">
                    <create-review
                        v-if="userId != $store.state.auth.user.id"
                        class="mb-3"
                        :reviewingUserId='userId'
                        :editable="false"
                        @update-reviews="loadReviews()"
                    />

                    <!-- Reviews list -->
                    <div v-if="data.reviews.length > 0">
                        <template>
                            <h3>Reviews</h3>
                            <div
                                v-for="review in data.reviews"
                                :key="review.id"
                            >
                                <review-preview
                                    class="mb-3"
                                    :review="review"
                                    :editable="false"
                                />
                            </div>
                        </template>

                        <!-- Pagination -->
                        <div class="overflow-auto mt-5">
                            <b-pagination
                                style="justify-content: center;"
                                v-model="pager.page"
                                :total-rows="pager.total"
                                :per-page="pager.size"
                            ></b-pagination>
                        </div>
                    </div>

                    <p v-else> No reviews yet </p>
                </div>
            </div>
        </vk-card>
    </div>
</template>

<script lang="ts">
import { UserViewModel } from "@/models/core/common/Users";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DateTime } from "luxon";
import ReviewPreview from "@/views/core/common/review/View.vue"
import CreateReview from "@/views/core/common/review/Create.vue"
import { ReviewViewModel } from "@/models/core/common/Reviews";
import { Pager } from "@/models/core/common/Pager";
import { merge } from 'lodash';

@Component({ components: { ReviewPreview, CreateReview } })
export default class UserView extends Vue {
    private user: UserViewModel = {
        name: "",
        login: "",
        email: "",
        userType: "",
        dateOfBirth: null,
        gender: "",
        description: "",
        subjects: []
    }

    private pager: Pager = {
        page: 1,
        size: 3,
        total: 0
    };

    @Watch('userId')
    private async reloadData(): Promise<void> {
        await this.loadData();
    }

    //private reviews: ReviewViewModel[] = []

    private data =
        {
            reviews: [],
            pager: null
        };

    private get prettyListOfUserSubjects(): string {
        return this.capitalizeFirstLetter(this.user.subjects.map(x => x.title).join(', '));
    }

    private get userId(): string {
        return this.$route.params.id || "";
    }

    async created(): Promise<void> {
        await this.loadData();
    }

    async loadData(): Promise<void> {
        const response: any = await this.$axios.get("/application-users/" + this.userId);
        this.user = response.data;

        await this.loadReviews();
    }

    @Watch('pager.page')
    async loadReviews() {
        const loadReviews: any = await this.$axios.get("/reviews/user-reviews/" + this.userId, { params: this.pager });
        this.data = loadReviews.data;

        this.pager = this.data.pager;
    }

    get prettyDateOfBirthDate() {
        if (this.user.dateOfBirth)
            return DateTime.fromISO(this.user.dateOfBirth.toString()).toLocaleString(DateTime.DATE_FULL);
        else
            return '-';
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async addAppointment(studentId): Promise<void> {
        this.$router.push({ name: 'appointment-add', params: { studentId: this.userId, studentName: this.user.name } })
    }
}
</script>


<style lang="scss" scoped>
.display-flex-equal-pieces {
    display: flex;
    flex: 1 100%;
    div {
        flex: 1;
    }
}

.avatar {
    width: 30%;
}

.info {
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
