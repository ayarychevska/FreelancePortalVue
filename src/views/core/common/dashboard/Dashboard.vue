<template>
    <div class="mx-5">
        <h1 class="mt-3"> Welcome to Study platform </h1>

        <div class="row">
            <div class="col-md-10 pr-5">
                <div class="row mt-4">
                    <div
                        class="col-lg-4 col-md-6"
                        v-for="post in myPosts"
                        :key="post.id"
                    >
                        <post-preview
                            class="mb-3"
                            :post="post"
                            :editable="false"
                        />
                    </div>
                </div>
            </div>

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
import { Component, Vue } from "vue-property-decorator";
import PostPreview from '@/views/core/common/post/Preview.vue';
import { DateTime } from "luxon";

@Component({ components: { PostPreview } })
export default class Dashboard extends Vue {
    private myPosts: PostListViewModel[] = [];

    async created(): Promise<void> {
        const response = await this.$axios.get("/posts/list");
        this.myPosts = response.data;
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

