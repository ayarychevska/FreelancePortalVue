<template>
    <vk-card
        class="uk-card-hover"
        padding="large"
    >
        <vk-card-title class="uk-margin-remove-bottom">Registration</vk-card-title>

        <hr />

    </vk-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserCreateModel } from "@/models/core/common/Users.ts";
import { DateTime } from "luxon";

@Component({})
export default class UserSubjects extends Vue {
    private roles: any[] = [
        { title: "Student", value: 0 },
        { title: "Teacher", value: 1 }
    ];

    private user: UserCreateModel = {
        name: "",
        login: "",
        email: "",
        userType: "",
        dateOfBirth: DateTime.local(),
        gender: "",
        description: "",
        password: "",
        repeatPassword: "",
        role: null
    };

    private day: number = null;
    private month: string = null;
    private year: number = null;

    async registration(): Promise<void> {
        await this.$axios.post("/application-users", this.user);

        await this.$store.dispatch("auth/login", { login: this.user.login, password: this.user.password });
        console.log(this.$store.state.auth.user);
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
