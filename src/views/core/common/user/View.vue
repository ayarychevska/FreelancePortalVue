<template>
    <div class="container">
        <vk-card
            class="uk-card-hover"
            padding="small"
        >
            <div class="row">
                <div class="col-6">
                    <b-avatar
                        :src="avatar"
                        id="Avatar"
                        size="12rem"
                        class="mt-2"
                    ></b-avatar>
                    <h2 class="mt-3">{{ user.name }} <vk-button
                            v-b-modal.modal-center
                            type="text"
                            v-if="$store.state.auth.user.id != userId"
                        >
                            <vk-icon
                                icon="commenting"
                                class="mr-2"
                            ></vk-icon>
                        </vk-button>
                        <vk-button
                            v-if="$store.state.auth.user.userType == 'teacher' && $store.state.auth.user.id != userId"
                            type="text"
                            @click="addAppointment(userId, user.name)"
                        >
                            <vk-icon
                                icon="clock"
                                class="mr-2"
                            ></vk-icon>
                        </vk-button>
                    </h2>
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
                        <div v-if="prettyListOfUserSubjects.length == 0">
                            No subjecct provided
                        </div>
                        <div v-else>
                            {{ prettyListOfUserSubjects }}
                        </div>
                        <span style="font-size: 12px"><b> About me:</b></span><br>
                        <span
                            v-if="user.description.length == 0"
                            style="font-size: 0.80em"
                        >No additional description provided</span>
                        <span
                            v-else
                            style="font-size: 0.80em"
                            v-html="user.description"
                        ></span>

                    </div>
                </div>

                <!-- Create review -->
                <div class="col-6">
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

        <!-- Message modal -->
        <b-modal
            id="modal-center"
            centered
            title="BootstrapVue"
        >
            <template #modal-title>
                Your message to {{ user.name }}
            </template>
            <b-textarea v-model="newMessage.text">
            </b-textarea>
            <template #modal-footer>
                <b-button
                    variant="light"
                    @click="$bvModal.hide('modal-center')"
                >Deny</b-button>
                <b-button
                    variant="info"
                    @click="send()"
                >Send</b-button>
            </template>
        </b-modal>
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
import { MessageCreateModel } from "@/models/core/common/Messages";

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
        subjects: [],
        avatar: null
    }

    private newMessage: MessageCreateModel = {
        text: "",
        status: 0,
        senderId: "",
        receiverId: ""
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
        //return "none"
        else
            return '-';
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async addAppointment(studentId): Promise<void> {
        this.$router.push({ name: 'appointment-add', params: { studentId: this.userId, studentName: this.user.name } })
    }

    get avatar() {
        return this.user.avatar ? process.env.VUE_APP_API_URL + "/application-users/" + this.user.avatar + "/avatar" : '';
    }

    async send() {
        try {
            await this.$store.dispatch("ws/sendMsg", { text: this.newMessage.text, to: this.userId });
            this.$bvModal.hide('modal-center');

            this.$swal.fire({
                icon: 'success',
                title: 'Message sended',
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
        catch {
            this.$swal.fire({
                icon: 'error',
                title: 'Something went wrong',
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
