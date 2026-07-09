import { Clock } from "lucide-react";

export default function WorkingHours() {
    return (
        <section className="container mx-auto px-6 py-10">

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="rounded-3xl bg-white shadow border p-8">

                    <div className="flex items-center gap-3 mb-8">
                        <Clock className="text-green-600" />
                        <h2 className="font-bold text-2xl">
                            ساعات پاسخگویی
                        </h2>
                    </div>

                    <div className="space-y-5">

                        <div className="flex justify-between">
                            <span>شنبه تا چهارشنبه</span>
                            <span>09:00 - 18:00</span>
                        </div>

                        <div className="flex justify-between">
                            <span>پنجشنبه</span>
                            <span>09:00 - 13:00</span>
                        </div>

                        <div className="flex justify-between">
                            <span>جمعه</span>
                            <span>تعطیل</span>
                        </div>

                    </div>

                </div>

                <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow border">

                    <iframe
                        src="https://maps.google.com/maps?q=tabriz&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-[320px]"
                    />

                </div>

            </div>

        </section>
    );
}