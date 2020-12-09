<template>
  <div class="container flex-center-vertically">
    <div class="row justify-content-end">
      <vk-card class="col-lg-7 uk-card-hover" padding="large">
        <vk-card-title class="uk-margin-remove-bottom"
          >Registration</vk-card-title
        >
        <p class="uk-text-meta uk-margin-remove-top">
          In case you already have an account,
          <router-link class="font-weight-bold" :to="{ name: 'auth-login' }"
            >click here</router-link
          >
        </p>
        <hr />
        <form>
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <label for="Name">Name</label>
              <input
                class="uk-input uk-form-small"
                type="text"
                v-model="user.name"
              />
            </div>

            <div class="uk-margin row">
              <div class="col-md-6">
                <label for="Login">Login</label>
                <input
                  class="uk-input uk-form-small"
                  type="text"
                  v-model="user.login"
                />
              </div>

              <div class="col-md-6">
                <label for="name">Email</label>
                <input
                  class="uk-input uk-form-small"
                  type="text"
                  v-model="user.Email"
                />
              </div>
            </div>

            <div class="display-flex-equal-pieces uk-margin">
              <div>
                <label for="name">Day</label>
                <input
                  class="uk-input uk-form-small"
                  type="number"
                  v-model="day"
                />
              </div>
              <div class="ml-4">
                <label for="name">Month</label>
                <select class="uk-select uk-form-small" v-model="month">
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              <div class="ml-4">
                <label for="name">Year</label>
                <input
                  class="uk-input uk-form-small"
                  type="numer"
                  v-model="year"
                />
              </div>
            </div>

            <div class="display-flex-equal-pieces uk-margin">
              <div>
                <label for="name">Password</label>
                <input
                  class="uk-input uk-form-small"
                  type="password"
                  v-model="user.password"
                />
              </div>

              <div class="ml-4">
                <label for="name">Repeat password</label>
                <input
                  class="uk-input uk-form-small"
                  type="password"
                  v-model="user.repeatPassword"
                />
              </div>
            </div>

            <div class="display-flex-equal-pieces uk-margin">
              <div>
                <label for="name">Gender</label>
                <select class="uk-select uk-form-small" v-model="user.gender">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div class="ml-4">
                <label for="name">Choose one:</label>
                <div v-for="option in roles" :key="option.value">
                  <label>
                    <input
                      :value="option.value"
                      class="uk-radio"
                      type="radio"
                      name="user-role"
                      v-model="user.role"
                    />
                    {{ option.title }}
                  </label>
                </div>
              </div>
            </div>

            <div v-show="user.role == 1">
              <div class="uk-margin">
                <label for="Name">Name</label>
                <input
                  class="uk-input uk-form-small"
                  type="text"
                  v-model="user.name"
                />
              </div>
            </div>

            <div class="bg" />
          </fieldset>
        </form>
        <vk-button class="uk-width-1-1 uk-button-secondary"
          >Create an account</vk-button
        >
      </vk-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserCreateModel } from "@/models/core/common/Users.ts";
import { DateTime } from "luxon";

@Component({})
export default class Registration extends Vue {
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
    console.log("Denis pis'ka");
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

.bg {
  background: url("~@/assets/images/background_registration.jpg") no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200px;
  height: auto;
  z-index: -2;
}

label {
  font-size: 13px;
}
</style>
