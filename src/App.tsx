/* import react router dom v6 packages */
import { Route, Routes } from "react-router-dom";

import PrivateRoutes from "./core/routes/PrivateRoutes/PrivateRoutes";
import Spinner from "./core/Components/Spinner/Spinner";

/* import local components */
import Layout from "./core/Layout/Layout";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import CreateProjectPage from "./Pages/ProjectPage/CreateProject/CreateProjectPage";
import ProjectManagement from "./Pages/ProjectPage/ProjectManagement/ProjectManagement";

import GeneralDrawer from "./core/Components/Drawer/GeneralDrawer";
import ProjectDetail from "./Pages/ProjectPage/ProjectDetail/ProjectDetail";
import UserManagementPage from './Pages/AdminPage/UserManagementPage/UserManagementPage';

import ModalComponent from "./core/Components/Modal/ModalComponent";
import Test from "./Pages/Test";
import TestDnd from "./Pages/TestDnd";


function App() {
  return (
    <>
      <Spinner />
      <GeneralDrawer />
      <ModalComponent />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<ProjectManagement />} />
            <Route path="create-project" element={<CreateProjectPage />} />
            <Route path="project-detail/:projectId" element={<ProjectDetail />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="admin/userManagement" element={<UserManagementPage />} />
            <Route path="test" element={<Test />} />
            <Route path="test-dnd" element={<TestDnd />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
