export default function OurStats() {
    return (
        <div className="bg-black p-4">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left side: Our Stats and content */}
                    <div className="space-y-6 lg:w-1/2">
                        <div className="inline-flex items-center rounded-full bg-blue-500/40 px-4 py-1 text-sm text-white/80 font-semibold border border-green-300/70">
                            Our Stats
                        </div>
                        <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            Trusted by 20K+
                            <br />
                            students
                        </h2>
                        <p className="max-w-2xl text-lg text-gray-400">
                            Expand your skills with our trusted platform, chosen by millions worldwide.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600">
                                Learn Together
                            </button>
                            <button className="rounded-lg border border-gray-700 bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5">
                                Get Connected
                            </button>
                        </div>
                    </div>

                    {/* Right side: Stats Cards */}
                    <div className="space-y-6 lg:w-1/2">
                        {/* Stats Card 1 */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-black via-black/90 to-blue-950/20 p-6 shadow-xl backdrop-blur-sm">
                            <div className="relative z-10">
                                <h3 className="text-5xl font-bold text-white">22,000+</h3>
                                <p className="mt-2 text-blue-400">Students on Both</p>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-500/30 via-blue-500/5 to-transparent" />
                        </div>

                        {/* Stats Card 2 */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-black via-black/90 to-blue-950/20 p-6 shadow-xl backdrop-blur-sm">
                            <div className="relative z-10">
                                <h3 className="text-5xl font-bold text-white">9,000+</h3>
                                <p className="mt-2 text-blue-400">On offline bootcamps</p>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-500/30 via-blue-500/5 to-transparent" />
                        </div>

                        {/* Stats Card 3 (Duplicate of Card 1 for layout purposes) */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-black via-black/90 to-blue-950/20 p-6 shadow-xl backdrop-blur-sm">
                            <div className="relative z-10">
                                <h3 className="text-5xl font-bold text-white">13,000+</h3>
                                <p className="mt-2 text-blue-400">On online bootcamps</p>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-500/30 via-blue-500/5 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}