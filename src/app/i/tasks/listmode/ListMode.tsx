import {useTasks} from "@/hooks/useTasks";
import {ListRowParent} from "@/app/i/tasks/listmode/listrow/ListrowParent";
import {DragDropContext} from "@hello-pangea/dnd";
import {useTaskDnd} from "@/app/i/tasks/taskshook/useTaskDnd";
import {COLUMNS} from "@/app/i/tasks/columns/columns.data";
import Loader from "@/components/ui/loader/Loader";

export function ListMode() {
    const tasks = useTasks()
    const {onDragEnd} = useTaskDnd()
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {tasks.isLoading ? <Loader/>:
                <div className={"ListModeColumns"}>
                    {COLUMNS.map(column => (
                        <ListRowParent value={column.value} key={column.value} items={tasks.items} label={column.label}
                                       setItems={tasks.setItems}></ListRowParent>
                    ))}
                </div>
            }
        </DragDropContext>
    )
}