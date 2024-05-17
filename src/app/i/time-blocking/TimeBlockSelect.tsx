import {useOutside} from "@/hooks/useOutside";
import {X} from "lucide-react";


interface SelectTypeProps {
    onChange: (value: string|null) => void
    data: Option[]
    value: string
}

export interface Option {
    label: string
    value: string
}

export function TimeBlockSelect({data, onChange, value}: SelectTypeProps) {
    const {isShow, setIsShow, ref} = useOutside(false)
    const getValue = () => data.find(item => item.value === value)?.value
    return (
        <div ref={ref} className={`slide`} style={{color:"white"}}>
            <button onClick={(e) => {
                e.preventDefault()
                setIsShow(!isShow)
            }}>
                {getValue() ? (<div style={{color: "white"}}>{getValue()}</div>) : (<div>Click for select</div>)}
            </button>
            {value && (
                <button onClick={(e) => {
                    e.preventDefault()
                    onChange('null')
                }}>
                    <X  size={14}/>
                </button>

            )}
            {isShow && (
                <div style={{display:'flex',flexDirection:'column',alignItems:'start'}} className={`slide`}>
                    {data.map(item => (
                        <button className={`slide`} key={item.value}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onChange(item.value)
                                    setIsShow(false)
                                }}
                        >
                            <div>{item.label}</div>
                        </button>
                    ))}
                </div>
            )}

        </div>)
}