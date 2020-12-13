import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import axios from "axios";
import { UserLoginModel } from "@/models/core/common/Users";

@Module({ namespaced: true })
export default class AuthStore extends VuexModule {
    private status: boolean | null;
    private token: string = localStorage.getItem("token") || "";
    private user: any = JSON.parse(localStorage.getItem("user")) || null;

    @Mutation
    authRequest() {
        this.status = null;
    }

    @Mutation
    authSuccess(data) {
        this.status = true
        this.token = data.token;
        this.user = data.user;
    }

    @Mutation
    authError() {
        this.status = false;
    }

    @Mutation
    logoutMutation() {
        this.status = null;
        this.token = "";
        this.user = null;
    }

    @Action
    async login(loginData: UserLoginModel): Promise<boolean> {
        try {
            this.context.commit('authRequest');

            const response = await axios.post("/login", loginData);

            const token = response.data.token;
            const user = response.data.userDetails;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            this.context.commit('authSuccess', { token, user });
            return true;
        }
        catch (err) {
            console.log("Login error", err);
            this.context.commit('authError');
            localStorage.removeItem("token");
            return false;
        }
    }


    @Action
    async logout() {
        this.context.commit('logoutMutation');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    }
}
