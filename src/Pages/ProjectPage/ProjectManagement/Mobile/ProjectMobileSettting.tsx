import { useEffect, useState } from "react";

// import redux
import { useAppDispatch } from "../../../../core/hooks/redux/useRedux";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";

// import local Interface
import {
  InterfaceProject,
  InterfaceProjectMobileSetting,
  InterfaceProjectUpdate,
} from "../../../../core/models/Project/Project.interface";

// import local Components
import ProjectForm from "../../../../core/Components/Forms/ProjectForm";
import ButtonLocal from "../../../../core/Components/Utils/ButtonLocal";
import toastify from "../../../../core/utils/toastify/toastifyUtils";

// import local Services
import PROJECT_SERVICE from "../../../../core/services/projectServ";

// import ANTD Component
import { Collapse, message, Modal, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ProjectMobileMembers from "./ProjectMobileMembers";
import InnerSpinner from "../../../../core/Components/Spinner/InnerSpinner";

export default function ProjectMobileSettting({
  projectID,
  setOpenModalSetting,
}: InterfaceProjectMobileSetting) {
  const dispatch = useAppDispatch();
  const [project, setProject] = useState<InterfaceProject | null>(null);

  useEffect(() => {
    dispatch(PROJECT_SERVICE.getDetailsAndSetProject(projectID, setProject));
  }, []);

  const handleUpdateProject = (values: InterfaceProjectUpdate) => {
    dispatch(spinnerActions.setLoadingOn());
    const updateProject = {
      ...values,
      id: projectID,
      creator: project!.creator.id,
    };
    PROJECT_SERVICE.update(project!.id, updateProject)
      .then(() => {
        setTimeout(() => {
          dispatch(
            PROJECT_SERVICE.getDetailsAndSetProject(projectID, setProject)
          );
          toastify("success", "Updated project successfully !");
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.message);
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      });
  };

  const handleDeleteProject = () => {
    dispatch(spinnerActions.setLoadingOn());
    PROJECT_SERVICE.delete(project!.id)
      .then((res) => {
        // console.log(res);
        setOpenModalSetting(false);
        dispatch(PROJECT_SERVICE.getAllAndDispatch("Project deleted"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(spinnerActions.setLoadingOff());
      });
  };

  // ANTD Collapse control
  const { Panel } = Collapse;

  // ANTD Modal Control
  const { confirm } = Modal;

  const showDeleteProjectConfirm = () => {
    confirm({
      title: (
        <span className="text-lg">
          Are you sure you want to delete this Project?
        </span>
      ),
      icon: <ExclamationCircleOutlined className="text-2xl" />,
      content: (
        <span className="text-lg text-red-500 font-semibold">
          {project?.projectName}
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      okButtonProps: {
        size: "large",
        className: "btn-delete-ok",
      },
      cancelText: "No",
      cancelButtonProps: {
        type: "primary",
        size: "large",
        className: "btn-delete-cancel",
      },
      onOk() {
        handleDeleteProject();
      },
    });
  };

  return !project ? (
    <InnerSpinner />
  ) : (
    <div className="projectSetting">
      <div className="mb-3">
        <p className="mb-2 text-xl font-semibold">{project.projectName}</p>
        <Tag color="lime" className="text-lg">
          {project.creator.name}
        </Tag>
      </div>
      <ProjectMobileMembers project={project} setProject={setProject} />
      <div>
        <div className="flex justify-between items-center">
          <h4 className="mb-0 text-lg">Project Information</h4>
        </div>
        <Collapse expandIconPosition="end" className="projectSetting_edit">
          <Panel
            header={
              <span className="font-semibold text-base">Show and Edit</span>
            }
            key="edit1"
          >
            <ProjectForm
              layout="vertical"
              project={project}
              confirmText="Update"
              handleOnFinish={handleUpdateProject}
            />
          </Panel>
        </Collapse>
      </div>
      <div className="mt-5">
        <Collapse expandIconPosition="end" className="projectSetting_edit">
          <Panel
            header={
              <span className="text-red-500 text-lg font-semibold">
                DANGER ZONE
              </span>
            }
            key="dangerZone"
          >
            <ButtonLocal
              baseColor="red"
              className="w-full px-5 py-2.5"
              handleOnClick={showDeleteProjectConfirm}
            >
              DELETE PROJECT
            </ButtonLocal>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
