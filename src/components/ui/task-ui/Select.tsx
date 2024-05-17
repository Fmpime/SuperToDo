import {useOutside} from "@/hooks/useOutside";
import {X} from "lucide-react";

interface SelectTypeProps {
    onChange: (value: string) => void
    data: Option[]
    value: string
    isColorSelect?: boolean
}

export interface Option {
    label: string
    value: string

}

export function Select({data, onChange, value, isColorSelect}: SelectTypeProps) {
    const {isShow, setIsShow, ref} = useOutside(false)
    const getValue = () => data.find(item => item.value === value)?.value
    return (
        <div ref={ref}>
            <button onClick={(e) => {
                e.preventDefault()
                setIsShow(!isShow)
            }}>
                {getValue() ? (<div style={{color: `$red`}}>{getValue()}</div>) : (<div>Click for select</div>)}
            </button>
            {value && (
                <button onClick={(e) => {
                    e.preventDefault()
                    onChange('')
                }}>
                    <X size={14}/>
                </button>

            )}
            {isShow && (
                <div>
                    {data.map(item => (
                        <button key={item.value}
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