import { DateTime } from "luxon";

export interface MessageViewModel {
    dateTimeSendedUTC: DateTime;
    text: string;
    status: number;
    senderName: string;
    senderId: string;
    receiverName: string;
    receiverId: string;
    senderAvatar: string;
    receiverAvatar: string;
}

export interface MessageCreateModel {
    text: string;
    status: number;
    senderId: string;
    receiverId: string;
}

export enum MessageStatus {
    Unread = 0,
    Read = 1
}

export const StatusTranslate = [
    { status: MessageStatus.Unread, value: 'Unread' },
    { status: MessageStatus.Read, value: 'Read' }
];