import MainCard from "./MainCard";
import SubCard from "./SubCard";

export default function index() {
    return (
        <>
            <div  style={{
                backgroundImage: "linear-gradient(to right, #ddd, #116A9E, #d33)"
            }}>
                <MainCard />
                <SubCard />
            </div>
        </>
    )
}