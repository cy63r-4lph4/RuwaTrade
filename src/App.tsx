import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

import {
  CartPage,
  EStore,
  // EStore,
  Home,
  ProductDetails,
  ProfilePage,
  RegisterSeller,
  SellersDirectory,
  SellerStorefront,
  Shop,
  SignIn,
  SignUp,
  TemplateDetail,
} from "./pages";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Analytics, Dashboard, Settings, Templates } from "./routes";
import AdminLogin from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { TemplateView } from "./routes/TemplateView";
import { Navbar } from "./components/NavBar";

// Component wrapper to use hooks like useLocation
function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login & admin pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <AnimatePresence mode="wait">
      {!hideNavbar && <Navbar />}

      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        <Route path="/estore" element={<EStore />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/template/:id" element={<TemplateDetail />} />
        <Route path="/sellers" element={<SellersDirectory />} />
        <Route path="/s/:slug" element={<SellerStorefront />} />
        <Route path="/register-seller" element={<RegisterSeller />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />

        {/* Redirects */}

        {/* Redirect root to home */}

        {/* Admin Login */}

        {/* Admin Routes (Private) */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminDashboard />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="templates/:id" element={<TemplateView />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-2xl text-gray-500">
              404 – Page Not Found
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
