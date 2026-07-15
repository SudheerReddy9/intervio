import z from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, 'Full name must be at least 2 characters'),
    email: z
        .email('Please enter a valid email address')
        .trim(),
    password: z
        .string()
        .trim()
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
        .string()
        .trim()
        .min(8, 'Password doesnot Matches'),
    acceptTerms: z.literal(true, {
        error: 'You must accept the Terms and Privacy Policy',
    })

})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });