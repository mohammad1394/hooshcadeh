import Container from "@/components/Layout/container/Container";

export default function Loading() {
    return (
        <div className="bg-white animate-pulse">

            {/* Hero */}
            <Container>
                <section className="grid lg:grid-cols-2 gap-10 items-center py-16">

                    {/* Text */}
                    <div className="space-y-6">

                        <div className="w-44 h-7 rounded-full bg-gray-200" />

                        <div className="space-y-4">
                            <div className="w-full h-12 rounded bg-gray-200" />
                            <div className="w-5/6 h-12 rounded bg-gray-200" />
                            <div className="w-3/4 h-12 rounded bg-gray-200" />
                        </div>

                        <div className="w-full h-5 rounded bg-gray-200" />
                        <div className="w-2/3 h-5 rounded bg-gray-200" />

                        <div className="flex gap-4 mt-8">

                            <div className="w-36 h-12 rounded-lg bg-gray-200" />

                            <div className="flex-1 h-12 rounded-lg bg-gray-200" />

                        </div>

                    </div>

                    {/* Image */}
                    <div className="h-[340px] rounded-3xl bg-gray-200" />

                </section>
            </Container>

            {/* Latest Courses */}
            <Container>

                <div className="flex justify-between items-center mb-8">

                    <div className="w-44 h-8 rounded bg-gray-200" />

                    <div className="w-24 h-6 rounded bg-gray-200" />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="border rounded-xl overflow-hidden shadow-sm"
                        >

                            <div className="h-52 bg-gray-200" />

                            <div className="p-5 space-y-5">

                                <div className="h-6 rounded bg-gray-200" />

                                <div className="flex justify-between">

                                    <div className="w-20 h-4 rounded bg-gray-200" />

                                    <div className="w-24 h-4 rounded bg-gray-200" />

                                </div>

                                <div className="flex justify-between items-center">

                                    <div className="w-24 h-5 rounded bg-gray-200" />

                                    <div className="w-24 h-9 rounded bg-gray-200" />

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </Container>

            {/* Popular Courses */}

            <Container className="mt-20">

                <div className="flex justify-between items-center mb-8">

                    <div className="w-44 h-8 rounded bg-gray-200" />

                    <div className="w-24 h-6 rounded bg-gray-200" />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="border rounded-xl overflow-hidden shadow-sm"
                        >

                            <div className="h-52 bg-gray-200" />

                            <div className="p-5 space-y-5">

                                <div className="h-6 rounded bg-gray-200" />

                                <div className="flex justify-between">

                                    <div className="w-20 h-4 rounded bg-gray-200" />

                                    <div className="w-24 h-4 rounded bg-gray-200" />

                                </div>

                                <div className="flex justify-between items-center">

                                    <div className="w-24 h-5 rounded bg-gray-200" />

                                    <div className="w-24 h-9 rounded bg-gray-200" />

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </Container>

            {/* Social */}

            <Container className="py-24">

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="h-28 rounded-2xl bg-gray-200" />

                    <div className="h-28 rounded-2xl bg-gray-200" />

                </div>

            </Container>

            {/* Latest Articles */}

            <Container>

                <div className="flex justify-between items-center mb-8">

                    <div className="w-40 h-8 rounded bg-gray-200" />

                    <div className="w-24 h-6 rounded bg-gray-200" />

                </div>

                <div className="max-w-md mx-auto border rounded-xl overflow-hidden">

                    <div className="h-60 bg-gray-200" />

                    <div className="p-5 space-y-5">

                        <div className="h-7 rounded bg-gray-200" />

                        <div className="h-5 rounded bg-gray-200" />

                        <div className="h-5 w-2/3 rounded bg-gray-200" />

                        <div className="h-10 rounded bg-gray-200" />

                    </div>

                </div>

            </Container>

            {/* Comments */}

            <Container className="py-20">

                <div className="w-48 h-8 rounded bg-gray-200 mx-auto mb-10" />

                <div className="grid lg:grid-cols-4 gap-6">

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="border rounded-xl p-5 space-y-4"
                        >
                            <div className="h-4 rounded bg-gray-200" />
                            <div className="h-4 rounded bg-gray-200" />
                            <div className="h-4 w-3/4 rounded bg-gray-200" />

                            <div className="flex justify-between items-center pt-6">

                                <div className="w-24 h-5 rounded bg-gray-200" />

                                <div className="w-10 h-10 rounded-full bg-gray-200" />

                            </div>

                        </div>
                    ))}

                </div>

            </Container>

            {/* About */}

            <Container className="pb-24">

                <div className="w-56 h-8 rounded bg-gray-200 mx-auto mb-10" />

                <div className="space-y-5 max-w-5xl mx-auto">

                    <div className="h-5 rounded bg-gray-200" />

                    <div className="h-5 rounded bg-gray-200" />

                    <div className="h-5 rounded bg-gray-200" />

                    <div className="h-5 w-3/4 mx-auto rounded bg-gray-200" />

                </div>

                <div className="w-36 h-12 rounded-full bg-gray-200 mx-auto mt-10" />

            </Container>

        </div>
    );
}