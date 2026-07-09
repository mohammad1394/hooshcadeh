import Link from "next/link";

export default function CTA() {
    return (
        <section className="container mx-auto px-6 pb-24">

            <div className="rounded-[35px] bg-gradient-to-r from-orange-50 to-green-50 p-12">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                    <div>

                        <h2 className="text-4xl font-black">
                            هنوز سوالی دارید؟
                        </h2>

                        <p className="text-gray-500 mt-4">
                            تیم پشتیبانی هوشکده آماده پاسخگویی به شماست.
                        </p>

                    </div>

                    <Link
                        href="#contact-form"
                        className="bg-orange-500 hover:bg-orange-600 duration-300 text-white px-10 py-4 rounded-xl font-bold"
                    >
                        تماس با ما
                    </Link>

                </div>

            </div>

        </section>
    );
}