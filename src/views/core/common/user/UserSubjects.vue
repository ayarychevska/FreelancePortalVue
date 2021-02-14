<template>
    <vk-card
        class="uk-card-hover"
        padding="large"
    >
        <vk-card-title class="uk-margin-remove-bottom">Teacher's skills</vk-card-title>
        <hr />

        <div class="uk-margin">
            <label for="name">Subjects</label>
            <v-select
                multiple
                label="title"
                :options="subjects"
                :reduce="x => x.id"
                v-model="user.subjectsIds"
            ></v-select>
        </div>

        <label> Tell us about yourself </label>
        <div class="uk-margin">
            <editor
                :api-key="tinyMceApiKey"
                v-model="user.description"
                :init="{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }"
            />
        </div>
        <vk-button
            class="uk-width-1-1 uk-button-secondary"
            @click="save"
        >Save</vk-button>
    </vk-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserCreateModel } from "@/models/core/common/Users.ts";
import { SubjectsTitles } from '@/models/core/teacher/Subjects';
import { DateTime } from "luxon";

@Component({})
export default class UserSubjects extends Vue {
    private roles: any[] = [
        { title: "Student", value: 0 },
        { title: "Teacher", value: 1 }
    ];
    private subjects: SubjectsTitles[] = [];

    private get tinyMceApiKey(): string {
        return process.env.VUE_APP_TINY_MCE_API_KEY;
    }

    async created(): Promise<void> {
        await this.loadData();
    }

    private user: UserCreateModel = {
        name: "",
        login: "",
        email: "",
        userType: "",
        dateOfBirth: DateTime.local(),
        gender: "",
        description: "",
        subjectsIds: [],
        password: "",
        repeatPassword: ""
    };

    private day: number = null;
    private month: string = null;
    private year: number = null;

    async save(): Promise<void> {
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
        this.subjects = (await this.$axios.get("/subjects/list")).data;
        const response: any = await this.$axios.get("/application-users/" + this.$store.state.auth.user.id + "/raw");
        this.user = response.data;
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
