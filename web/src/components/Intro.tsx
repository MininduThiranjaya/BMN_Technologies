function Intro() {
    return (
        <div className="bg-white w-full h-full text-white p-3 md:p-5 font-mono mt-11">
            <div className=" w-full flex flex-1 flex-row md:flex-1 md:flex-col relative text-black h-full">
                {/*bg-color*/}
                <div className="w-full h-1/2 bottom-0 absolute md:w-2/3 md:right-0 md:h-full">
                    {/*bg-color*/}
                    <div className="flex h-full justify-center items-center md:flex md:h-full md:justify-center md:items-center">
                        <div className=" bg-black rounded-2xl">
                            <img src="/banner1.webp" alt="Solar energy" className="rounded-xl md:rounded-2xl" />
                        </div>
                    </div>
                    {/* Overlay Box */}
                    <div className="absolute right-0 bottom-12 w-36 h-20 rounded-md shadow-lg flex justify-center tems-center md:absolute md:right-0 md:top-14 md:w-40 md:h-20 md:rounded-md md:shadow-lg md:flex md:justify-center md:items-center">
                        <div className="w-full h-full bg-black rounded-md bg-opacity-90 p-4 text-center">
                            <h2 className="text-sm sm:text-lg md:text-2xl font-bold text-white">8+</h2>
                            <p className="text-xs  sm:text-xs md:text-sm text-gray-200">Years Experience</p>
                        </div>
                    </div>
                </div>
                <div className="absolute w-full md:absolute md:w-2/3 md:left-0 md:h-full">
                    {/*bg-color*/}
                    <div className="flex flex-1 flex-col w-full h-full md:flex md:flex-1 md:flex-col md:h-full">
                        <div className="w-full flex items-center md:h-1/3 md:flex md:items-center">
                            {/*bg-color*/}
                            <div className="w-full h-full flex flex-col justify-center items-center md:w-3/4 md:h-full md:flex md:flex-col md:justify-center md:items-center md:gap-1">
                                {/*bg-color*/}
                                <span className="text-4xl p-1 self-start md:text-8xl md:p-2 md:self-start">POWERING</span>
                                <span className="text-2xl p-1 self-center md:text-5xl md:p-2 md:self-center">THE FUTURE</span>
                                <span className="text-xl p-1 self-end md:text-3xl md:p-2 md:self-end">WITH SOLAR ENERGY</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-start md:h-2/3 md:flex md:justify-start">
                            {/*bg-color*/}
                            <div className="w-full h-full flex flex-col justify-start gap-1 md:w-2/3 md:h-full md:flex md:flex-col md:justify-start md:gap-4">
                                {/* Text section */}
                                <div className="h-1/2 w-full flex flex-col justify-start p-2 gap-4 md:h-1/2 md:w-full md:flex md:flex-col md:justify-start md:p-4 md:gap-4">
                                    {/*bg-color*/}
                                    <div>
                                        <p className="text-sm font-semibold text-justify md:text-lg md:text-justify md:font-semibold">
                                            With a strong focus on innovation, quality, and customer
                                            satisfaction, B M N Technologies is at the forefront of
                                            Sri Lanka's renewable energy transformation. Our mission
                                            is to reduce carbon footprints and empower our clients
                                            with smart solar technologies that drive both
                                            environmental and economic benefits.
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-row justify-center items-center gap-10 md:w-full md:flex md:flex-row md:justify-center md:items-center md:gap-20">
                                        <button className="w-32 h-10 md:w-40 md:h-10 rounded text-[#7A3EFF] border-2 border-[#7A3EFF] flex items-center justify-center normal-case">
                                            One
                                        </button>
                                        <button className="w-32 h-10 md:w-40 md:h-10 rounded to-gray-700 text-[#7A3EFF] border-2 border-[#7A3EFF] flex items-center justify-center normal-case">
                                            Two
                                        </button>
                                    </div>
                                </div>

                                {/* Boxes section */}
                                <div className="h-1/2 w-full flex justify-center items-center md:h-1/2 md:w-full md:flex md:justify-center md:items-center">
                                    {/*bg-color*/}
                                    <div className="flex justify-center items-center gap-3 md:flex md:justify-center md:items-center md:gap-4">
                                        <div className="flex flex-col w-32 h-16 rounded border-2 border-[#7A3EFF] justify-center items-center md:flex md:flex-col md:w-40 md:h-20 md:rounded md:border-2 md:border-[#7A3EFF] md:justify-center md:items-center">
                                            <p className="text-sm md:text-lg">500+</p>
                                            <p className="text-xs md:text-sm">Project Completed</p>
                                        </div>
                                        <div className="flex flex-col w-32 h-16 rounded border-2 border-[#7A3EFF] justify-center items-center md:flex md:flex-col md:w-40 md:h-20 md:rounded md:border-2 md:border-[#7A3EFF] md:justify-center md:items-center">
                                            <p className="text-sm md:text-lg">50MW</p>
                                            <p className="text-xs md:text-sm">Energy Generated</p>
                                        </div>
                                        <div className="flex flex-col w-32 h-16 rounded border-2 border-[#7A3EFF] justify-center items-center md:flex md:flex-col md:w-40 md:h-20 md:rounded md:border-2 md:border-[#7A3EFF] md:justify-center md:items-center">
                                            <p className="text-sm md:text-lg">89%</p>
                                            <p className="text-xs md:text-sm">Client Satisfaction</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;
