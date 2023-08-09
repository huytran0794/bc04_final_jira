import { useState } from 'react'
import Container from '../core/Components/Container/Container';
import _ from "lodash";

import { DragDropContext, Draggable, DraggableId, Droppable } from "react-beautiful-dnd"
import { Space } from 'antd';

interface ITaskItem {
    id: string;
    taskName: string;
}

interface ITaskCol {
    id: string;
    items: ITaskItem[];
}

interface IProjectTask {
    [key: string]: ITaskCol;
}

interface Combine {
    draggableId: string;
    droppableId: string;
}

interface DraggableLocation {
    droppableId: string;
    index: number;
}

interface DragResult {
    reason: 'DROP' | 'CANCEL';
    destination?: DraggableLocation;
    source: DraggableLocation;
    combine?: Combine;
    mode: 'FLUID' | 'SNAP';
    draggableId: DraggableId;
}



const TestDnd = () => {
    let data = {
        todo: {
            id: 'todo',
            items: [
                { id: '1', taskName: 'task 1' },
                { id: '2', taskName: 'task 2' },
                { id: '3', taskName: 'task 3' },
            ],
        },
        inProgress: {
            id: 'inProgress',
            items: [
                { id: '4', taskName: 'task 4' },
                { id: '5', taskName: 'task 5' },
                { id: '6', taskName: 'task 6' },
            ],
        },
        done: {
            id: 'done',
            items: [
                { id: '7', taskName: 'task 7' },
                { id: '8', taskName: 'task 8' },
                { id: '9', taskName: 'task 9' },
            ],
        },

    };
    const [state, setState] = useState<IProjectTask>(data);
    const handleDragEnd = (result: DragResult) => {
        console.log('drag end result');
        console.log(result)

        let { destination: dest, source }: DragResult = result;
        // neu ma ko keo toi duoc dia diem nao => return
        if (!dest) {
            return;
        }

        // drag n drop tai vi tri hien tai => return
        if (dest.index === source.index && dest.droppableId === source.droppableId) {
            return;
        }

        // tao ra 1 tag drag
        let clonedItem: ITaskItem = JSON.parse(JSON.stringify(state[source.droppableId].items[source.index]));


        // thong tin droppable khi keo
        let dropSource = state[source.droppableId].items.filter(item => item.id !== clonedItem.id);

        state[source.droppableId].items = [...dropSource];

        console.log("dropSource");
        console.log(dropSource);

        // thong tin droppable khi tha
        let dropDest = state[dest.droppableId].items
        console.log("dropDest");
        console.log(dropDest)

        dropDest.splice(dest.index, 0, clonedItem);
        console.log("dropDest after insert");
        console.log(dropDest)

        setState(state)

    };

    const renderDragCardList = (cardList: ITaskItem[]) => {
        return <div className="col-items-list w-full flex gap-2 flex-col items-center justify-center">
            {
                cardList.map((item, idx) => {
                    return (
                        <Draggable key={item.id.toString()} index={idx} draggableId={item.id}>
                            {
                                (provided) => {
                                    return (
                                        <div
                                            className='py-3 px-6 bg-white text-center'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.taskName}
                                        </div>
                                    )
                                }
                            }
                        </Draggable>
                    )
                })
            }
        </div>
    }

    const renderData = () => {
        return _.map(state, (status, idx) => {
            return (
                <Droppable
                    key={status.id + idx}
                    droppableId={status.id}
                >
                    {
                        (provided) => {
                            return (
                                <div
                                    className='col bg-slate-400/50  border border-solid text-gray-400 p-5 w-[300px] capitalize rounded-md shadow-lg flex flex-col gap-2 items-center justify-center'
                                    key={status.id} 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className="col-title">{status.id}</div>
                                    {renderDragCardList(status.items)}
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    }
                </Droppable>
            );
        });
    }

    return (
        <Container>
            <div className="text-center"> Demo Drag n Drop</div>
            <div className="content mt-5">
                <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                    <Space size={'large'} align={'center'} direction={'horizontal'} className='w-full justify-center'>
                        {renderData()}
                    </Space>
                </DragDropContext>

            </div>
        </Container>
    )
}

export default TestDnd