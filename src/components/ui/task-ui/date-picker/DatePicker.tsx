
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from "lucide-react";
import {useState} from "react";
import {DayPicker, SelectSingleEventHandler} from "react-day-picker";
import {formatCaption} from "./DatePicker.format";
import {useOutside} from "@/hooks/useOutside";




dayjs.extend(LocalizedFormat)
interface DatePickerTypeProps {
    onChange:(value:string) =>void
    value:string
    position?:"left" | "right"
}
export function DatePicker
({onChange,value}:DatePickerTypeProps){
    const [selected,setSelected] = useState<Date>()
    const {isShow, setIsShow,ref} = useOutside(false)
    const handleDaySelect:SelectSingleEventHandler = date=>{
        const ISOdate = date?.toISOString()
        setSelected(date)
        if (ISOdate){
            onChange(ISOdate)
            setIsShow(false)
        }else {
            onChange("")
            setIsShow(false)
        }
    }
    return(
        <div ref={ref}  >
            <button onClick={()=>setIsShow(!isShow)}>
                {value? dayjs(value).format('LL'):'Click for select'}
            </button>
            {value&&(
                <button onClick={()=>onChange('')}>
                    <X size={14}/>
                </button>

            )}
            {isShow&&(
                <div className={"slide"}>
                    <DayPicker
                    fromYear={2023}
                    toYear={2054}
                    initialFocus={isShow}
                    mode='single'

                    defaultMonth={selected}
                    selected={selected}
                    onSelect={handleDaySelect}
                    weekStartsOn={1}
                    formatters={{formatCaption}}
                    >

                    </DayPicker>
                </div>
            )}
        </div>
    )
}