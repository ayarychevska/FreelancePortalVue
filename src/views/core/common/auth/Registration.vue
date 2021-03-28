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
                        <div class="uk-margin-remove uk-inline uk-width-1-1">
                            <span class="uk-form-icon">
                                <vk-icon icon="user"></vk-icon>
                            </span>
                            <input
                                class="uk-input"
                                type="text"
                                placeholder="User name"
                                v-model="user.name"
                            />
                        </div>

                        <div class="uk-margin row">
                            <div class="col-md-6">
                                <div class="uk-margin-remove uk-inline uk-width-1-1">
                                    <span class="uk-form-icon">
                                        <vk-icon icon="hashtag"></vk-icon>
                                    </span>
                                    <input
                                        class="uk-input"
                                        type="text"
                                        placeholder="Login"
                                        v-model="user.login"
                                    />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="uk-margin-remove uk-inline uk-width-1-1">
                                    <span class="uk-form-icon">
                                        <vk-icon icon="mail"></vk-icon>
                                    </span>
                                    <input
                                        class="uk-input"
                                        type="text"
                                        placeholder="Email"
                                        v-model="user.email"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="display-flex-equal-pieces uk-margin">
                            <div>
                                <input
                                    class="uk-input"
                                    type="number"
                                    placeholder="Day"
                                    v-model="day"
                                />
                            </div>
                            <div class="ml-4">
                                <select
                                    class="uk-select"
                                    placeholder="Month"
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
                                <input
                                    class="uk-input"
                                    type="numer"
                                    placeholder="Year"
                                    v-model="year"
                                />
                            </div>
                        </div>

                        <div class="display-flex-equal-pieces uk-margin">
                            <div>
                                <div class="uk-margin-remove uk-inline uk-width-1-1">
                                    <span class="uk-form-icon">
                                        <vk-icon icon="lock"></vk-icon>
                                    </span>
                                    <input
                                        class="uk-input"
                                        type="password"
                                        placeholder="Password"
                                        v-model="user.password"
                                    />
                                </div>
                            </div>

                            <div class="ml-4">
                                <div class="uk-margin-remove uk-inline uk-width-1-1">
                                    <span class="uk-form-icon">
                                        <vk-icon icon="lock"></vk-icon>
                                    </span>
                                    <input
                                        class="uk-input"
                                        type="password"
                                        placeholder="Repeat password"
                                        v-model="user.repeatPassword"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="display-flex-equal-pieces uk-margin">
                            <div>
                                <label for="name">Gender</label>
                                <select
                                    placeholder="Gender"
                                    class="uk-select"
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
                                            v-model="user.userType"
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
import { UserCreateModel } from "@/models/core/common/Users";
import { DateTime } from "luxon";

@Component({})
export default class Registration extends Vue {
    private roles: any[] = [
        { title: "Student", value: 'student' },
        { title: "Teacher", value: 'teacher' }
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
        subjectsIds: [],
        avatar: null
    };

    private day: number = null;
    private month: number = null;
    private year: number = null;

    async registration(): Promise<void> {
        const stringDate = `${this.year}-${this.month > 9 ? this.month : '0' + this.month}${this.day}`;
        this.user.dateOfBirth = DateTime.fromISO(stringDate);

        try {
            (async () => {
                await this.$axios.post("/application-users", this.user).then(() => {
                    this.$store.dispatch("auth/login", { login: this.user.login, password: this.user.password });
                })
            })();

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
