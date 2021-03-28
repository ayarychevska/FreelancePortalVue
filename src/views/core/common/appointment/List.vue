<template>
    <div class="container">

        <div class="row mt-3">
            <!-- Filters -->
            <div class="col-3 uk-text-left">
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

            <!-- List -->
            <div class="col-9 pl-5">
                <div style="height: 90%">
                    <vk-table
                        id="appointments-list"
                        class="uk-text-left"
                        :data="data.viewModels"
                        :sorted-by.sync="sortedBy"
                        :divided="false"
                    >
                        <vk-table-column-sort
                            title="Title"
                            cell="title"
                        ></vk-table-column-sort>
                        <vk-table-column-sort
                            title="Date"
                            cell="date"
                        ></vk-table-column-sort>
                        <vk-table-column-sort
                            title="Time"
                            cell="timeRange"
                        ></vk-table-column-sort>
                        <vk-table-column-sort
                            v-if="!data.isTeacher"
                            title="teacher"
                            cell="teacherName"
                        ></vk-table-column-sort>
                        <vk-table-column-sort
                            v-if="data.isTeacher"
                            title="student"
                            cell
                        >
                            <div
                                slot-scope="scope"
                                @click="$router.push({ name: 'user-view', params: {id : scope.row.studentId } })"
                            >
                                <vk-button-link
                                    class="text-capitalize"
                                    type="text"
                                >{{ scope.row.studentName }}</vk-button-link>
                            </div>
                        </vk-table-column-sort>
                        <vk-table-column-sort
                            title="subject"
                            cell="subjectTitle"
                        ></vk-table-column-sort>

                        <vk-table-column
                            title="Actions"
                            style="width: 10px"
                            cell
                        >
                            <div slot-scope="scope">
                                <vk-icon
                                    v-if="data.isTeacher"
                                    class="cursor-pointer mr-2"
                                    icon="file-edit"
                                    @click="$router.push({ name: 'appointment-edit', params: {id : scope.row.id, studentName : scope.row.studentName, studentId : scope.row.studentId } })"
                                ></vk-icon>

                                <vk-icon
                                    class="cursor-pointer"
                                    icon="trash"
                                    @click="deleteConfirmation(scope.row.id, scope.row.date)"
                                ></vk-icon>

                            </div>
                        </vk-table-column>
                    </vk-table>
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
import { Component, Vue, Watch } from "vue-property-decorator";
import { DateTime } from "luxon";
import { AppointmentFilterModel, AppointmentViewModel } from "@/models/core/common/Appointments";
import { Pager } from "@/models/core/common/Pager";
import { SubjectsTitles } from "@/models/core/teacher/Subjects";
import { merge } from 'lodash';

@Component({})
export default class AppointmentsList extends Vue {

    private pager: Pager = {
        page: 1,
        size: 10,
        total: 0
    };

    private range: any = {
        start: null,
        end: null
    }

    private filter: AppointmentFilterModel = {
        title: null,
        dateFromUTC: null,
        dateUntilUTC: null,
        teacherId: null,
        studentId: null,
        subjectId: null
    };

    private subjects: SubjectsTitles[] = [];

    private data =
        {
            isTeacher: false,
            viewModels: [],
            pager: null
        };

    sortedBy =
        {
            name: 'asc'
        };

    async created(): Promise<void> {
        await this.loadData();
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
        const response = await this.$axios.get("/appointments/list",
            { params: merge({ userId: this.$store.state.auth.user.id }, this.filter, this.pager) });

        this.data = response.data;
        this.pager = this.data.pager;
    }

    private edit(id) {
        this.$router.push({ name: "appointment-edit", params: { id: id } });
    }

    async deleteConfirmation(id, date) {
        this.$swal.fire({
            title: 'Are you sure you want to cancel the appointment at ' + date + '?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    Promise.resolve(this.$axios.delete("/appointments/" + id))
                        .then(res => {
                            this.$swal.fire('Deleted!', 'Appointment has been canceled.', 'success');
                            Promise.resolve(this.loadData());
                        });
                }
                catch
                {
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
        })
    }

}
</script>