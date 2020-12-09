<template>
    <div class="container flex-center-vertically">
        <div class="row justify-content-center">
            <vk-card
                class="col-lg-7 uk-card-hover"
                padding="large"
            >
                <vk-card-title class="uk-margin-remove-bottom">Login</vk-card-title>
                <p class="uk-text-meta uk-margin-remove-top">
                    In case you dont have an account,
                    <router-link
                        class="font-weight-bold"
                        :to="{ name: 'auth-registration' }"
                    >click here</router-link>
                </p>
                <hr />
                <form>
                    <fieldset class="uk-fieldset">
                        <div class="uk-margin">
                            <label for="login">Login</label>
                            <input
                                class="uk-input uk-form-small"
                                type="text"
                                v-model="user.login"
                            />
                        </div>

                        <div class="uk-margin">
                            <label for="password">Password</label>
                            <input
                                class="uk-input uk-form-small"
                                type="password"
                                v-model="user.password"
                            />
                        </div>

                        <div class="bg" />
                    </fieldset>
                </form>
                <vk-button
                    class="uk-width-1-1 uk-button-secondary"
                    @click="login"
                >Login</vk-button>
            </vk-card>
        </div>
    </div>
</template>

<script lang="ts">
import { UserLoginModel } from "@/models/core/common/Users";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Login extends Vue {
    private user: UserLoginModel = {
        login: "Alevtyna3",
        password: "password1"
    };

    async login(): Promise<void> {
        await this.$store.dispatch("auth/login", this.user);
        console.log(this.$store.state.auth.user);

        /* const qwe1 = await this.$axios.get("/applicationusers/list");
        console.log(qwe1); */
    }
}
</script>

<style lang="scss" scoped>
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
</style>
