import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react"
import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";

export default function UploadExcel({ open, onClose, refetch }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    // Handle file selection
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submit
    const uploadExcel = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status == 200) {
                toast.success('Data uploaded successfully', {
                    position: "top-right"
                });
                onClose();
                refetch();
            } else {
                toast.error('something went wrong!', {
                    position: "top-right"
                });
            }
        } catch (error) {
            toast.error('something went wrong!', {
                position: "top-right"
            });
            console.error(error);
        }
    };

    return (
        <>
            <CModal
                alignment="center"
                visible={open}
                onClose={onClose}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">Upload excel</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow classNameName="pb-2">
                        <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">XLXS</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" accept=".xlsx" onChange={onFileChange} />
                            </label>
                        </div>
                        {message && <p>{message}</p>}

                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={onClose}>
                        Close
                    </CButton>
                    <CButton color="primary" type="submit" onClick={uploadExcel}>Upload Excel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}