<template>
    <div class="container">
        <vk-card
            class="uk-card-hover"
            padding="large"
        >
            <vk-card-title
                v-if="postId == 0"
                class="uk-margin-remove-bottom"
            >Create new post</vk-card-title>
            <vk-card-title
                v-else
                class="uk-margin-remove-bottom"
            >Edit</vk-card-title>

            <hr />
            <form>
                <fieldset class="uk-fieldset">

                    <div class="uk-margin row">
                        <div class="col-md-6">
                            <label for="title">Title</label>
                            <input
                                class="uk-input uk-form-small"
                                type="text"
                                v-model="post.title"
                            />
                        </div>

                        <div class="col-md-6">
                            <label for="name">Subject</label>
                            <v-select
                                label="title"
                                :options="subjects"
                                :reduce="x => x.id"
                                v-model="post.subjectId"
                            ></v-select>
                        </div>
                    </div>

                    <label> Description </label>
                    <div class="uk-margin">
                        <editor
                            :api-key="tinyMceApiKey"
                            v-model="post.text"
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
                </fieldset>
            </form>
            <vk-button
                v-if="postId == 0"
                class="uk-width-1-1 uk-button-secondary"
                @click="add"
            >Add</vk-button>
            <vk-button
                v-else
                class="uk-width-1-1 uk-button-secondary"
                @click="edit"
            >Edit</vk-button>
        </vk-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PostCreateModel } from '@/models/core/teacher/Posts';
import { SubjectsTitles } from '@/models/core/teacher/Subjects';
import { DateTime } from "luxon";

@Component({})
export default class PostCreation extends Vue {
    private subjects: SubjectsTitles[] = [];
    private post: PostCreateModel = {
        title: "",
        text: "",
        userId: "",
        status: 0,
        subjectId: null
    }
    private get tinyMceApiKey(): string {
        return process.env.VUE_APP_TINY_MCE_API_KEY;
    }

    private get postId(): number {
        return Number(this.$route.params.id) || 0;
    }

    async created(): Promise<void> {
        this.subjects = (await this.$axios.get("/subjects/list")).data;
        if (this.postId != 0)
            this.post = (await this.$axios.get("/posts/" + this.postId)).data;
    }

    async add(): Promise<void> {
        try {
            this.post.userId = this.$store.state.auth.user.id;
            await this.$axios.post("/posts", this.post);

            this.$swal.fire({
                icon: 'success',
                title: 'Added',
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

            this.$router.push({ name: "my-posts" });
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

    async edit(): Promise<void> {
        try {
            this.post = (await this.$axios.put("/posts", this.post)).data;

            this.$swal.fire({
                icon: 'success',
                title: 'Edited',
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
label {
    font-size: 13px;
}
s .display-flex-equal-pieces {
    display: flex;
    flex: 1 100%;
    div {
        flex: 1;
    }
}
</style>
