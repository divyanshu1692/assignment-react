"use client";

import Link from "next/link";

export default function index() {
    return (
        <>
            Home

            <Link href={"/assignments"}>Assignments</Link>
        </>
    )
}