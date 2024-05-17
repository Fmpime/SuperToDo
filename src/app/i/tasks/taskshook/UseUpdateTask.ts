import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {taskService} from "@/services/task.service";
import {TypeTaskFormState} from "@/type/task.types";



const UseUpdateTask = (key?:string) => {
    const queryClient = useQueryClient()
    const {mutate:updateTask} = useMutation({
        mutationKey: ['create task', key],
        mutationFn: ({id,data}:{id:string,data:TypeTaskFormState}) =>taskService.updateTasks(id, data),
        onSuccess(){
            toast.success('Successfully update task!')
            queryClient.invalidateQueries({queryKey:['tasks']})
        }
    })

    return {updateTask}
};

export default UseUpdateTask;