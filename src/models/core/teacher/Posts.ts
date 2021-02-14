import { DateTime } from "luxon";

export interface PostCreateModel {
    id: number;
    title: string;
    text: string;
    userId: string;
    status: number;
    subjectId: number;
}

export interface PostListViewModel {
    id: number;
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
    id: number;
    title: string;
    text: string;
    userId: string;
    dateUtc: DateTime;
    userName: string;
    status: number;
    subjectId: number;
    subjectTitle: string;
}

export enum PostStatus {
    Draft = 0,
    Published = 1,
    Archivized = 2
}

export const StatusTranslate = [
    { status: PostStatus.Draft, value: 'Draft' },
    { status: PostStatus.Archivized, value: 'Archivized' },
    { status: PostStatus.Published, value: 'Published' }
];