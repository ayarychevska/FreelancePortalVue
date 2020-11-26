<template>
    <div class="container flex-center-vertically">
        <div class="row justify-content-center">

            <vk-card
                class="col-lg-7 uk-card-hover"
                padding="large"
            >
                <vk-card-title class="uk-margin-remove-bottom">Login</vk-card-title>
                <p class="uk-text-meta uk-margin-remove-top">
                    In case you dont have an account, <router-link
                        class="font-weight-bold"
                        :to="{ 'name': 'auth-registration' }"
                    >click here</router-link>
                </p>
                <hr>
                <form>
                    <fieldset class="uk-fieldset">

                        <div class="uk-margin">
                            <label for="login">Login</label>
                            <input
                                class="uk-input uk-form-small"
                                type="text"
                            >
                        </div>

                        <div class="uk-margin">
                            <label for="name">Password</label>
                            <input
                                class="uk-input uk-form-small"
                                type="password"
                            >
                        </div>

                        <div class="bg" />
                    </fieldset>
                </form>
                <vk-button class="uk-width-1-1 uk-button-secondary">Login</vk-button>
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
    background: url("~@/assets/images/background_login.jpg") no-repeat;
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

.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
</style>