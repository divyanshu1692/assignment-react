// components/PerformanceMarketing.js
import Image from 'next/image';

const PerformanceMarketing = () => {
    return (
        // <div className="min-h-screen bg-gradient-to-r from-blue-900 to-green-500 flex items-center justify-center">
        <div className="bg-gradient-to-r from-blue-800 to-green-400 text-white p-10 rounded-lg relative shadow-lg w-[70%] flex flex-col justify-between">
            <div className="flex justify-between items-center">
                {/* Navigation Dots */}
                <div className="space-x-2">
                    <span className="h-2 w-2 bg-white rounded-full inline-block"></span>
                    <span className="h-2 w-2 bg-white rounded-full inline-block"></span>
                    <span className="h-2 w-2 bg-white rounded-full inline-block"></span>
                </div>

                {/* Arrow Button */}
                <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center absolute bottom-8 right-8">
                    <span className="text-lg">↗</span>
                </button>
            </div>

            {/* Title and Text */}
            <h1 className="text-4xl font-bold mt-10">
                Changing Your View Of <br /> <span className="text-5xl">PERFORMANCE MARKETING</span>
            </h1>
            <p className="mt-4 text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.
            </p>

            {/* Trusted Clients */}
            <div className="flex items-center mt-8">
                <span className="mr-4">Our Trusted <br /> Clients</span>
                <div className="flex space-x-2">
                    {/* Placeholder images for clients */}
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <div
                            key={index}
                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                        >
                            <img
                                src={`/assets/img/user.jpg`} // Use appropriate image paths
                                alt="Client Image"
                                style={{
                                    height: "100%",
                                    objectFit: "fill"
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Button */}
            <div className="mt-8">
                <button className="bg-white text-black px-6 py-2 rounded-full shadow hover:bg-gray-200 transition">
                    LET'S TALK
                </button>
            </div>
        </div>
        // </div>
    );
};

export default PerformanceMarketing;
