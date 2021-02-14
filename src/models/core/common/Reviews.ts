import { DateTime } from "luxon";

export interface ReviewCreateModel {
    id: number;
    datePostedUTC: DateTime;
    text: string;
    rate: number;
    reviewerId: string;
    reviewingUserId: string;
}

export interface ReviewViewModel {
    id: number;
    datePostedUTC: DateTime;
    text: string;
    rate: number;
    reviewerId: string;
    reviewerName: string;
    reviewingUserId: string;
    reviewingUserName: string;
}