import {
  ITask,
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from "../models/Task/Task.Interface";
import { projectActions } from "../redux/slice/projectSlice";
import { spinnerActions } from "../redux/slice/spinnerSlice";
import { taskActions } from "../redux/slice/taskSlice";
import { AppDispatch } from "../redux/store/store";
import {
  AXIOS_INSTANCE_GENERATOR,
  BASE_PRIORITY_URL,
  BASE_PROJECT_URL,
  BASE_STATUS_URL,
  BASE_TASK_TYPE_URL,
} from "./configURL";
import PROJECT_SERVICE from "./projectServ";

type TaskTypeResponse = {
  content: ITaskType[];
};

type TaskPriorityResponse = {
  content: ITaskPriority[];
};

type TaskStatusResponse = {
  content: ITaskStatus[];
};

type TaskResponse = {
  content: ITask;
};

type TaskUpdateStatus = {
  taskId: number | string;
  statusId: number | string;
};

let updateRedux = async (dispatch: AppDispatch, task: ITask) => {
  console.log("run first");
  dispatch(taskActions.updateTask(task));
};

let updateProjectDetails = async (dispatch: AppDispatch, task: ITask) => {
  console.log("run second");
  dispatch(PROJECT_SERVICE.getDetailsThunk(task.projectId));
};

const TASK_SERVICE = {
  getAllTaskType: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_TASK_TYPE_URL
    ).get<TaskTypeResponse>(`getAll`);

    return data;
  },
  getAllTaskStatus: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_STATUS_URL
    ).get<TaskStatusResponse>(`getAll`);
    return data;
  },
  getAllTaskPriority: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_PRIORITY_URL
    ).get<TaskPriorityResponse>(`getAll`);
    return data;
  },
  // create task
  createTask: async (taskValues: ITask) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      `createTask`,
      taskValues
    );
    return data;
  },
  // getTaskDetail
  getTaskDetail: async (taskId: string | number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_PROJECT_URL
    ).get<TaskResponse>(`getTaskDetail?taskId=${taskId}`);
    return data;
  },
  // delete task
  deleteTask: async (taskId: string | number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).delete(
      `removeTask?taskId=${taskId}`
    );
    return data;
  },

  updateTaskStatus: async ({ taskId, statusId }: TaskUpdateStatus) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).put(
      `updateStatus`,
      { taskId, statusId }
    );
    return data;
  },

  updateTaskThunk: (task: ITask) => (dispatch: AppDispatch) => {
    AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
      .post(`updateTask`, task)
      .then((res) => {
        (async () => {
          await updateRedux(dispatch, task);
          await updateProjectDetails(dispatch, task);
        })();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteTaskThunk: (task: ITask) => (dispatch: AppDispatch) => {
    dispatch(spinnerActions.setLoadingOn());
    AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
      .delete(`removeTask?taskId=${task.taskId}`)
      .then((res) => {
        PROJECT_SERVICE.getDetails(task.projectId)
          .then((res) => {
            let resContent = res.content;
            resContent = {
              ...resContent,
              categoryName: resContent.projectCategory.name,
            };
            dispatch(projectActions.putProjectDetail(resContent));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setTimeout(() => {
              dispatch(spinnerActions.setLoadingOff());
            }, 1000);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default TASK_SERVICE;
