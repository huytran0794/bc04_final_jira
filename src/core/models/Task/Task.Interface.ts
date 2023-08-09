import { User } from "../User/User.interface";

export interface ITaskDetailList {
  statusId: number;
  statusName: string;
  alias: string;
  lstTaskDeTail: ITask[];
}

export interface ITaskDetail {
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: string;
}

export interface ITask {
  taskId: string | number;
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  typeId: number;
  priorityId: number;
  projectId: number;
  lstComment: ITaskComment[];
  priorityTask: Partial<ITaskPriority>;
  taskTypeDetail: ITaskType;
  assigness: Partial<User>[];
  listUserAsign?: Partial<User>[];
  alias?: string;
}

export interface ITaskPriority {
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
}

type TaskTypes = "bug" | "new task";
export interface ITaskType {
  id: number;
  taskType: TaskTypes;
}

export interface ITaskStatus {
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
}

export interface ITaskComment {
  user: Partial<User>;
  id: number;
  userId: number;
  taskId: number;
  contentComment: string;
  alias: string;
}

export interface ITaskList {
  taskList: ITask[];
}
