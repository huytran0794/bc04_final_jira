import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

// import redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";
import { generalActions } from "../../redux/slice/generalSlice";

// import ANTD components
import {
  FileAddOutlined,
  FileTextOutlined,
  SnippetsOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import generalHooks from "../../hooks/utils/generalHooks";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [currentMenuItem, setCurrentMenuItem] = useState("0");
  const [projectID, setProjectID] = useState<string | undefined>(undefined);
  let sidebarCollapse = useAppSelector(
    (state) => state.generalReducer.sidebarCollapse
  );

  const routesKey: { [key: string]: string } = {
    "/create-project": "create-project",
    "/": "project-management",
    "/profile": "profile",
    "/admin/userManagement": "user-management",
    "/project-detail/:projectId": "project-detail",
  };
  const currentPath = generalHooks.usePathPattern();

  useEffect(() => {
    if (currentPath) {
      if (currentPath === "/project-detail/:projectId") {
        setProjectID(params.projectId);
      }
      setCurrentMenuItem(routesKey[currentPath]);
    } else {
      setCurrentMenuItem("0");
    }
  }, [currentPath]);

  const handleMenuClick = (to: string) => {
    navigate(to);
    // dispatch(generalActions.collapseSidebar());
  };

  return (
    <Sider
      className="project-sidebar"
      trigger={null}
      collapsible
      collapsed={sidebarCollapse}
      collapsedWidth={0}
      breakpoint="lg"
      theme={"light"}
      width="230"
      style={{ height: "100%" }}
      onBreakpoint={(broken) => {
        if (broken) {
          dispatch(generalActions.collapseSidebar());
        }
      }}
    >
      <div className="logo py-12">
        <NavLink to="/" className="px-12 flex justify-center items-center">
          <img className="w-full" src="/jiraCloneLogo.png" alt="web-logo" />
        </NavLink>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[currentMenuItem]}
        items={[
          {
            key: "create-project",
            icon: (
              <div className="py-1 transition">
                <FileAddOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/create-project");
                }}
              >
                Create Project
              </a>
            ),
          },
          {
            key: "project-management",
            icon: (
              <div className="py-1 transition">
                <SnippetsOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/");
                }}
              >
                Project Management
              </a>
            ),
          },
          {
            key: "project-detail",
            icon: (
              <div className="py-1 transition">
                <FileTextOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick(`/project-detail/${projectID}`);
                }}
              >
                Project Detail{" "}
                <span className="text-sm text-gray-400 font-normal">
                  {projectID}
                </span>
              </a>
            ),
            disabled: projectID ? false : true,
          },
          {
            key: "profile",
            icon: (
              <div className="py-1 transition">
                <UserOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/profile");
                }}
              >
                My Profile
              </a>
            ),
          },
          {
            key: "user-management",
            icon: (
              <div className="py-1 transition">
                <UsergroupAddOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/admin/userManagement");
                }}
              >
                User Management
              </a>
            ),
          },
        ]}
      />
    </Sider>
  );
}
