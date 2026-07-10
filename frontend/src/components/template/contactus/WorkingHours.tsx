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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.420433603192!2d51.46713027559217!3d35.69127017258403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e027cdbd2fe8f%3A0xdc434230d3902078!2sTehran%20Province%2C%20Tehran%2C%20Piroozi%20St%2C%20Iran!5e0!3m2!1sen!2s!4v1783672991402!5m2!1sen!2s"
                        className="w-full h-[320px]"
                    />
                </div>

            </div>

        </section>
    );
}