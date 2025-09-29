import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import TaskDetail from './pages/task-detail';
import ProjectsList from './pages/projects-list';
import Register from './pages/register';
import ProjectDetail from './pages/project-detail';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task-detail" element={<TaskDetail />} />
        <Route path="/projects-list" element={<ProjectsList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project-detail" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
