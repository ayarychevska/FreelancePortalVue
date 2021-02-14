<template>
    <div class="container">

        <vk-table
            class="uk-text-left"
            :data="data.viewModels"
            :sorted-by.sync="sortedBy"
            :divided="false"
        >
            <vk-table-column-sort
                title="Name"
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
                        class="cursor-pointer mr-2"
                        icon="file-edit"
                        @click="$router.push({ name: 'user-view', params: {id : scope.row.id } })"
                    ></vk-icon>

                    <vk-icon
                        class="cursor-pointer"
                        icon="trash"
                        @click="$router.push({ name: 'user-view', params: {id : scope.row.id } })"
                    ></vk-icon>
                </div>
            </vk-table-column>
        </vk-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DateTime } from "luxon";
import { AppointmentViewModel } from "@/models/core/common/Appointments";

@Component({})
export default class AppointmentsList extends Vue {
    private data =
        {
            isTeacher: false,
            viewModels: []
        };

    sortedBy =
        {
            name: 'asc'
        };

    async created(): Promise<void> {
        const response = await this.$axios.get("/appointments/list",
            { params: { 'userId': this.$store.state.auth.user.id } });

        this.data = response.data;
    }

}
</script>