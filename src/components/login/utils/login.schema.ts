import * as Yup from 'yup';
import type {LoginValues} from "../types/loginValues.ts";

export const loginSchema = Yup.object().shape<Record<keyof LoginValues, Yup.AnySchema>>({
    username: Yup.string().required("El nombre del usuario es requido"),
    password: Yup.string().required("La contraseña es requerida")
});