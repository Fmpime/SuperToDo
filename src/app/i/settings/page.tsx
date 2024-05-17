import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constants/seo.constants";
import Settings from "@/app/i/settings/Settings";
import Heading from "@/components/ui/Heading";
import classes from "./Settings.module.css";


export const metadata:Metadata = {
    title:'Settings',
    ...NO_INDEX_PAGE

}
const Page = () => {
    return (
        <div>
            <Heading value={"Settings"}></Heading>
            <Settings></Settings>
        </div>
    );
};

export default Page;