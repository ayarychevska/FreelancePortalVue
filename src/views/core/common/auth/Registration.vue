<template>
    <div>
        <div uk-lightbox>
            <a
                class="uk-button uk-button-default"
                href="https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w"
            >Open Lightbox</a>
        </div>

        <h2>Register</h2>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    v-model="user.name"
                    v-validate="'required'"
                    name="name"
                    class="form-control"
                />
            </div>
            <div class="form-group">
                <label for="login">Login</label>
                <input
                    type="text"
                    v-model="user.login"
                    v-validate="'required'"
                    name="login"
                    class="form-control"
                />
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input
                    type="text"
                    v-model="user.email"
                    v-validate="'required'"
                    name="email"
                    class="form-control"
                />
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    v-model="user.password"
                    v-validate="{ required: true, min: 6 }"
                    name="password"
                    class="form-control"
                />
            </div>
        </form>
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