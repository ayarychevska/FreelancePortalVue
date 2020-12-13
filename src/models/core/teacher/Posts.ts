import { DateTime } from "luxon";

export interface PostCreateModel {
    text: string;
    userId: string;
    status: number;
    subjectId: number;
}