import { Popconfirm, Select } from "antd";
import clsx from "clsx";
import { FiSend, FiLink } from "react-icons/fi";

import { TfiTrash } from "react-icons/tfi";

import { useAppDispatch, useAppSelector } from "../../../../core/hooks/redux/useRedux";
import { ITask } from "../../../../core/models/Task/Task.Interface";
import { modalActions } from "../../../../core/redux/slice/modalSlice";
import { taskActions } from "../../../../core/redux/slice/taskSlice";
import TASK_SERVICE from "../../../../core/services/taskServ";

import { DropwDownIcons } from "../../../../core/utils/TaskIcons/Dropdown";

const EditTaskHeader = () => {
  let taskTypeIcons = DropwDownIcons.taskType;
  let { taskDetail: task, taskTypeList } = useAppSelector(
    (state) => state.taskReducer
  );
  const dispatch = useAppDispatch();
  let clonedTask = task ? JSON.parse(JSON.stringify(task)) : [];
  const { Option } = Select;

  // class flex between
  const flexBetweenClass = "flex items-center justify-between";
  const btnActionClass =
    "flex items-center gap-2 cursor-pointer hover:bg-slate-400/20 p-3 rounded-md transition-all duration-[700ms]";


  const handleSelect = (value: number | string) => {
    clonedTask = { ...clonedTask, typeId: value };
    dispatch(TASK_SERVICE.updateTaskThunk(clonedTask));
  }

  const text = 'Are you sure to delete this task?';
  const handleDetele = (task: ITask) => {
    dispatch(modalActions.closeModal());
    dispatch(TASK_SERVICE.deleteTaskThunk(task));
  }

  let defaultOption = task && task.typeId;
  return (
    <div className={clsx("content edit-task-header")}>
      <div className={clsx("content-wrapper", flexBetweenClass)}>
        <div className="col-right">
          <div className="task-title">
            <div className="wrapper flex items-center gap-1">
              <Select
                className="select-task-type w-[200px] hover:bg-slate-400/20 rounded-md transition-all duration-[700ms]"
                value={defaultOption}
                defaultValue={defaultOption}
                optionLabelProp="label"
                onSelect={handleSelect}
                showArrow={false}
              >
                {taskTypeList?.map((type, idx) => {
                  let optionLabel = (
                    <div className="task-type-label flex items-center gap-3 w-full h-full">
                      <span className="icon">
                        {taskTypeIcons[type.taskType]}
                      </span>
                      <p className="title flex items-center mb-0">
                        <span className="txt uppercase">
                          {type.taskType}
                        </span>
                        <span className="char mx-2">-</span>
                        <span className="task-id">{task?.taskId}</span>
                      </p>
                    </div>
                  );
                  return (
                    <Option
                      key={type.id.toString() + idx}
                      value={type.id}
                      label={optionLabel}
                    >
                      <div className="option-label-item capitalize flex items-center gap-2">
                        <span className="icon">
                          {taskTypeIcons[type.taskType]}
                        </span>
                        <span className="txt">{type.taskType}</span>
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        <div className={clsx("col-left", flexBetweenClass, "gap-3")}>
          <div className={clsx("btn btn-feedback", btnActionClass)}>
            <div className="icon">
              <FiSend className="text-slate-600" />
            </div>
            <span className="txt capitalize tracking-wide">give feedback</span>
          </div>
          <div className={clsx("btn btn-copy", btnActionClass)}>
            <div className="icon">
              <FiLink className="text-slate-600" />
            </div>
            <span className="txt capitalize tracking-wide">copy link</span>
          </div>
          <Popconfirm placement="topLeft" title={text} onConfirm={() => { handleDetele(task as ITask) }} okText="Yes" cancelText="No">
            <div className={clsx("btn btn-del", btnActionClass)}>
              <div className="icon">
                <TfiTrash className="text-slate-600 text-lg" />
              </div>
            </div>
          </Popconfirm>

        </div>
      </div>
    </div>
  );
};

export default EditTaskHeader;
