import classes from "./Tasks.module.css";
import Heading from "@/components/ui/Heading";
import Tasks from "@/app/i/tasks/Tasks";

const TaskPage = () => {
    return (
        <div >
            <Heading value={"Tasks"}></Heading>
            <Tasks></Tasks>
        </div>
    );
};

export default TaskPage;