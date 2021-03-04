<template>
    <div class="mx-5">
        <h1 class="mt-3"> Welcome to Study platform </h1>

        <div class="row">
            <!-- Filters -->
            <div class="col-md-2 uk-text-left pr-5">
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

            <!-- Posts -->
            <div class="col-md-8 pr-5">
                <div
                    class="row mt-4"
                    style="height: 95%; min-height: 595px"
                >
                    <div
                        class="col-lg-4 col-md-6"
                        v-for="post in data.viewModels"
                        :key="post.id"
                    >
                        <post-preview
                            class="mb-3"
                            :post="post"
                            :editable="false"
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
                        aria-controls="appointments-list"
                    ></b-pagination>
                </div>
            </div>

            <!-- User Info and links -->
            <div class="col-md-2">
                <img
                    src="@/assets/images/avatar.jpg"
                    class="avatar uk-center uk-border-circle"
                >
                <h2 class="mt-3">{{ $store.state.auth.user.userName }}</h2>
                <hr>
                <div class="uk-text-center">
                    <vk-button-link
                        class="my-3"
                        @click="$router.push({ name: 'user-view', params: { id: $store.state.auth.user.id }})"
                        type="text"
                    >
                        <vk-icon
                            icon="user"
                            class="mr-2"
                        ></vk-icon>Profile
                    </vk-button-link>
                    <br>
                    <vk-button-link
                        class="my-3"
                        type="text"
                        @click="$router.push({ name: 'my-posts'})"
                    >
                        <vk-icon
                            icon="thumbnails"
                            class="mr-2"
                        ></vk-icon>My posts
                    </vk-button-link>
                    <br>
                    <vk-button-link
                        class="my-3"
                        type="text"
                        @click="$router.push({ name: 'calendar'})"
                    >
                        <vk-icon
                            icon="calendar"
                            class="mr-2"
                        ></vk-icon>Calendar
                    </vk-button-link>
                    <br>
                    <vk-button-link
                        class="my-3"
                        type="text"
                        @click="$router.push({ name: 'appointment'})"
                    >
                        <vk-icon
                            icon="clock"
                            class="mr-2"
                        ></vk-icon>Appointments
                    </vk-button-link>
                    <br>
                    <vk-button-link
                        class="my-3"
                        @click="$router.push({ name: 'chat'})"
                        type="text"
                    >
                        <vk-icon
                            icon="commenting"
                            class="mr-2"
                        ></vk-icon>Messages
                    </vk-button-link>
                    <br>
                    <vk-button-link
                        class="my-3"
                        @click="$router.push({ name: 'user-profile'})"
                        type="text"
                    >
                        <vk-icon
                            icon="cog"
                            class="mr-2"
                        ></vk-icon>Settings
                    </vk-button-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PostListViewModel } from "@/models/core/teacher/Posts";
import { Component, Vue, Watch } from "vue-property-decorator";
import PostPreview from '@/views/core/common/post/Preview.vue';
import { PostsFilterModel } from "@/models/core/teacher/Posts";
import { Pager } from "@/models/core/common/Pager";
import { SubjectsTitles } from "@/models/core/teacher/Subjects";
import { DateTime } from "luxon";
import { merge } from 'lodash';

@Component({ components: { PostPreview } })
export default class Dashboard extends Vue {
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
        await this.loadData();

        // await this.$store.dispatch("ws/sendMsg", { text: 'dashboard has been loaded', to: '9a4fde7f-9cc4-4bb1-bb75-4877ae43421d' });
        // await this.$store.dispatch("ws/sendMsg", { text: 'test 1', to: '9a4fde7f-9cc4-4bb1-bb75-4877ae43421d' });

        // await this.$store.dispatch("ws/sendMsg", { text: 'Another test message', to: '8ea39a28-cd2a-4f08-b6fa-c7e796def4c6' });
        // await this.$store.dispatch("ws/sendMsg", { text: 'Newest 2', to: '8ea39a28-cd2a-4f08-b6fa-c7e796def4c6' });
        // await this.$store.dispatch("ws/sendMsg", { text: 'And another one', to: '10efc104-8fe7-4407-bcc8-8bf9fb86eb2d' });
        // await this.$store.dispatch("ws/sendMsg", { text: 'Newest 3', to: '10efc104-8fe7-4407-bcc8-8bf9fb86eb2d' });
    }

    async loadData() {
        this.subjects = (await this.$axios.get("/subjects/list")).data;

        await this.filterData();
    }

    eraseDate() {
        this.range.start = null;
        this.range.end = null;
    }

    @Watch('pager.page')
    async filterData(): Promise<void> {
        this.filter.dateFromUTC = this.range.start;
        this.filter.dateUntilUTC = this.range.end;
        const response = await this.$axios.get("/posts/list",
            { params: merge(this.filter, this.pager) });

        this.data = response.data;
        this.pager = this.data.pager;
    }
}
</script>

<style lang="scss" scoped>
.separator {
    border-left: solid 1px lightgray;
}

.avatar {
    width: 60%;
}
</style>

