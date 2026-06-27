export const sanitizeHtml = (html: string): string => {
    if (typeof window === "undefined") return html;

    const div = document.createElement("div");
    div.innerHTML = html;

    // Remove script tags and event handlers
    const scripts = div.querySelectorAll("script");
    scripts.forEach((s) => s.remove());

    const allElements = div.querySelectorAll("*");
    allElements.forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
            if (attr.name.startsWith("on")) {
                el.removeAttribute(attr.name);
            }
        });
    });

    return div.innerHTML;
};