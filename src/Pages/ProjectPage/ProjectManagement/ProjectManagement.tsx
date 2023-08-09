import React from "react";
import {
  DesktopView,
  TabletView,
  MobileView,
} from "../../../core/HOC/Responsive";
import ProjectManagementDesktop from "./Desktop/ProjectManagementDesktop";
import ProjectManagementMobile from "./Mobile/ProjectManagementMobile";

export default function ProjectManagement() {
  return (
    <>
      <DesktopView>
        <ProjectManagementDesktop />
      </DesktopView>
      <TabletView>
        <ProjectManagementMobile />
      </TabletView>
      <MobileView>
        <ProjectManagementMobile />
      </MobileView>
    </>
  );
}
