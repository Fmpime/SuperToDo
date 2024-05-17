"use client"
import {useProfile} from "@/hooks/useProfile";
import Loader from "@/components/ui/loader/Loader";


const Statistics = () => {
    const {data,isLoading} = useProfile()
    return isLoading? (<Loader ></Loader>
    ):(
        <div className={"statisticPage"} >
            {data?.statistics.length ? data.statistics.map((statistic,index)=>(
                <div key={`statistic ${index}`} className={"statisticPageItem"}>
                    <div >{statistic.label}</div>
                    <div>{statistic.value}</div>
                </div>
            )):<div>Statistic not found</div>}
        </div>
    )
    
};
export default Statistics;