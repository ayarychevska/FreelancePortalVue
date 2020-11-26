<template>
    <div class="container flex-center-vertically">
        <div class="row justify-content-end">

            <vk-card
                class="col-lg-7 uk-card-hover"
                padding="large"
            >
                <vk-card-title class="uk-margin-remove-bottom">Registration</vk-card-title>
                <p class="uk-text-meta uk-margin-remove-top">
                    In case you already have an account, <router-link
                        class="font-weight-bold"
                        :to="{ 'name': 'auth-login' }"
                    >click here</router-link>
                </p>
                <hr>
                <form>
                    <fieldset class="uk-fieldset">

                        <div class="uk-margin">
                            <label for="name">Name</label>
                            <input
                                class="uk-input uk-form-small"
                                type="text"
                            >
                        </div>

                        <div class="birth-date uk-margin">
                            <div>
                                <label for="name">Login</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="text"
                                >
                            </div>

                            <div class="ml-4">
                                <label for="name">Email</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="text"
                                >
                            </div>
                        </div>

                        <div class="birth-date uk-margin">
                            <div>
                                <label for="name">Day</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="number"
                                >
                            </div>
                            <div class="ml-4">
                                <label for="name">Month</label>
                                <select class="uk-select uk-form-small">
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </select>
                            </div>
                            <div class="ml-4">
                                <label for="name">Year</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="numer"
                                >
                            </div>
                        </div>

                        <div class="birth-date uk-margin">
                            <div>
                                <label for="name">Password</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="password"
                                >
                            </div>

                            <div class="ml-4">
                                <label for="name">Repeat password</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="password"
                                >
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label for="name">Gender</label>
                            <select class="uk-select uk-form-small">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>

                        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label><input
                                    class="uk-radio"
                                    type="radio"
                                    name="radio2"
                                    checked
                                > Student</label>
                            <label><input
                                    class="uk-radio"
                                    type="radio"
                                    name="radio2"
                                > Teacher</label>
                        </div>

                        <div class="bg" />
                    </fieldset>
                </form>
                <vk-button class="uk-width-1-1 uk-button-secondary">Create an account</vk-button>
            </vk-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserCreateModel } from "@/models/core/common/Users.ts"
import { DateTime } from 'luxon';

@Component({})
export default class Registration extends Vue {

    private user: UserCreateModel = {
        name: '',
        login: '',
        email: '',
        userType: '',
        dateOfBirth: DateTime.local(),
        gender: '',
        description: '',
        password: '',
        repeatPassword: ''
    };
}
</script>

<style lang="scss" scoped>
.birth-date {
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