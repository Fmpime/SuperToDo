import {UniqueIdentifier} from "@dnd-kit/core";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {CSSProperties} from "react";


export function useTimeBlockSortable(id:UniqueIdentifier){
    const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id})
    const style= transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
return {attributes,listeners,setNodeRef,transform,transition,style}
}