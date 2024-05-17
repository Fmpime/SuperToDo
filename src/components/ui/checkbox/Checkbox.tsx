const Checkbox = ({className, onChange, value}: {
    className?: string,
    onChange: () => void,
    value: boolean | undefined
}) => {
    return (
            <input className={className} checked={value} onChange={onChange} type="checkbox"/>
    );
};

export default Checkbox;