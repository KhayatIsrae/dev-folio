//interface structure dun message
export interface Message {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'seen' | 'unseen';
}