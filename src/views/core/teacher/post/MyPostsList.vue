<template>
    <div class="mx-5">

        <div class="row ml-5 mr-5 mt-4">

            <!-- Filters -->
            <div
                class="col-md-3 uk-text-left col-lg-3"
                style="max-width: min-content;"
            >
                <h3> Filters </h3>

                <label for="name">Title</label>
                <input
                    label="title"
                    class="uk-input uk-form-small mb-2"
                    v-model="filter.title"
                >

                <label for="name">Subject</label>
                <v-select
                    label="title"
                    :options="subjects"
                    :reduce="x => x.id"
                    v-model="filter.subjectId"
                ></v-select>

                <v-date-picker
                    class="mt-2"
                    v-model="range"
                    is-range
                />

                <vk-button
                    class="uk-text-right"
                    type="link"
                    @click="eraseDate()"
                >Erase date</vk-button>

                <vk-button
                    class="uk-width-1-1 uk-button-secondary mt-3"
                    @click="filterData"
                >Filter</vk-button>
            </div>

            <!-- Add post Button -->
            <div class="col-md-6 uk-text-right col-lg-9">

                <vk-button
                    class="uk-button-primary"
                    @click="add"
                >Add post</vk-button>

                <!-- My Posts -->
                <div
                    class="row mt-4"
                    style="min-height: 600px"
                >
                    <div
                        class="col-md-12 col-lg-4"
                        v-for="post in data.viewModels"
                        :key="post.id"
                    >
                        <post-preview
                            class="mb-3"
                            :post="post"
                            :editable="true"
                        />
                    </div>
                </div>

                <!-- Pagination -->
                <div class="overflow-auto mt-5">
                    <b-pagination
                        style="justify-content: center;"
                        v-model="pager.page"
                        :total-rows="pager.total"
                        :per-page="pager.size"
                    ></b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import PostPreview from '@/views/core/common/post/Preview.vue'
import { Component, Vue, Watch } from "vue-property-decorator";
import { PostCreateModel, PostListViewModel, PostsFilterModel } from '@/models/core/teacher/Posts';
import { Pager } from "@/models/core/common/Pager";
import { SubjectsTitles } from "@/models/core/teacher/Subjects";
import { merge } from 'lodash';

@Component({ components: { PostPreview } })
export default class MyPostsList extends Vue {
    private pager: Pager = {
        page: 1,
        size: 6,
        total: 0
    };

    private range: any = {
        start: null,
        end: null
    }

    private subjects: SubjectsTitles[] = [];

    private data =
        {
            viewModels: [],
            pager: null
        };

    private filter: PostsFilterModel = {
        title: null,
        dateFromUTC: null,
        dateUntilUTC: null,
        teacherId: null,
        subjectId: null
    };

    async created(): Promise<void> {
        this.loadData();
    }

    @Watch('pager.page')
    async filterData(): Promise<void> {
        this.filter.dateFromUTC = this.range.start;
        this.filter.dateUntilUTC = this.range.end;
        const response = await this.$axios.get("/posts/my-posts", { params: merge({ userId: this.$store.state.auth.user.id }, this.filter, this.pager) });

        this.data = response.data;
        this.pager = this.data.pager;
    }

    async loadData() {
        this.subjects = (await this.$axios.get("/subjects/list")).data;

        await this.filterData();
    }

    async add(): Promise<void> {
        this.$router.push({ name: "post-add" });
    }

    eraseDate() {
        this.range.start = null;
        this.range.end = null;
    }
}
</script>

<style lang="scss" scoped>
label {
    font-size: 13px;
}
</style>
