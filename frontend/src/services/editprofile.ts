import { api } from "@/services/api";

export type EditProfileResponse = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    avatar: string;
};

export const editProfile = (id: string, formData: FormData) => {
    return api<EditProfileResponse>(`/auth/profile/update/${id}/`, {
        method: "PUT",
        body: formData,
    });
};