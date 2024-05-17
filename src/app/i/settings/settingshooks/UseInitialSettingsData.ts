import {useProfile} from "@/hooks/useProfile";
import {useEffect} from "react";
import {TypeUserForm} from "@/type/auth.types";
import {UseFormReset} from "react-hook-form";


const UseInitialSettingsData = (reset:UseFormReset<TypeUserForm> ) => {
    const {data,isSuccess} = useProfile()
    useEffect(()=>{
        if (isSuccess) {
            reset({
                email: data?.user.email,
                name: data?.user.name,
                breakInterval: data?.user.breakInterval,
                intervalsCount: data?.user.intervalsCount,
                workInterval: data?.user.workInterval,
                password:undefined
            })
        }
    },[isSuccess ])
};

export default UseInitialSettingsData;