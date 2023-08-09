import React from "react";

// import local interface
import {
  InterfaceProject,
  InterfaceProjectActionButtonsComponent,
} from "../../../../core/models/Project/Project.interface";

// import redux
import { useAppDispatch } from "../../../../core/hooks/redux/useRedux";
import { generalActions } from "../../../../core/redux/slice/generalSlice";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";

// import local component
import ProjectEdit from "./ProjectEdit";

// import local Service
import PROJECT_SERVICE from "../../../../core/services/projectServ";

// import antd components
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { message, Popconfirm, Tooltip } from "antd";

export default function ProjectActionButtons({
  project,
}: InterfaceProjectActionButtonsComponent) {
  let dispatch = useAppDispatch();

  const handleEditProject = (project: InterfaceProject) => {
    dispatch(
      generalActions.handleDrawerOpen(<ProjectEdit project={project} />)
    );
  };
  const handleDeleteProject = () => {
    dispatch(spinnerActions.setLoadingOn());
    PROJECT_SERVICE.delete(project.id)
      .then((res) => {
        console.log(res);
        dispatch(PROJECT_SERVICE.getAllAndDispatch("Project deleted"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(spinnerActions.setLoadingOff());
      });
  };

  return (
    <div className="space-x-2">
      <Tooltip title="Edit Project">
        <button
          onClick={() => {
            handleEditProject(project);
          }}
        >
          <span className="p-2 rounded inline-flex justify-center items-center bg-amber-500 hover:bg-amber-400 text-xl text-white transition duration-300 cursor-pointer">
            <FormOutlined />
          </span>
        </button>
      </Tooltip>
      <Popconfirm
        title={
          <span className="text-lg pl-1">
            Are you sure to delete{" "}
            <span className="font-semibold">{project.projectName}</span>?
          </span>
        }
        onConfirm={handleDeleteProject}
        okText="Yes"
        okButtonProps={{
          danger: true,
          type: "default",
          size: "large",
          className: "btn-delete-ok",
        }}
        cancelText="No"
        cancelButtonProps={{
          type: "primary",
          size: "large",
          className: "btn-delete-cancel",
        }}
        icon={<QuestionCircleOutlined className="top-1 text-red-500 text-xl" />}
      >
        <Tooltip title="Delete Project">
          <span className="p-2 rounded inline-flex justify-center items-center bg-red-500 hover:bg-red-600 text-xl text-white transition duration-300 cursor-pointer">
            <DeleteOutlined />
          </span>
        </Tooltip>
      </Popconfirm>
    </div>
  );
}
