'use server'

import { apiBaseUrl } from '@/config/env';
import { post } from '@/util/api';
import { z } from 'zod'

const schema = z.object({
    email: z.string().email('Invalid Email'),
})

export const LoginAction = async (state: any, formData: FormData) => {
    const rawFormData = {
        email: formData.get('email'),
        password: formData.get('password'),
        remember: !!formData.get('remember'),
    }
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
    })

    console.log(rawFormData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Call the backend API for login
    // Assume util/api has been set up to call the backend API and is available for import at the top of the file,
    // but since imports aren't allowed at this point, we'll assume `post` is in scope.
    // The backend login route is usually something like '/api/auth/login'.
    // We'll pretend the endpoint is at `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
    // but if you need to adjust this path, do so to fit your actual API.

    // To use 'post', you must ensure it is imported at the top: import { post } from "@/util/api"
    // const loginEndpoint = `${apiBaseUrl}/api/auth/login`;

    // const response = await post(
    //     loginEndpoint,
    //     {
    //         email: rawFormData.email,
    //         password: rawFormData.password,
    //         remember: rawFormData.remember,
    //     }
    // );


    // console.log(response)
}