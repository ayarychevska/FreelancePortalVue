import { DateTime } from "luxon";

export interface PostCreateModel {
    title: string;
    text: string;
    userId: string;
    status: number;
    subjectId: number;
}

export interface PostListViewModel {
    title: string;
    text: string;
    dateUtc: DateTime;
    userId: string;
    userName: string;
    status: number;
    subjectId: number;
    subjectTitle: string;
}

export interface PostViewModel {
    title: string;
    text: string;
    userId: string;
    dateUtc: DateTime;
    userName: string;
    status: number;
    subjectId: number;
    subjectTitle: string;
}