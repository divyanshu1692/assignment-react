"use client";

import { gql, useQuery } from "@apollo/client";
import Table from "./Table";
import UploadExcel from "./UploadExcel";
import { useState } from "react";
import AddData from "./AddData";

export default function index() {
    const [uploadExcel, setUploadExcel] = useState(false);
    const [addData, setAddData] = useState(false);

    const query = gql`
        query contacts{
            contacts {
                id
                name
                email
                phone
                address
                image
            }
        }`

    const { data, loading, refetch } = useQuery(query);
    if (loading) {
        return "loading..."
    }    

    return (
        <>
            <AddData open={addData} onClose={() => setAddData(false)} refetch={refetch} />
            <UploadExcel open={uploadExcel} onClose={() => setUploadExcel(false)} refetch={refetch} />
            <button className="bg-red-600 text-[#fff] p-2 px-3 mx-2" onClick={() => setAddData(true)}>Add data</button>
            <button className="bg-green-700 text-[#fff] p-2 px-3" onClick={() => setUploadExcel(true)}>Upload data</button>
            {
                data &&
                <Table data={data.contacts} refetch={refetch} />
            }
        </>
    )
}