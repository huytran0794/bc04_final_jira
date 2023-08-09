/* import local components */
import EditTaskForm from "../../../../core/Components/Forms/Task/EditTaskForm";

/* import local hooks for redux */
import { useAppDispatch, useAppSelector } from "../../../../core/hooks/redux/useRedux";
import { InterfaceProject, IProjectDetail } from "../../../../core/models/Project/Project.interface";

/* import local interfaces */
import { ITask } from "../../../../core/models/Task/Task.Interface";
import { modalActions } from "../../../../core/redux/slice/modalSlice";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";
import PROJECT_SERVICE from "../../../../core/services/projectServ";

/* import local service */
import TASK_SERVICE from "../../../../core/services/taskServ";
import toastify from "../../../../core/utils/toastify/toastifyUtils";

import { useEffect } from "react";
import { getAllInfoThunk, getTaskDetailThunk, getTaskUsersThunk, taskActions } from "../../../../core/redux/slice/taskSlice";

interface IEditTask {
    project?: InterfaceProject,
    task: ITask,
}

const EditTask = ({ project, task }: IEditTask) => {
    return (
        <div className="form-wrapper min-w-full">
            <div className="form-body">
                <EditTaskForm
                    layout="vertical"
                    size="large"
                    project={project}
                    task={task}
                    buttonText="create task"
                />
            </div>
        </div>
    );
};

export default EditTask;
