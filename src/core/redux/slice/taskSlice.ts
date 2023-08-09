import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { message } from "antd";
import axios from "axios";
import {
  ITask,
  ITaskPriority,
  ITaskStatus,
  ITaskType,
} from "../../models/Task/Task.Interface";
import { User } from "../../models/User/User.interface";
import TASK_SERVICE from "../../services/taskServ";
import USER_SERVICE from "../../services/userServ";
import { AppDispatch } from "../store/store";

type InitialState = {
  taskTypeList: ITaskType[];
  taskPriorityList: ITaskPriority[];
  taskStatusList: ITaskStatus[];
  taskUserList: User[];
  taskDetail: ITask | undefined;
};

export const getTaskTypeThunk = createAsyncThunk(
  "taskSlice/getTaskType",
  (_, thunkAPI) => {
    let promiseData = TASK_SERVICE.getAllTaskType()
      .then((res) => {
        return res.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });

    return promiseData;
  }
);

export const getTaskPriorityThunk = createAsyncThunk(
  "taskSlice/getTaskPriority",
  (_, thunkAPI) => {
    let promiseData = TASK_SERVICE.getAllTaskPriority()
      .then((res) => {
        return res.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });

    return promiseData;
  }
);

export const getTaskStatusThunk = createAsyncThunk(
  "taskSlice/getTaskStatus",
  (_, thunkAPI) => {
    let promiseData = TASK_SERVICE.getAllTaskStatus()
      .then((res) => {
        return res.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });

    return promiseData;
  }
);

export const getTaskUsersThunk = createAsyncThunk(
  "taskSlice/getTaskUsers",
  (id: number, thunkAPI) => {
    let promiseData = USER_SERVICE.getUserByProjectId(id)
      .then((res) => {
        return res.content;
      })
      .catch((error) => {
        console.log(error);

        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          if (error.response) {
            console.log("error detail: ", error.response.data.content);
          }
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(
          `${error.message} - ${error.response.data.content}`
        );
      });

    return promiseData;
  }
);

export const getTaskDetailThunk = createAsyncThunk(
  "taskSlice/getTaskDetail",
  (id: number | string, thunkAPI) => {
    let promiseData = TASK_SERVICE.getTaskDetail(id)
      .then((res) => {
        return res.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });

    return promiseData;
  }
);

export const getAllInfoThunk = () => async (dispatch: AppDispatch) => {
  let promiseData = Promise.all([
    dispatch(getTaskTypeThunk()),
    dispatch(getTaskPriorityThunk()),
    dispatch(getTaskStatusThunk()),
  ])
    .then((res) => {
      // console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  return promiseData;
};

const initialState: InitialState = {
  taskTypeList: [
    {
      id: 1,
      taskType: "bug",
    },
  ],
  taskPriorityList: [
    {
      priorityId: 1,
      priority: "High",
      description: "High",
      deleted: false,
      alias: "High",
    },
  ],
  taskStatusList: [
    {
      statusId: "1",
      statusName: "BACKLOG",
      alias: "tồn đọng",
      deleted: "False",
    },
  ],
  taskUserList: [],
  taskDetail: undefined,
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<ITask>) => {
      let currentTask = action.payload;
      state.taskDetail = currentTask;
    },
  },
  extraReducers: (builder) => {
    // add case for tasktypeThunk
    builder.addCase(
      getTaskTypeThunk.fulfilled,
      (state, action: PayloadAction<ITaskType[]>) => {
        state.taskTypeList = action.payload;
      }
    );
    builder.addCase(getTaskTypeThunk.rejected, (state, action) => {
      state.taskTypeList = [
        {
          id: 1,
          taskType: "bug",
        },
      ];
    });
    // add case for taskPriorityThunk
    builder.addCase(
      getTaskPriorityThunk.fulfilled,
      (state, action: PayloadAction<ITaskPriority[]>) => {
        state.taskPriorityList = action.payload;
      }
    );
    builder.addCase(getTaskPriorityThunk.rejected, (state, action) => {
      state.taskPriorityList = [
        {
          priorityId: 1,
          priority: "High",
          description: "High",
          deleted: false,
          alias: "High",
        },
      ];
    });

    // add case for taskStatusThunk
    builder.addCase(
      getTaskStatusThunk.fulfilled,
      (state, action: PayloadAction<ITaskStatus[]>) => {
        state.taskStatusList = action.payload;
      }
    );
    builder.addCase(getTaskStatusThunk.rejected, (state, action) => {
      state.taskStatusList = [
        {
          statusId: "1",
          statusName: "BACKLOG",
          alias: "tồn đọng",
          deleted: "False",
        },
      ];
    });

    // add case for taskUsersThunk
    builder.addCase(
      getTaskUsersThunk.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.taskUserList = action.payload;
      }
    );
    builder.addCase(getTaskUsersThunk.rejected, (state, action) => {
      console.log("payload trong reject user");
      console.log(action);
      state.taskUserList = [];
    });

    // add case for taskDetail
    builder.addCase(
      getTaskDetailThunk.fulfilled,
      (state, action: PayloadAction<ITask>) => {
        let currentTask = action.payload;
        if (currentTask.priorityId === 0) {
          currentTask.priorityId = currentTask.priorityTask!.priorityId!;
        }

        if (currentTask.typeId === 0) {
          currentTask.typeId = currentTask.taskTypeDetail.id;
        }
        state.taskDetail = currentTask;
      }
    );
    builder.addCase(getTaskDetailThunk.rejected, (state, action) => {
      console.log("payload trong reject taskDetail");
      console.log(action);
      state.taskDetail = undefined;
    });
  },
});

export const taskActions = taskSlice.actions;

const taskReducer = taskSlice.reducer;

export default taskReducer;
