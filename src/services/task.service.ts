import {axiosWithAuth} from "@/api/interceptors";
import {ITaskResponse, TypeTaskFormState} from "@/type/task.types";


class TaskService{
    private BASE_URL = '/user/tasks'

    async getTasks(){
        return await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
    }
    async createTask(data: TypeTaskFormState){
        return await axiosWithAuth.post(this.BASE_URL,data)
    }
    async updateTasks(id:string, data:TypeTaskFormState){
        return await axiosWithAuth.put(`${this.BASE_URL}/${id}`,data)
    }
    async deleteTasks(id:string){
        return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    }




}
export const taskService = new TaskService()