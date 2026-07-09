import {api, isDynamicServerUsageError} from "@/services/api";
import {SiteSettings} from "@/types/site-settings";

const defaultSiteSettings: SiteSettings = {
    site_name: "هوشکده",
    about_site: "",
    email_site: "",
    phone_number_site: "",
    instagram: "/",
    telegram: "/",
    whatsapp: "/",
    rubika: "/",
    bale: "/",
    eitaa: "/",
};

export const getSiteSettings = async () => {
    try {
        return await api<SiteSettings>("/site-settings" , {
        method: "GET",
        });
    } catch (error) {
        if (isDynamicServerUsageError(error)) {
            throw error;
        }
        console.error("Failed to load site settings", error);
        return defaultSiteSettings;
    }
}
