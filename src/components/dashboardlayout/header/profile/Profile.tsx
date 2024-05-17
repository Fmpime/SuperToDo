import {useProfile} from "@/hooks/useProfile";
import Image from 'next/image'
import imgUser from "../../../../icons/user.png"
import imgList from "../../../../icons/down-chevron.png"
export function Profile(){
    const{data,isLoading} = useProfile()

    return (
        <div className={"headerProfile"}>
            <Image  alt={"User"} src={imgUser} width={50}   />
            <div >
                <div>{data?.user?.name}</div>
                <div>{data?.user?.email}</div>
            </div>
            <Image  alt={"User"} src={imgList} width={10}   />
        </div>
            )

}