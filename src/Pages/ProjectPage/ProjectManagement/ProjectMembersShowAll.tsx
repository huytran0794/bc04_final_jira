import React from "react";

// import local components
import {
  DesktopView,
  MobileView,
  TabletView,
} from "../../../core/HOC/Responsive";

// import local Interface
import { InterfaceProjectMembersShowAllComponent } from "../../../core/models/Project/Project.interface";
import { User } from "../../../core/models/User/User.interface";

// import ant component
import { Avatar, Modal, Popconfirm } from "antd";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export default function ProjectMembersShowAll({
  members,
  handleDeleteMember,
  containerStyle = "w-64",
  title = "ALL MEMBERS",
}: InterfaceProjectMembersShowAllComponent) {
  // ANTD Modal Control
  const { confirm } = Modal;
  const showDeleteMemberConfirm = (member: Partial<User>) => {
    confirm({
      title: <span className="text-lg">Are you sure delete this Member?</span>,
      icon: <ExclamationCircleOutlined className="text-2xl" />,
      content: <span className="text-lg">{member.name}</span>,
      okText: "Yes",
      okType: "danger",
      okButtonProps: { size: "large", className: "btn-delete-ok" },
      cancelText: "No",
      cancelButtonProps: {
        size: "large",
        type: "primary",
        className: "btn-delete-cancel",
      },
      onOk() {
        handleDeleteMember(member.userId!);
      },
    });
  };

  // render function
  const renderDeleteButtonDesktop = (member: Partial<User>) => (
    <Popconfirm
      title={
        <span className="text-lg pl-1">
          Are you sure to delete{" "}
          <span className="font-semibold">{member.name}</span>?
        </span>
      }
      onConfirm={() => {
        handleDeleteMember(member.userId!);
      }}
      okText="Yes"
      okButtonProps={{
        type: "default",
        danger: true,
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
      <CloseCircleOutlined
        style={{ fontSize: 20 }}
        className="text-red-500 cursor-pointer"
      />
    </Popconfirm>
  );

  const renderDeleteButtonMobile = (member: Partial<User>) => (
    <CloseCircleOutlined
      style={{ fontSize: 20 }}
      className="text-red-500 cursor-pointer"
      onClick={() => {
        showDeleteMemberConfirm(member);
      }}
    />
  );

  return (
    <div className={containerStyle}>
      <p className="w-full mb-0 px-2 bg-gray-200 text-sm text-gray-500 font-bold">
        {title}
      </p>
      <div className="w-full max-h-96 overflow-y-auto">
        {members.map((member, index) => (
          <div
            className="px-3 py-2 flex justify-between items-center hover:bg-slate-100"
            key={member.userId!.toString() + index}
          >
            <div className="flex items-center">
              <div>
                <Avatar src={member.avatar} />
              </div>
              <p className="ml-2 mb-0 pr-2 align-middle text-lg">
                {member.name}
              </p>
            </div>
            <DesktopView>{renderDeleteButtonDesktop(member)}</DesktopView>
            <TabletView>{renderDeleteButtonMobile(member)}</TabletView>
            <MobileView>{renderDeleteButtonMobile(member)}</MobileView>
          </div>
        ))}
      </div>
    </div>
  );
}
