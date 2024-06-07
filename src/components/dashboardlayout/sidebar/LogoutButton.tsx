import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


const LogoutButton = () => {
    const {push} = useRouter()
    const {mutate} =useMutation({
        mutationKey:['out'],
        mutationFn: ()=>authService.logout(),
        onSuccess(){
            toast.success('Successfully logout!')
            push("/auth")
        }
    })
    return (
            <button onClick={()=>mutate()} className={"button"}>Logout</button>
    );
};

export default LogoutButton;