import React, { useState } from "react";

// import redux
import { useAppDispatch } from "../../../../core/hooks/redux/useRedux";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";

// import local interface
import { InterfaceProjectMobileMembers } from "../../../../core/models/Project/Project.interface";

// import local components
import ProjectMembersShowAll from "../ProjectMembersShowAll";
import ProjectMembersAddNew from "../ProjectMembersAddNew";
import { renderMembers } from "../Desktop/ProjectMembers";

// import local services
import PROJECT_SERVICE from "../../../../core/services/projectServ";

// import ANTD components
import { Avatar, Collapse, message, Modal } from "antd";

export default function ProjectMobileMembers({
  project,
  setProject,
}: InterfaceProjectMobileMembers) {
  const dispatch = useAppDispatch();
  const handleAssignUser = (userId: number) => {
    dispatch(spinnerActions.setLoadingOn());
    PROJECT_SERVICE.assignUser(project.id, userId)
      .then(() => {
        dispatch(
          PROJECT_SERVICE.getDetailsAndSetProject(
            project.id,
            setProject,
            "Member added successfully"
          )
        );
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(spinnerActions.setLoadingOff());
      });
  };
  const handleDeleteMember = (memberID: number) => {
    dispatch(spinnerActions.setLoadingOn());
    PROJECT_SERVICE.deleteMember(project.id, memberID)
      .then(() => {
        dispatch(
          PROJECT_SERVICE.getDetailsAndSetProject(
            project.id,
            setProject,
            "Member deleted successfully"
          )
        );
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
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false);
  const showModalAddMember = () => {
    setOpenModalAddMember(true);
  };
  const handleCloseModalAddMember = () => {
    setOpenModalAddMember(false);
  };

  return (
    <>
      <div className="projectSetting__members mb-3">
        <div className="projectSetting__members__title mb-1 flex justify-between items-center">
          <h4 className="mb-0 text-lg">Members</h4>
          <span
            className="projectMembers__title__addButton inline-block py-1 px-2 border border-orange-400 text-orange-400 hover:border-orange-600 hover:text-orange-600 text-base font-semibold transition duration-300 cursor-pointer"
            onClick={showModalAddMember}
          >
            ADD
          </span>
        </div>
        <Collapse
          expandIconPosition="end"
          className="projectSetting__members__showAll"
        >
          <Panel
            header={
              project.members.length === 0 ? (
                "No member yet"
              ) : (
                <Avatar.Group size={40}>
                  {renderMembers(project.members)}
                </Avatar.Group>
              )
            }
            key="showMem1"
          >
            <ProjectMembersShowAll
              members={project.members}
              handleDeleteMember={handleDeleteMember}
              containerStyle="w-full"
              title=""
            />
          </Panel>
        </Collapse>
      </div>
      <Modal
        wrapClassName="projectSetting__members__addNew"
        style={{
          top: 0,
          left: 0,
          maxWidth: "100%",
          height: "100vh",
          margin: 0,
          padding: "8px",
        }}
        bodyStyle={{ height: "100%" }}
        width={"100%"}
        destroyOnClose={true}
        footer={null}
        open={openModalAddMember}
        onCancel={handleCloseModalAddMember}
      >
        <ProjectMembersAddNew
          isMobile={true}
          handleAssignUser={handleAssignUser}
          containerClassName="w-full h-full"
          userListClassName="max-h-full"
          title="ADD MEMBERS"
        />
      </Modal>
    </>
  );
}
