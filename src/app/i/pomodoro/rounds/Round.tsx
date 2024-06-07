import React, {useEffect, useState} from 'react';

const Round = ({round,activeRound}) => {
    const [variant,setVariant] = useState("pomodoro-round")

    useEffect(() => {
            if (round.isCompleted===true) {
                setVariant("pomodoro-round-completed")
                return
            }
            if (activeRound?.id === round.id) {
                setVariant("pomodoro-round pomodoro-round-true")
                return;
            }
            else {
                setVariant("pomodoro-round")
                return;
            }
    }, [activeRound?.id,round.isCompleted]);
    return (
        <div className={variant}>
        </div>
    );
};

export default Round;