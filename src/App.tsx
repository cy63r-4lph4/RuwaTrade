import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

import { HomePage, TemplateDetail } from "./pages";
import { AdminDashboard } from "./pages/AdminDashboard";

import { Analytics, Dashboard, Settings, Templates } from "./routes";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-900">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Admin Layout with nested routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="templates" element={<Templates />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/template/:id" element={<TemplateDetail />} />

          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
