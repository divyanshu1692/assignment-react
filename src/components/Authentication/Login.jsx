"use client";

import Link from "next/link";
import { gql, useMutation } from '@apollo/client';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Define the mutation
const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
      token
    }
  }
`;

export default function Login() {
    const [login, { data, loading, error }] = useMutation(LOGIN);
    const { push } = useRouter();
    const { handleSubmit, register } = useForm();
    const handleLogin = async (values) => {
        try {
            const res = await login({
                variables: values,
            });

            if(res.data.login.token) {
                toast.success('User loggedin successfully', {
                    position: "top-right"
                });
                push("/home")
            } else {
                toast.error('something went wrong!', {
                    position: "top-right"
                });
            }
        } catch (err) {
            toast.error('something went wrong!', {
                position: "top-right"
            });
            console.error('Login failed:', err);
        }
    };
    return (
        <>
            <div className="bg-sky-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="mb-4 bg-sky-100">
                            <label for="email" className="block text-gray-600">Email</label>
                            <input type="text" id="email" name="email" className="w-full  text-[#000] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" {...register("email", {
                                required: true
                            })} />
                        </div>
                        <div className="mb-4">
                            <label for="password" className="block text-gray-800">Password</label>
                            <input type="password" id="password" name="password" className="w-full  text-[#000] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" {...register("password", {
                                required: true
                            })} />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="remember" name="remember" className="text-red-500" />
                            <label for="remember" className="text-green-900 ml-2">Remember Me</label>
                        </div>
                        <div className="mb-6 text-blue-500">
                            <a href="#" className="hover:underline">Forgot Password?</a>
                        </div>
                        <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </form>
                    <div className="mt-6 text-green-500 text-center">
                        <Link href="/signup" className="hover:underline">Sign up Here</Link>
                    </div>
                </div>
            </div>
        </>
    )
}