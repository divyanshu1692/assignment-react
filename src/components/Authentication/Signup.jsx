"use client";

import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SIGNUP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

export default function Signup() {
    const { push } = useRouter();
    const { handleSubmit, register } = useForm();
    const [signup, { data, loading, error }] = useMutation(SIGNUP);
    const handleSignup = async (values) => {
        try {
            const res = await signup({
                variables: values,
            });            
            
            if(res.data.signup) {
                toast.success('User signup successfully', {
                    position: "top-right"
                });
                push("/")
            } else {
                toast.error('something went wrong!', {
                    position: "top-right"
                });
            }
        } catch (error) {
            toast.error('something went wrong!', {
                position: "top-right"
            });
            console.log("error while signup", error.message);
        }
    }
    return (
        <>
            <div className="bg-sky-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={handleSubmit(handleSignup)}>
                        <div className="mb-4 bg-sky-100">
                            <label for="username" className="block text-gray-600">Username</label>
                            <input type="text" id="username" name="username" className="w-full border  text-[#000] border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" {...register("username", {
                                required: true
                            })} />
                        </div>
                        <div className="mb-4 bg-sky-100">
                            <label for="email" className="block text-gray-600">Email</label>
                            <input type="text" id="email" name="email" className="w-full text-[#000] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"  {...register("email", {
                                required: true
                            })} />
                        </div>
                        <div className="mb-4">
                            <label for="password" className="block text-gray-800">Password</label>
                            <input type="password" id="password" name="password" className="w-full  text-[#000] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" {...register("password", {
                                required: true
                            })} />
                        </div>
                        <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Signup</button>
                    </form>
                    <div className="mt-6 text-green-500 text-center">
                        <Link href="/" className="hover:underline">Signin Here</Link>
                    </div>
                </div>
            </div>
        </>
    )
}