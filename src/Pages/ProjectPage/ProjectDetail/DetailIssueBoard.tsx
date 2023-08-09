import { useRef, useEffect } from "react";

/* import local components */
import TaskCard from '../../../core/Components/Forms/Task/TaskCard';
import EditTask from './Task/EditTask';
import EditTaskHeader from './Task/EditTaskHeader';

/* import local interfaces */
import { InterfaceProject, IProjectDetail } from '../../../core/models/Project/Project.interface';
import { ITask, ITaskDetailList } from '../../../core/models/Task/Task.Interface';
import { DragResult } from '../../../core/models/DragnDrop/Dragndrop.interface';

/* import redux hooks */

import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux/useRedux';
import { modalActions } from '../../../core/redux/slice/modalSlice';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ProjectTaskStatusCol from './ProjectTaskStatusCol';
import TASK_SERVICE from '../../../core/services/taskServ';
import PROJECT_SERVICE from '../../../core/services/projectServ';
import { projectActions } from '../../../core/redux/slice/projectSlice';

const DetailIssueBoard = ({ project }: IProjectDetail) => {
    let dispatch = useAppDispatch();
    let modalProps = useAppSelector(state => state.modalReducer.modalProps);

    const handleEditTask = (task: ITask) => {
        dispatch(modalActions.setUpModal({ ...modalProps, width: 1000, headerContent: <EditTaskHeader /> }));
        dispatch(modalActions.openModal(<EditTask task={task} project={project} />));
    };
    const handleDragEnd = async (result: DragResult) => {
        console.log('drag end result');
        console.log(result)

        let { destination: dest, source, draggableId }: DragResult = result;

        let taskDragged: ITask = JSON.parse(draggableId);

        // neu ma ko keo toi duoc dia diem nao => return
        if (!dest) {
            console.log('lam gi co diem den')
            return;
        }

        // drag n drop tai vi tri hien tai => return
        if (dest.index === source.index && dest.droppableId === source.droppableId) {
            console.log('dang keo tai cho nen khong can update');
            return;
        }

        // thong tin droppable khi tha
        TASK_SERVICE.updateTaskStatus({ taskId: taskDragged.taskId, statusId: dest.droppableId })
            .then((res) => {
                PROJECT_SERVICE.getDetails(taskDragged.projectId)
                    .then((res) => {
                        dispatch(projectActions.putProjectDetail({
                            id: res.content.id,
                            projectName: res.content.projectName,
                            description: res.content.description,
                            categoryName: res.content.projectCategory.name,
                            categoryId: res.content.projectCategory.id,
                            projectCategory: res.content.projectCategory,
                            creator: res.content.creator,
                            lstTask: res.content.lstTask,
                            members: res.content.members,
                            alias: res.content.alias,
                        }));
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const renderProjectCard = (lstTaskDeTail: ITask[]) => {
        if (lstTaskDeTail.length) {
            return lstTaskDeTail.map((taskDetail: ITask, idx: number) => {
                return (
                    <TaskCard
                        key={taskDetail.taskId.toString() + idx}
                        taskDetail={taskDetail}
                        idx={idx}
                        handleEditTask={handleEditTask}
                    />
                )
            })
        }
    }

    const renderProjectStatusCol = (project: InterfaceProject) => {
        return project?.lstTask.map((taskDetailList: ITaskDetailList, idx: number) => {
            return (
                <ProjectTaskStatusCol
                    idx={idx}
                    key={taskDetailList.statusId.toString() + idx}
                    taskDetailList={taskDetailList}
                    renderProjectCard={renderProjectCard}
                />
            )
        })
    }

    const renderProjectBoard = (project: InterfaceProject) => {
        return (
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="wrapper project__board flex items-stretch gap-5">
                    {renderProjectStatusCol(project)}
                </div>
            </DragDropContext>

        )
    };

    return (
        <>{renderProjectBoard(project)}</>
    )
}

export default DetailIssueBoard