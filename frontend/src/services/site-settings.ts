import {api} from "@/services/api";
import {SiteSettings} from "@/types/site-settings";

export const getSiteSettings =  () => {
    return api<SiteSettings>("/site-settings" , {
        method: "GET",
    });
}