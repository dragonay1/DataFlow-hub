import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, TextField, Typography, InputAdornment, Button} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {useFormik} from "formik";
import type {LoginValues} from "../components/login/types/loginValues.ts";
import {loginSchema} from "../components/login/utils/login.schema.ts";
import {usePostLoginMutation} from "../shared/services/authentication.service.ts";
import {useDispatch} from "react-redux";
import {setIsAuthenticated, setUserData} from "../store/slices/authSlice.ts";

function Login() {
    const navigate = useNavigate();

    const [login, {data, isSuccess, isError, error: loginError}] = usePostLoginMutation();

    const dispatch = useDispatch();

    const initialValues = useMemo(() => ({
        username: '',
        password: ''
    }), [])

    const formik = useFormik<LoginValues>({
        initialValues,
        validationSchema: loginSchema,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values);

            await login({
                email: values.username,
                password: values.password
            })
        }
    })

    const [error, setError] = useState("");

    useEffect(() => {
        if (isError && loginError) {
            console.log('error', loginError);
            // @ts-ignore
            if('data' in loginError && 'message' in loginError.data && typeof loginError.data.message === 'string')
            {
                setError(loginError?.data?.message?.toString())
            }
        }
        dispatch(setIsAuthenticated(false))
    }, [isError, error])

    useEffect(() => {
        if (isSuccess && data) {
            console.log('data', data);
            dispatch(setUserData(data.data))
            dispatch(setIsAuthenticated(true))
        }
    }, [isSuccess, data]);

    return (
        <Box className="flex items-center justify-center h-screen bg-gray-100">
            <Box
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <Typography className="text-xl font-bold mb-4 text-center">
                    Iniciar Sesión
                </Typography>
                {error && (
                    <Typography className="text-red-500 text-sm mb-2">{error}</Typography>
                )}

                <Box className="flex flex-col mb-3">
                    <TextField
                        label='Usuario'
                        className='w-full'
                        name='username'
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        onChange={formik.handleChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon className='text-blue-500'/>
                                    </InputAdornment>
                                ),
                            },
                        }}/>
                    {formik.touched.username && Boolean(formik.errors.username) && (
                        <Typography className="text-red-500 text-sm pl-1">{formik.errors.username}</Typography>
                    )}
                </Box>

                <Box className="flex flex-col mb-3">
                    <TextField
                        label='Contraseña'
                        type='password'
                        className='w-full'
                        name='password'
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        onChange={formik.handleChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon className='text-blue-500'/>
                                    </InputAdornment>
                                ),
                            },
                        }}/>
                    {formik.touched.password && Boolean(formik.errors.password) && (
                        <Typography className="text-red-500 text-sm">{formik.errors.password}</Typography>
                    )}
                </Box>
                <Button
                    variant='contained'
                    className='w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white p-2 rounded'
                    disabled={!formik.isValid || formik.isSubmitting}
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                >Entrar
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
