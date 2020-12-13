<template>
    <vk-card
        class="uk-card-hover"
        padding="large"
    >
        <vk-card-title class="uk-margin-remove-bottom">Change password</vk-card-title>
        <hr />
        <form>
            <fieldset class="uk-fieldset">
                <div class="uk-margin">
                    <div>
                        <label for="name">Current password</label>
                        <input
                            class="uk-input uk-form-small"
                            type="password"
                            v-model="changePasswordModel.previousPassword"
                        />
                    </div>
                </div>

                <div class="display-flex-equal-pieces uk-margin">
                    <div>
                        <label for="name">New password</label>
                        <input
                            class="uk-input uk-form-small"
                            type="password"
                            v-model="changePasswordModel.password"
                        />
                    </div>

                    <div class="ml-4">
                        <label for="name">Repeat password</label>
                        <input
                            class="uk-input uk-form-small"
                            type="password"
                            v-model="changePasswordModel.repeatedPassword"
                        />
                    </div>
                </div>

            </fieldset>
        </form>
        <vk-button
            class="uk-width-1-1 uk-button-secondary"
            @click="changePassword"
        >Save changes</vk-button>
    </vk-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ChangePasswordModel } from "@/models/core/common/Users";
import { DateTime } from "luxon";

@Component({})
export default class Security extends Vue {

    private changePasswordModel: ChangePasswordModel = {
        id: "",
        previousPassword: "",
        password: "",
        repeatedPassword: ""
    };

    async changePassword(): Promise<void> {

        try {
            this.changePasswordModel.id = this.$store.state.auth.user.id;
            await this.$axios.put("/application-users/password", this.changePasswordModel);

            this.$swal.fire({
                icon: 'success',
                title: 'Password succesfully changed',
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

label {
    font-size: 13px;
}
</style>
