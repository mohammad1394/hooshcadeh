export type Course = {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    description: string;
    prerequisite: string;
    teacher: number;
    category: number;
    discount: number;
    students: number;
    orginal_price: number;
    final_price: string;
    comments: [];
    time: number;
    level: "b" | "i" | "a";
    created_jalali: string;
    updated_jalali: string;
};