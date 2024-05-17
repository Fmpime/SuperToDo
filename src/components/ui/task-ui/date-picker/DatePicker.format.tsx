import {DateFormatter} from "react-day-picker";
import dayjs from "dayjs";
import classes from "./DatePicer.module.css"
const seasonEmoji:Record<string, string>={
    winter: '❄',
    newYear:'🎄',
    spring: '🌸',
    summer:'☀️',
    autumn:'🍂'
}
const getSeason = (month:Date):keyof typeof seasonEmoji=> {
    const monthNumber = month.getMonth()+1
    if (monthNumber>2&&monthNumber<6) return 'spring'
    if (monthNumber>5&&monthNumber<9) return 'summer'
    if (monthNumber>8&&monthNumber<12) return 'autumn'
    if (monthNumber===12) return 'newYear'
    else return 'winter'

}

export const formatCaption:DateFormatter = month =>{
    const season = getSeason(month)

    return(
        <div className={classes.dateBlock}>
            <span
            role="img"
            aria-label={season}
            >
                {seasonEmoji[season]}
            </span>
            {dayjs(month).format('DD-MM-YYYY')}
        </div>
    )
}