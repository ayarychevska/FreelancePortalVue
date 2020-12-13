<template>
    <vk-card
        class="uk-card-hover"
        padding="large"
    >
        <vk-card-title class="uk-margin-remove-bottom">Create new post</vk-card-title>
        <hr />
        <form>
            <fieldset class="uk-fieldset">
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

                <div class="uk-margin">
                    <div>
                        <label for="name">Subject</label>
                        <v-select
                            label="title"
                            :options="subjects"
                            :reduce="x => x.id"
                            v-model="post.subjectId"
                        ></v-select>
                    </div>
                </div>
            </fieldset>
        </form>
        <vk-button
            class="uk-width-1-1 uk-button-secondary"
            @click="add"
        >Add</vk-button>
    </vk-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PostCreateModel } from '@/models/core/teacher/Posts';
import { SubjectsTitles } from '@/models/core/teacher/Subjects'
import { DateTime } from "luxon";
import Editor from '@tinymce/tinymce-vue'
import VueSelect from 'vue-select2';
//"vue-select": require("vue-select")


@Component({ components: { Editor, VueSelect } })
export default class PostCreation extends Vue {
    private subjects: SubjectsTitles[] = [];
    private post: PostCreateModel = {
        text: "",
        userId: "",
        status: 0,
        subjectId: null
    }
    private get tinyMceApiKey(): string {
        return process.env.VUE_APP_TINY_MCE_API_KEY;
    }

    async created(): Promise<void> {
        this.subjects = (await this.$axios.get("/subjects/list")).data;
        console.log(this.subjects);
    }

    async add(): Promise<void> {

        try {
            this.post.userId = this.$store.state.auth.user.id;
            await this.$axios.post("/posts", this.post);

            if (this.$store.state.auth.status) {
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
</style>
