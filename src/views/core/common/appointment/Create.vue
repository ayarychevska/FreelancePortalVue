<template>
    <div class="container">
        <vk-card
            class="uk-card-hover"
            padding="large"
        >
            <vk-card-title
                v-if="appointmentId == 0"
                class="uk-margin-remove-bottom"
            >Add an appointment with
                <span
                    style="cursor: pointer"
                    @click="$router.push({ name: 'user-view', params: { id: studentId }})"
                > {{ studentName }} </span>
            </vk-card-title>

            <vk-card-title
                v-else
                class="uk-margin-remove-bottom"
            >Edit appointment with
                <span
                    style="cursor: pointer"
                    @click="$router.push({ name: 'user-view', params: { id: studentId }})"
                > {{ studentName }} </span>
            </vk-card-title>

            <hr />

            <form
                class="bg-white shadow-md rounded px-8 pt-6 pb-3 mb-4"
                @submit.prevent
            >

                <div class="row uk-text-center">
                    <div class="col-8">
                        <div class="uk-margin row">
                            <div class="col-md-12">
                                <label for="title">Title</label>
                                <input
                                    class="uk-input uk-form-small"
                                    type="text"
                                    v-model="appointment.title"
                                />
                            </div>
                        </div>
                        <div class="uk-margin row">
                            <div class="col-md-12">
                                <label for="name">Subject</label>
                                <v-select
                                    v-if="appointment"
                                    label="title"
                                    :options="subjects"
                                    :reduce="x => x.id"
                                    v-model="appointment.subjectId"
                                ></v-select>
                            </div>
                        </div>
                    </div>

                    <div class="col-4">
                        <v-date-picker
                            v-model="dateUtc"
                            :min-date='Date.now()'
                            @dayclick="timePickerDateChanged"
                        />

                        <div class="m-3">
                            <span class="block text-gray-600 text-sm text-left font-bold mb-2">Select Time</span>
                            <v-date-picker
                                v-model="range"
                                mode="time"
                                is-range
                                :minute-increment='5'
                                :key='Number(range.start)'
                            >
                                <template v-slot="{ inputValue, inputEvents, isDragging }">
                                    <div class="justify-start items-center">
                                        <div class="relative flex-grow mb-3">
                                            <svg
                                                class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                                                stroke-width="1"
                                                viewBox="0 0 24 24"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke="currentColor"
                                            >
                                                <path d="M22 14c0 5.523-4.478 10-10 10s-10-4.477-10-10 4.478-10 10-10 10 4.477 10 10zm-2 0c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8 8-3.589 8-8zm-6-11.819v-2.181h-4v2.181c1.408-.238 2.562-.243 4 0zm6.679 3.554l1.321-1.321-1.414-1.414-1.407 1.407c.536.402 1.038.844 1.5 1.328zm-8.679 2.265v6h6c0-3.309-2.691-6-6-6z" />
                                            </svg>
                                            <input
                                                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                :value="inputValue.start"
                                                v-on="inputEvents.start"
                                            />
                                        </div>
                                        <div class="relative flex-grow">
                                            <svg
                                                class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                                                stroke-width="1"
                                                viewBox="0 0 24 24"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke="currentColor"
                                            >
                                                <path d="M22 14c0 5.523-4.478 10-10 10s-10-4.477-10-10 4.478-10 10-10 10 4.477 10 10zm-2 0c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8 8-3.589 8-8zm-6-11.819v-2.181h-4v2.181c1.408-.238 2.562-.243 4 0zm6.679 3.554l1.321-1.321-1.414-1.414-1.407 1.407c.536.402 1.038.844 1.5 1.328zm-8.679 2.265v6h6c0-3.309-2.691-6-6-6z" />
                                            </svg>
                                            <input
                                                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                :value="inputValue.end"
                                                v-on="inputEvents.end"
                                            />
                                        </div>
                                    </div>
                                </template>
                            </v-date-picker>
                        </div>
                    </div>

                </div>
            </form>

            <vk-button
                v-if="appointmentId == 0"
                class="uk-width-1-1 uk-button-secondary"
                @click="addAppointment"
            >Add</vk-button>

            <vk-button
                v-else
                class="uk-width-1-1 uk-button-secondary"
                @click="editAppointment"
            >Edit</vk-button>
        </vk-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { DateTime } from "luxon";
import { SubjectsTitles } from '@/models/core/teacher/Subjects';
import { AppointmentCreateModel } from "@/models/core/common/Appointments";

@Component({})
export default class AppointmentCreate extends Vue {
    private subjects: SubjectsTitles[] = [];
    private appointment: AppointmentCreateModel =
        {
            id: 0,
            title: "",
            startDateUTC: null,
            endDateUTC: null,
            teacherId: '',
            studentId: '',
            subjectId: null
        };

    private get appointmentId(): number {
        return Number(this.$route.params.id) || 0;
    }

    private dateUtc = null;

    private range = {
        start: null,
        end: null,
    };

    private get studentName(): string {
        return this.$route.params.studentName;
    }

    private get studentId(): string {
        return this.$route.params.studentId;
    }

    async created(): Promise<void> {

        this.subjects = (await this.$axios.get("/subjects/list")).data;

        if (this.appointmentId != 0) {

            this.appointment = (await this.$axios.get("/appointments/" + this.appointmentId)).data;

            this.$nextTick(() => {
                this.dateUtc = this.appointment.startDateUTC;
                this.timePickerDateChanged();
            });
        }
    }

    private async timePickerDateChanged(): Promise<void> {
        this.range.start = this.dateUtc;
        this.range.end = this.dateUtc;
    }

    async addAppointment(): Promise<void> {
        this.appointment.teacherId = this.$store.state.auth.user.id;
        this.appointment.studentId = this.studentId;
        this.appointment.startDateUTC = this.range.start;
        this.appointment.endDateUTC = this.range.end;

        try {
            await this.$axios.post("/appointments", this.appointment);

            this.$swal.fire({
                icon: 'success',
                title: 'Appointment is ready',
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

            this.$emit('update-reviews');
        }
        catch {
            this.$swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
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

    async editAppointment(): Promise<void> {
        this.appointment.teacherId = this.$store.state.auth.user.id;
        this.appointment.studentId = this.studentId;
        this.appointment.startDateUTC = this.range.start;
        this.appointment.endDateUTC = this.range.end;

        try {
            await this.$axios.put("/appointments", this.appointment);

            this.$swal.fire({
                icon: 'success',
                title: 'Appointment is edited',
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

            this.$emit('update-reviews');
        }
        catch {
            this.$swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
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

<style lang="postcss" scoped>
/* @tailwind base;
@tailwind components;*/
@tailwind utilities;
</style>>