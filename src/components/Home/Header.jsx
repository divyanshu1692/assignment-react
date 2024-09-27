import Link from "next/link";
import { MENUS } from "../../utils/constant";

export default function Header() {
    return (
        <>
            <header className="flex justify-between items-center">
                <h1 className="flex-[0.3]">digipanda</h1>
                <div className="flex-1 flex justify-between">
                    {
                        MENUS.map((menu, index) => (
                            <Link href={menu.link} key={index}>{menu.name}</Link>
                        ))
                    }
                </div>
                <div className="flex-[0.3] text-right">
                    <button className="py-[10px] px-[20px] bg-white text-black" style={{ borderRadius: "50px" }}>Let's connect</button>
                </div>
            </header>
        </>
    )
}