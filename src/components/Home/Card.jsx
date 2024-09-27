import Image from "next/image";

export default function Card() {
    return (
        <>
            <div className="bg-gradient-to-r from-blue-900 to-green-500 p-8 rounded-lg shadow-md w-full max-w-md ml-5">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">UX / Ui <br />Development</h2>
                    <div className="space-x-1">
                        <span className="h-2 w-2 bg-white rounded-full inline-block"></span>
                        <span className="h-2 w-2 bg-white rounded-full inline-block"></span>
                        <span className="h-2 w-2 bg-white rounded-full inline-block"></span>
                    </div>
                </div>

                <div className="bg-blue-700 rounded-lg p-4">
                    <Image
                        src="/assets/img/user.jpg"
                        alt="UI Design Screenshot"
                        width={515}
                        height={344}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex justify-around text-center text-white mt-6 space-x-4">
                    <div className= "flex flex-col justify-center" style={{
                        borderRadius: "30px",
                        border: "1px solid #fff",
                        width: "150px",
                        height: "120px"
                    }}>
                        <span className="text-3xl font-bold text-left ml-[20px]">8Y</span>
                        <span className="text-sm text-left ml-[20px]">Year Of <br />Experience</span>
                    </div>
                    <div className= "flex flex-col justify-center" style={{
                        borderRadius: "30px",
                        border: "1px solid #fff",
                        width: "150px",
                        height: "120px"
                    }}>
                        <span className="text-3xl font-bold text-left ml-[20px]">888</span>
                        <span className="text-sm text-left ml-[20px]">Project<br /> Globally</span>
                    </div>
                </div>
            </div>
        </>
    )
}