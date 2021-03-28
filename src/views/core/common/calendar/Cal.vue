<template>
    <div class="container">
        <vue-cal
            class="vuecal--green-theme mt-3"
            :time-from="6 * 60"
            :time-to="24 * 60"
            :disable-views="['years']"
            :events="events"
            style="height: 850px"
            :on-event-click="onEventClick"
        >
            <template v-slot:event="{ event }">
                <!-- <v-icon>{{ event.icon }}</v-icon> -->

                <div
                    style="font-size: 0.8em;"
                    class="vuecal__event-title uk-margin-remove uk-padding-remove"
                    v-html="event.title"
                >
                </div>

                <small class="vuecal__event-time uk-margin-remove uk-padding-remove">
                    <!-- Using Vue Cal injected Date prototypes -->
                    <strong>Time:</strong> <span>{{ event.start.formatTime("HH-mm") }} - {{ event.end.formatTime("HH-mm") }} </span><br />
                    <strong>Lesson with: </strong>
                    <b-link
                        style="font-color: white"
                        type="text"
                        class="uk-margin-remove"
                        @click="$router.push({ name: 'user-view', params: { id: event.studentId }})"
                    >{{ event.studentName }}</b-link>
                </small>

            </template>
        </vue-cal>

        <!-- <b-modal
            v-if="showDialog"
            id="modal-1"
            :title="selectedEvent.title"
            centered
        >
            <p class="my-4">Hello from modal!</p>
        </b-modal> -->
    </div>
</template>

<script lang="ts">
import VueCal from "vue-cal";
import { Component, Vue } from "vue-property-decorator";
import 'vue-cal/dist/vuecal.css'

@Component({ components: { VueCal } })
export default class Login extends Vue {
    events = []
    selectedEvent = {};
    showDialog = false

    private data =
        {
            isTeacher: false,
            viewModels: []
        };

    async created(): Promise<void> {
        const response = await this.$axios.get("/appointments/calendar",
            { params: { 'userId': this.$store.state.auth.user.id } });

        this.data = response.data;
        this.events = this.data.viewModels;
    }

    public onEventClick(event, e) {
        this.selectedEvent = event;
        this.showDialog = true;

        this.$bvModal.show('modal-1');

        e.stopPropagation()
    }
}
</script>


<style lang="scss">
/* Different color for different event types. */
.vuecal__event {
    background-color: rgba(253, 156, 66, 0.9);
    border: 1px solid rgb(233, 136, 46);
    color: #fff;
}

/* Green-theme. */
.vuecal__menu,
.vuecal__cell-events-count {
    background-color: #42b983;
}
.vuecal__title-bar {
    background-color: #e4f5ef;
}
.vuecal__cell--today,
.vuecal__cell--current {
    background-color: rgba(240, 240, 255, 0.4);
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
    background-color: rgba(235, 255, 245, 0.4);
}
.vuecal__cell--selected:before {
    border-color: rgba(66, 185, 131, 0.5);
}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
    background-color: rgba(195, 255, 225, 0.5);
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
    background-color: rgba(136, 236, 191, 0.25);
}

.vuecal__event {
    cursor: pointer;
}

.vuecal__event-title {
    font-size: 1.2em;
    font-weight: bold;
    margin: 4px 0 8px;
}

.vuecal__event-time {
    display: inline-block;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
    font-style: italic;
}
</style>