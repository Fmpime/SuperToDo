"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthForm} from "@/type/auth.types";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {toast} from "sonner";
import {DASHBOARD_PAGES} from "@/config/pages-url.config";
import classes from "@/components/ui/form/Form.module.css";
import Field from "@/components/ui/form/Field";
import Heading from "@/components/ui/Heading";

const Auth = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<IAuthForm>({mode: "onChange"})
    const [isLoginForm, setIsLoginForm] = useState(false)
    const {push} = useRouter()
    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess() {
            toast.success('Successfully login!')
            reset()
            push(DASHBOARD_PAGES.HOME)
        }
    })
    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }
    return (
        <div className={"authFormBlock"}>
            <form className={"authForm"} onSubmit={handleSubmit(onSubmit)}>
                <Heading value={"Sign up"}/>
                <Field
                    {...register("email", {
                        required: "email is required"
                    })}
                    id={"email"}
                    label={"Email:"}
                    name={"email"}
                    type={"email"}>

                </Field>
                <Field
                {...register("password", {
                    required: "Password is required"
                })}
                id={"password"}
                label={"Password:"}
                name={"password"}
                type={undefined}></Field>
                <div className={"authBtn"}>
                    <button onClick={() => setIsLoginForm(true)} type="submit" className={"button"}>
                        Login
                    </button>
                    <button onClick={() => setIsLoginForm(false)} type="submit" className={"button"}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;