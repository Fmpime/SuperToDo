
import React, {useState} from 'react';
import {UseTimeBlocking} from "@/app/i/time-blocking/timeblockhooks/useTimeBlocking";
import TimeBlockItem from "@/app/i/time-blocking/TimeBlockItem";
import {ITimeBlockResponse} from "@/type/time-block.types";
import {UseCreateTimeBlock} from "@/app/i/time-blocking/timeblockhooks/useCreateTimeBlock";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useTimeBlockDnd} from "@/app/i/time-blocking/timeblockhooks/TimeBlockDnd";
import {useTimeBlockSortable} from "@/app/i/time-blocking/timeblockhooks/dnd/useTimeBlockSortable";

function BlockAddRowInput(props: {
    setItems: (value: (((prevState: (ITimeBlockResponse[] | undefined)) => (ITimeBlockResponse[] | undefined)) | ITimeBlockResponse[] | undefined)) => void,
    placeholder: string,
    refetch: () => void
}) {
    const {createTimeBlock} = UseCreateTimeBlock(props.refetch)
    const addRow = () => {
        createTimeBlock(
            {
                name: '',
                duration: 0,
                order: 0,
            })

    }
    return (
        <div>
            <button
                onClick={addRow}
            >
                {props.placeholder}
            </button>
        </div>
    );
}

const TimeBlocking = () => {
    const {items, setItems, refetch} = UseTimeBlocking()
    const {sensors,handleDragEnd}=useTimeBlockDnd(items,setItems)
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div>
            <SortableContext items={items||[]} strategy={verticalListSortingStrategy}>
            {items ? items.map((block, id) =>
                    (
                            <TimeBlockItem
                                key={block.id}
                                name={block.name}
                                color={block.color}
                                duration={block.duration}
                                order={block.order}
                                id={block.id}
                                refetch={refetch}
                            />
                    )
                ) :
                <div>time-blocking items not found</div>
            }
            </SortableContext>
            <div>
                <BlockAddRowInput
                    placeholder={"Add time-block"}
                    setItems={setItems}
                    refetch={refetch}
                />
            </div>
        </div>
        </DndContext>
    );
};

export default TimeBlocking;