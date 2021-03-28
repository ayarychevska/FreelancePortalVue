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
                    <fieldset class="uk-fieldset uk-width-1-1">
                        <div class="uk-margin-remove uk-inline uk-width-1-1">
                            <span class="uk-form-icon">
                                <vk-icon icon="user"></vk-icon>
                            </span>
                            <input
                                class="uk-input uk-width-1-1"
                                :class="user.login == '' ? 'uk-form-danger' : ''"
                                type="text"
                                v-model="user.login"
                            />
                        </div>

                        <div class="uk-margin uk-inline uk-width-1-1">
                            <span class="uk-form-icon">
                                <vk-icon icon="lock"></vk-icon>
                            </span>
                            <input
                                class="uk-input uk-width-1-1"
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
    private connection;

    private user: UserLoginModel = {
        login: "sherlock",
        password: "sherlock"
    };

    async login(): Promise<void> {
        await this.$store.dispatch("auth/login", this.user);

        await this.$store.dispatch("ws/connect");
        //await this.$store.dispatch("ws/sendMsg", { text: 'privet', to: '9a4fde7f-9cc4-4bb1-bb75-4877ae43421d' });

        if (this.$store.state.auth.status) {
            this.$swal.fire({
                icon: 'success',
                title: 'Signed in successfully',
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
        else {
            this.$swal.fire({
                icon: 'error',
                title: 'Wrong login or password',
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
