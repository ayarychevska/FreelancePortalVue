import { DateTime } from "luxon";

export interface AppointmentCreateModel {
    id: number;
    title: string;
    startDateUTC: DateTime;
    endDateUTC: DateTime;
    teacherId: string;
    studentId: string;
    subjectId: number;
}

export interface AppointmentViewModel {
    id: number;
    title: string;
    date: string;
    timeRange: string;
    teacherId: string;
    teacherName: string;
    studentId: string;
    studentName: string;
    subjectId: string;
    subjectTitle: string;
}

export interface AppointmentFilterModel {
    title: string | null;
    dateFromUTC: DateTime | null;
    dateUntilUTC: DateTime | null;
    teacherId: string | null;
    studentId: string | null;
    subjectId: number | null;
}