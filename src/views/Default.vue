<template>
    <div id="app">
        <vk-navbar>
            <vk-navbar-nav slot="left">
                <vk-navbar-logo>Logo</vk-navbar-logo>

                <vk-navbar-nav>
                    <vk-navbar-nav-item
                        icon="home"
                        title="Dashboard"
                        @click="$router.push({ name: 'dashboard' })"
                    >
                    </vk-navbar-nav-item>
                </vk-navbar-nav>

                <vk-navbar-nav>
                    <vk-navbar-nav-item
                        icon="thumbnails"
                        title="My posts"
                        @click="$router.push({ name: 'my-posts' })"
                    >
                    </vk-navbar-nav-item>
                </vk-navbar-nav>

                <vk-navbar-item>
                    <div>Some <a>Link</a></div>
                </vk-navbar-item>
            </vk-navbar-nav>

            <vk-navbar-nav slot="right">
                <vk-icon
                    class="pr-0 uk-navbar-item"
                    icon="user"
                ></vk-icon>
                <vk-navbar-nav-dropdown :title="user.userName || ''">
                    <vk-navbar-nav-dropdown-nav>
                        <vk-nav-item
                            title="Profile"
                            @click="profile"
                        ></vk-nav-item>
                        <vk-nav-item-divider></vk-nav-item-divider>
                        <vk-nav-item
                            title="Log Out"
                            @click="logout"
                        ></vk-nav-item>
                    </vk-navbar-nav-dropdown-nav>
                </vk-navbar-nav-dropdown>
            </vk-navbar-nav>
            <!-- <router-link to="/"> Home </router-link> |
            <router-link to="/about"> About </router-link> |
            <router-link :to="{ name: 'auth-registration' }">
                Registration
            </router-link> -->
        </vk-navbar>
        <default-empty />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultEmpty from "./DefaultEmpty.vue";

@Component({ components: { DefaultEmpty } })
export default class Default extends Vue {
    get user() {
        console.log(this.$store.state.auth.user);
        return this.$store.state.auth.user;
    }

    async logout(): Promise<void> {
        await this.$store.dispatch("auth/logout");
        this.$router.push({ name: "auth-login" });
    }

    async profile(): Promise<void> {
        this.$router.push({ name: "user-profile" });
    }
}
</script>
