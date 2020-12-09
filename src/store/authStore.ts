import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import axios from "axios";
import { UserLoginModel } from "@/models/core/common/Users";

@Module({ namespaced: true })
export default class AuthStore extends VuexModule {
    private status: string;
    private token: string = localStorage.getItem("token") || "";
    private user: any;

    @Mutation
    authRequest() {
        this.status = "loading";
    }

    @Mutation
    authSuccess(data) {
        this.status = "success";
        this.token = data.token;
        this.user = data.user;
    }

    @Mutation
    authError() {
        this.status = "error";
    }

    @Mutation
    logout() {
        this.status = "";
        this.token = "";
    }

    @Action
    async login(loginData: UserLoginModel) {
        try {
            this.context.commit('authRequest');

            const response = await axios.post("/login", loginData);

            const token = response.data.token;
            const user = response.data.userDetails;

            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;

            this.context.commit('authSuccess', { token, user });
        }
        catch (err) {
            console.log("Login error", err);
            this.context.commit('authError');
            localStorage.removeItem("token");
        }
    }

    /*register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    // Add the following line:
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })*/
}
