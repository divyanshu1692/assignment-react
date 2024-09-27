import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { CButton, CCol, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";

const UPDATE_CONTACT = gql`
  mutation($contact: UserInput1!) {
    updateContact(contact: $contact) {
      name
    }
  }
`;

const GET_CONTACT = gql`
  query($getContactId: ID!) {
    getContact(id: $getContactId) {
        id
        name
        email
        phone
        address
    }
}
`;

export default function Modal({ open, onClose, details, refetch }) {
    const [updateContact, { loading: updateLoading }] = useMutation(UPDATE_CONTACT);
    const [getContact, { data, loading, error }] = useLazyQuery(GET_CONTACT);
    const { handleSubmit, register, reset } = useForm();

    if (error) return <p>Error: {error.message}</p>;

    useEffect(() => {
        if (details.id) {
            getContact({
                variables: {
                    getContactId: details.id, // Pass the contact ID to the query
                },
            });
            if (data) {
                let { __typename, ...rest } = data.getContact;
                reset(rest);
            }
        }
    }, [details, loading]);

    if (loading) {
        return "loading..."
    }

    // get by id api call will handle here
    const handleUpdate = async (values) => {
        try {
            const res = await updateContact({
                variables: {
                    contact: values,
                },
            });

            if (res.data.updateContact) {
                toast.success('Data Updated successfully', {
                    position: "top-right"
                });
                reset();
                onClose()
                refetch();
            } else {
                toast.error('something went wrong!', {
                    position: "top-right"
                });
            }

        } catch (err) {
            toast.error('something went wrong!', {
                position: "top-right"
            });
            console.error(err);
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
                <form onSubmit={handleSubmit(handleUpdate)}>
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