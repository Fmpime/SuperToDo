"use client"


interface HeadingProps {
    value:string
    size:string
}
const Heading = ({value}) => {
    return (
        <div className={"heading"}>
            <div>{value}</div>
        </div>

    );
};

export default Heading;