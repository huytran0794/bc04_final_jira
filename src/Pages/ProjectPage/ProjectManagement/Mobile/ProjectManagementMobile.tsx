import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import custom Hooks
import projectHooks from "../../../../core/hooks/ProjectHooks/projectHooks";

// import redux
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../core/hooks/redux/useRedux";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";

// import local services
import PROJECT_SERVICE from "../../../../core/services/projectServ";

// import local components
import SectionWrapper from "../../../../core/Components/SectionWrapper/SectionWrapper";
import ProjectMobileSettting from "./ProjectMobileSettting";
import ProjectMobileSearch from "./ProjectMobileSearch";

// import antd components
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";

export default function ProjectManagementMobile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projectList = useAppSelector(
    (state) => state.projectReducer.projectList
  );
  const [projectSettingID, setProjectSettingID] = useState<number>(0);

  projectHooks.useFetchProjectList(dispatch, null);

  const handleOpenCreateProject = () => {
    navigate("create-project");
  };

  // ANTD Modal Control
  const [openModalSetting, setOpenModalSetting] = useState<boolean>(false);

  const showModal = (projectID: number) => {
    setProjectSettingID(projectID);
    setOpenModalSetting(true);
  };

  const handleCancel = () => {
    dispatch(spinnerActions.setLoadingOn());
    dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
    setOpenModalSetting(false);
  };

  // Render function
  const renderProjectList = () => {
    if (projectList?.length === 0)
      return (
        <div className="flex justify-center">
          <img
            src="https://i.imgur.com/iVkTDpw.jpg"
            alt="It's Empty Here"
            style={{ maxHeight: "50vh" }}
          />
        </div>
      );
    return projectList?.map((project, index) => {
      return (
        <div
          className="projectManagement__item flex justify-between items-center border-t border-gray-300 hover:bg-gray-100 transition duration-300"
          key={project.id.toString() + index}
        >
          <p
            className="p-3 mb-0 flex-grow text-xl font-semibold cursor-pointer"
            onClick={() => {
              window.location.href = `/project-detail/${project.id}`;
            }}
          >
            {project.projectName}
          </p>
          <div
            className="projectItem__setting pl-3 py-3 pr-4 flex-shrink-0 border-l border-r border-gray-300 text-slate-500 hover:text-black cursor-pointer transtion duration-300"
            onClick={() => {
              showModal(project.id);
            }}
          >
            <SettingOutlined className="flex text-2xl " />
          </div>
        </div>
      );
    });
  };

  return (
    <SectionWrapper
      title="Project Management"
      content={
        <div className="projectManagement">
          <ProjectMobileSearch />
          <div className="w-full max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
            {renderProjectList()}
          </div>
          <div className="py-3 border-t border-gray-300">
            <Tooltip title="Create New Project">
              <div
                className="w-12 h-12 mx-auto flex justify-center items-center bg-orange-400 hover:bg-orange-500 rounded-full text-white cursor-pointer transition duration-300"
                onClick={handleOpenCreateProject}
              >
                <PlusOutlined style={{ fontSize: "1.2rem" }} />
              </div>
            </Tooltip>
          </div>
          <Modal
            wrapClassName="projectManagement__setting"
            title={
              <span className="text-xl font-semibold">PROJECT SETTING</span>
            }
            style={{
              top: 0,
              left: 0,
              maxWidth: "100%",
              margin: 0,
              padding: 0,
            }}
            bodyStyle={{
              position: "relative",
              flexGrow: 1,
            }}
            width={"100%"}
            footer={null}
            destroyOnClose={true}
            open={openModalSetting}
            onCancel={handleCancel}
          >
            <ProjectMobileSettting
              projectID={projectSettingID}
              setOpenModalSetting={setOpenModalSetting}
            />
          </Modal>
        </div>
      }
    />
  );
}
