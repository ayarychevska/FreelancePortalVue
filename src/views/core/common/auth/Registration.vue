<template>
    <div class="container flex-center-vertically">
        <div class="row justify-content-end">
            <vk-card
                class="col-lg-7 uk-card-hover"
                padding="large"
            >
                <vk-card-title class="uk-margin-remove-bottom">Registration</vk-card-title>
                <p class="uk-text-meta uk-margin-remove-top">
                    In case you already have an account,
                    <router-link
                        class="font-weight-bold"
                        :to="{ name: 'auth-login' }"
                    >click here</router-link>
                </p>
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
                                    class="uk-input uk-form-small"
                                    type="text"
                                    v-model="user.login"
                                />
                            </div>

                            <div class="col-md-6">
                                <label for="name">Email</label>
                                <input
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
                                <label for="name">Password</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="password"
                                    v-model="user.password"
                                />
                            </div>

                            <div class="ml-4">
                                <label for="name">Repeat password</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="password"
                                    v-model="user.repeatPassword"
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

                            <div class="ml-4">
                                <label for="name">Choose one:</label>
                                <div
                                    v-for="option in roles"
                                    :key="option.value"
                                >
                                    <label>
                                        <input
                                            :value="option.value"
                                            class="uk-radio"
                                            type="radio"
                                            name="user-role"
                                            v-model="user.role"
                                        />
                                        {{ option.title }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div v-show="user.role == 1">
                            <div class="uk-margin">
                                <label for="Name">Name</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="text"
                                    v-model="user.name"
                                />
                            </div>
                        </div>

                        <div class="bg" />
                    </fieldset>
                </form>
                <vk-button
                    class="uk-width-1-1 uk-button-secondary"
                    @click="registration"
                >Create an account</vk-button>
            </vk-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserCreateModel } from "@/models/core/common/Users.ts";
import { DateTime } from "luxon";

@Component({})
export default class Registration extends Vue {
    private roles: any[] = [
        { title: "Student", value: 0 },
        { title: "Teacher", value: 1 }
    ];

    private user: UserCreateModel = {
        name: "",
        login: "",
        email: "",
        userType: "",
        dateOfBirth: null,
        gender: "",
        description: "",
        password: "",
        repeatPassword: "",
        role: null
    };

    private day: number = null;
    private month: number = null;
    private year: number = null;

    async registration(): Promise<void> {
        const stringDate = `${this.year}-${this.month > 9 ? this.month : '0' + this.month}${this.day}`;
        this.user.dateOfBirth = DateTime.fromISO(stringDate);

        try {

            await this.$axios.post("/application-users", this.user);
            await this.$store.dispatch("auth/login", { login: this.user.login, password: this.user.password });

            this.$swal.fire({
                icon: 'success',
                title: 'Registration complete',
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

            this.$router.push({ name: "dashboard" });
        }
        catch {
            this.$swal.fire({
                icon: 'error',
                title: 'I catch some errors here',
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

.bg {
    background: url("~@/assets/images/background_registration.jpg") no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200px;
    height: auto;
    z-index: -2;
}

label {
    font-size: 13px;
}
</style>
