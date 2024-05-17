import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {taskService} from "@/services/task.service";
import {TypeTaskFormState} from "@/type/task.types";


const UseCreateTask = () => {
    const queryClient = useQueryClient()
    const {mutate:createTask} = useMutation({
        mutationKey:['create task'],
        mutationFn:(data:TypeTaskFormState) =>taskService.createTask(data),
        onSuccess(){
            toast.success('Successfully create task!')
            queryClient.invalidateQueries({queryKey:['tasks']})
        }
    })
    return {createTask}
};

export default UseCreateTask;