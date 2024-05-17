import {useMutation, useQueryClient} from "@tanstack/react-query";

import {taskService} from "@/services/task.service";
import {toast} from "sonner";

const UseDeleteTask = () => {
    const queryClient = useQueryClient()
    const {mutate:deleteTask,isPending} = useMutation({
        mutationKey:['delete task'],
        mutationFn:(id:string)=>taskService.deleteTasks(id),
        onSuccess(){
            toast.success('Successfully delete task!')
            queryClient.invalidateQueries({queryKey:['tasks']})
        }

    })
    return {deleteTask,isPending}
};

export default UseDeleteTask;