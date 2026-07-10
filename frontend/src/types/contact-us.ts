export type ContactUsResponse ={
    id: number;
    concept: string;
    name_and_family: string;
    phone_number: string;
    text: string;
    is_read: boolean;
    created_at: string;
}

export type ContactUsData = {
    concept: string;
    name_and_family: string;
    phone_number: string;
    text: string;
    is_read: boolean;
}