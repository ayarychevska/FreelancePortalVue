<template>
    <vk-card
        class="uk-card-hover"
        padding="large"
    >
        <vk-card-title class="uk-margin-remove-bottom">Main information</vk-card-title>
        <hr />
        <form>
            <fieldset class="uk-fieldset">
                <div class="uk-margin">
                    <label for="Name">Name</label>
                    <input
                        class="uk-input uk-form-small"
                        type="text"
                        v-model="user.name"
                    />
                </div>

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
            </fieldset>
        </form>
        <vk-button
            class="uk-width-1-1 uk-button-secondary"
            @click="save"
        >Save changes</vk-button>
    </vk-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserCreateModel } from "@/models/core/common/Users.ts";
import { DateTime } from "luxon";

@Component({})
export default class MainInfo extends Vue {

    private user: UserCreateModel = {
        name: "",
        login: "",
        email: "",
        userType: "",
        dateOfBirth: DateTime.local(),
        gender: "",
        description: "",
        role: null,
        subjectsIds: [],
        password: "",
        repeatPassword: ""
    };

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
</style>
