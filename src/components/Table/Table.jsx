"use client";
import { CAvatar, CBadge, CButton, CCardBody, CCollapse } from "@coreui/react"
import { useState } from "react";
import { CSmartTable } from '@coreui/react-pro'
import '@coreui/coreui/dist/css/coreui.min.css'
import Modal from "./Modal";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { IconEdit, IconTrash } from '@tabler/icons-react';

const DELETE_CONTACT = gql`
  mutation($deleteContactId: ID!) {
    deleteContact(id: $deleteContactId) {
      name
    }
}
`;
export default function Table({ data, refetch }) {
    const [details, setDetails] = useState([]);
    const updatedData = data.map((item) => ({ ...item, avatar: item.image }))
    const [open, setOpen] = useState(false);
    const [deleteContact] = useMutation(DELETE_CONTACT);


    const columns = [
        {
            key: 'avatar',
            label: '',
            filter: false,
            sorter: false,
        },
        {
            key: 'name',
            _style: { width: '20%' },
        },
        {
            key: 'email',
            sorter: (date1, date2) => {
                const a = new Date(date1.registered)
                const b = new Date(date2.registered)
                return a > b ? 1 : b > a ? -1 : 0
            }
        },
        {
            key: 'address',
            _style: { width: '20%' }
        },
        'phone',
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
        },
    ]

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = (item) => {
        setDetails(item)
        setOpen(true);
    }

    const handleDeleteRecord = async (item) => {
        try {
            const res = await deleteContact({
                variables: { deleteContactId: item.id }
            });

            if (res.data.deleteContact) {
                toast.success('Data deleted successfully', {
                    position: "top-right"
                });
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
        }
    }

    return (
        <>
            <Modal open={open} onClose={handleClose} details={details} refetch={refetch} />
            <CSmartTable
                activePage={2}
                cleaner
                clickableRows
                columns={columns}
                columnFilter
                columnSorter
                items={updatedData}
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
                onFilteredItemsChange={(items) => {
                    console.log(items)
                }}
                onSelectedItemsChange={(items) => {
                    console.log(items)
                }}
                scopedColumns={{
                    avatar: (item) => {
                        return (
                            <td>
                                <CAvatar src={`${item.avatar}`} />
                            </td>
                        )
                    },

                    show_details: (item) => {
                        return (
                            <td className="py-2">
                                <button onClick={() => handleOpen(item)}><IconEdit /></button>
                                <button onClick={() => {
                                    handleDeleteRecord(item)
                                }}><IconTrash /></button>
                            </td>
                        )
                    }
                }}
                // selectable
                sorterValue={{ column: 'status', state: 'asc' }}
                tableFilter
                tableProps={{
                    className: 'add-this-class',
                    responsive: true,
                    striped: true,
                    hover: true,
                }}
                tableBodyProps={{
                    className: 'align-middle'
                }}
            />
        </>
    )
}