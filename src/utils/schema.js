// import * as yup from 'yup';

//regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

// export const registerSchema = yup.object().shape({
//     regEmail: yup.string().email("please enter a valid email").required("required"),
//     confirmEmail: yup.string().oneOf([yup.ref('regEmail')], "Emails do not match").required("required"),
//     regPassword: yup
//     .string()
//     .min(5,"Password must be more than 5 characters")
//     .max(15,"Password must not be more than 15 characters")
//     .matches(passwordRegex, { message: "1 upper case letter, 1 lower case letter, 1 numeric digit" })
//     .required("required"),
//     userName: yup.string().required("required"),
//     dateOfBirth: yup.string().required("required"),
//     gender: yup.string().required("required")
// })