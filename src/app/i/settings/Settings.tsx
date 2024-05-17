"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {TypeUserForm} from "@/type/auth.types";
import useInitialSettingsData from "@/app/i/settings/settingshooks/UseInitialSettingsData";
import useUpdateSettings from "@/app/i/settings/settingshooks/UseUpdateSettings";
import Field from "@/components/ui/form/Field";
import Loader from "@/components/ui/loader/Loader";



const Settings = () => {
    const {register,handleSubmit, reset} = useForm<TypeUserForm>({
        mode: 'onChange'
    })
    useInitialSettingsData(reset)
    const {mutate, isPending} = useUpdateSettings()

    const onSubmit: SubmitHandler<any> = (data) => {
        const {password,workInterval,breakInterval,intervalsCount, ...rest} = data
        mutate({
            ...rest,
            workInterval:Number(workInterval),
            breakInterval:Number(breakInterval),
            intervalsCount:Number(intervalsCount),
            password: password || undefined
        })
    }

    if (isPending){
        return <Loader></Loader>
    }
    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit)}>
                <Field
                    {...register("email",{
                        required:"email is required"
                    })}
                    name={"email"} type={"email"} id={"email"} label={"email"}></Field>
                <Field
                    {...register("password",{
                        required:"password is required"
                    })}
                    placeholder={"PASS"}  name={"password"} type={"password"} id={"password"} label={"password"}></Field>
                <Field
                    {...register("workInterval",{
                        required:"workInterval is required"
                    })}
                    name={"workInterval"} type={"number"} id={"workInterval"} label={"workInterval"}></Field>
                <Field
                    {...register("breakInterval",{
                        required:"breakInterval is required"
                    })}
                    name={"breakInterval"} type={"number"} id={"breakInterval"} label={"breakInterval"}></Field>
                <Field
                    {...register("intervalsCount",{
                        required:"intervalsCount is required"
                    })}

                    name={"intervalsCount"} type={"number"} id={"intervalsCount"} label={"intervalsCount"}></Field>
                <button  className={"button"}>Submit</button>
            </form>
        </div>
    );
};

export default Settings;