<template>
    <vk-card
        class="uk-card-hover"
        padding="large"
    >
        <vk-card-title class="uk-margin-remove-bottom">Main information</vk-card-title>
        <hr />
        <form>
            <div class="row">
                <!-- Avatar -->
                <div class="col-4">
                    <b-avatar
                        :src="avatar"
                        id="Avatar"
                        size="12rem"
                        class="m-3"
                    ></b-avatar>

                    <b-form-file
                        v-model="newAvatar"
                        :state="Boolean(newAvatar)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>

                    <div class="mt-3">Selected file: {{ newAvatar ? newAvatar.name : '' }}</div>

                    <vk-button
                        class="uk-width-1-1 uk-button-default"
                        @click="submitFile"
                    >Save avatar</vk-button>
                </div>

                <!-- Other settings -->
                <div class="col-8">
                    <fieldset class="uk-fieldset">

                        <div class="uk-margin row">
                            <div class="col-md-6">
                                <label for="Login">Login</label>
                                <input
                                    disabled
                                    class="uk-input uk-form-small"
                                    type="text"
                                    v-model="user.login"
                                />
                            </div>

                            <div class="col-md-6">
                                <label for="name">Email</label>
                                <input
                                    disabled
                                    class="uk-input uk-form-small"
                                    type="text"
                                    v-model="user.email"
                                />
                            </div>
                        </div>

                        <div class="uk-margin row">
                            <div class="col-md-6">
                                <label for="Name">Name</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="text"
                                    v-model="user.name"
                                />
                            </div>

                            <div class="col-md-6">
                                <div class="display-flex-equal-pieces uk-margin">
                                    <div>
                                        <label for="name">Gender</label>
                                        <select
                                            class="uk-select uk-form-small"
                                            v-model="user.gender"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="display-flex-equal-pieces uk-margin">
                            <div>
                                <label for="name">Day</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="number"
                                    v-model="day"
                                />
                            </div>
                            <div class="ml-4">
                                <label for="name">Month</label>
                                <select
                                    class="uk-select uk-form-small"
                                    v-model="month"
                                >
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div class="ml-4">
                                <label for="name">Year</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="numer"
                                    v-model="year"
                                />
                            </div>
                        </div>

                    </fieldset>
                    <!-- Save button -->
                    <vk-button
                        class="uk-width-1-1 uk-button-secondary mt-5"
                        @click="save"
                    >Save changes</vk-button>
                </div>

                <!-- <div class="mb-3">
                    <b-form-file
                        v-model="avatar"
                        :state="Boolean(avatar)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-2">Selected file: {{ avatar ? avatar.name : '' }}</div>

                    <b-button @click="saveAvatar">
                        Save profile picture
                    </b-button>
                </div> -->

            </div>
        </form>

    </vk-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserCreateModel } from "@/models/core/common/Users.ts";
import { DateTime } from "luxon";

@Component({})
export default class MainInfo extends Vue {

    private newAvatar = null;

    private user: UserCreateModel = {
        name: "",
        login: "",
        email: "",
        userType: "",
        dateOfBirth: DateTime.local(),
        gender: "",
        description: "",
        subjectsIds: [],
        password: "",
        repeatPassword: "",
        avatar: null
    };

    private avatarFileName: any;

    private day: number = null;
    private month: number = null;
    private year: number = null;

    async created(): Promise<void> {
        await this.loadData();
    }

    async save(): Promise<void> {
        const stringDate = `${this.year}-${this.month > 9 ? this.month : '0' + this.month}${this.day}`;
        this.user.dateOfBirth = DateTime.fromISO(stringDate);

        try {
            await this.$axios.put("/application-users", this.user);
            await this.loadData();

            this.$swal.fire({
                icon: 'success',
                title: 'Saved',
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

    async loadData(): Promise<void> {
        const response: any = await this.$axios.get("/application-users/" + this.$store.state.auth.user.id + '/raw');
        this.user = response.data;
        const date: DateTime = DateTime.fromISO(this.user.dateOfBirth.toString());
        this.day = date.day;
        this.month = date.month;
        this.year = date.year;
    }

    async submitFile() {
        const formData = new FormData();
        formData.append('avatar', this.newAvatar);

        this.avatarFileName = await this.$axios.post("/application-users/" + this.$store.state.auth.user.id + '/avatar',
            formData, { headers: { 'Content-Type': 'multipart/form-data' } });

        await this.loadData();
    }

    get avatar() {
        return this.user.avatar ? process.env.VUE_APP_API_URL + "/application-users/" + this.user.avatar + "/avatar" : '';
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

label {
    font-size: 13px;
}

.avatar-user-unknown {
    background-image: url("~@/assets/images/user_unknown.jpg") no-repeat;
}
</style>
