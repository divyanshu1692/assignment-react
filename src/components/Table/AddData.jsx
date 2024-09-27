import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { CButton, CCol, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";

const ADD_CONTACT = gql`
  mutation($contact: UserInput!) {
    addContacts(contact: $contact) {
      name
    }
  }
`;

export default function AddData({ open, onClose, refetch }) {
    const [addContacts] = useMutation(ADD_CONTACT);
    const { handleSubmit, register, reset } = useForm();

    const handleAddContact = async (values) => {
        try {
            const res = await addContacts({
                variables: {
                    contact: values,
                },
            });

            if (res.data.addContacts) {
                toast.success('Data added successfully', {
                    position: "top-right"
                });
                reset();
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
            console.log("Error while adding contact", error.message);
        }
    }

    return (
        <>
            <CModal
                alignment="center"
                visible={open}
                onClose={onClose}
                aria-labelledby="VerticallyCenteredExample"
            >
                <form onSubmit={handleSubmit(handleAddContact)}>
                    <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample">Edit details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CRow className="pb-2">
                            <CCol xs>
                                <CFormInput type="text" placeholder="Name" aria-label="name" {...register("name")} />
                            </CCol>
                            <CCol xs>
                                <CFormInput type="text" placeholder="Email" aria-label="Last name"  {...register("email")} />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs>
                                <CFormInput type="text" placeholder="Phone" name="phone" {...register("phone")} />
                            </CCol>
                            <CCol xs>
                                <CFormInput type="text" placeholder="Address" name="address" {...register("address")} />
                            </CCol>
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={onClose}>
                            Close
                        </CButton>
                        <CButton color="primary" type="submit">Save changes</CButton>
                    </CModalFooter>
                </form>
            </CModal>
        </>
    )
}