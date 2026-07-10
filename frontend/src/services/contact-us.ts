import { api } from "@/services/api";
import {ContactUsData, ContactUsResponse} from "@/types/contact-us";

export const contactUs = (data: ContactUsData) => {
    return api<ContactUsResponse>("/contact-form/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
};