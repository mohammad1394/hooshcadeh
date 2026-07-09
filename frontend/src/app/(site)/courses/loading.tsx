import Container from "@/components/Layout/container/Container";

export default function Loading() {
    return (
        <div className="bg-[#F4F6F8] min-h-screen animate-pulse">

            <Container>

                <div className="py-15">

                    {/* Title */}
                    <div className="w-40 h-10 bg-gray-200 rounded mb-10" />

                    {/* Courses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {Array.from({ length: 8 }).map((_, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden"
                            >

                                {/* Image */}
                                <div className="h-56 bg-gray-200" />

                                <div className="p-5">

                                    {/* Title */}
                                    <div className="h-7 w-3/4 mx-auto bg-gray-200 rounded" />

                                    {/* Teacher + Duration */}
                                    <div className="flex justify-between items-center mt-10">

                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-gray-200" />
                                            <div className="w-24 h-4 bg-gray-200 rounded" />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-gray-200" />
                                            <div className="w-10 h-4 bg-gray-200 rounded" />
                                        </div>

                                    </div>

                                    {/* Price */}
                                    <div className="flex justify-between items-center mt-10">

                                        <div className="w-28 h-6 bg-gray-200 rounded" />

                                        <div className="w-12 h-12 rounded-xl bg-gray-200" />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </Container>

        </div>
    );
}