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
  AccountSettings,
  CartPage,
  DigitalLibrary,
  EStore,
  Favorites,
  // EStore,
  Home,
  OrderHistory,
  OrderTracking,
  ProductDetails,
  ProfileOverview,
  RegisterSeller,
  SellersDirectory,
  SellerStorefront,
  Shop,
  SignIn,
  SignUp,
  TemplateDetail,
} from "./pages";
import { AdminDashboard } from "./pages/AdminDashboard";
// import { Analytics, Dashboard, Settings, Templates } from "./routes";
import AdminLogin from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { TemplateView } from "./routes/TemplateView";
import { Navbar } from "./components/NavBar";
import { OtpVerification } from "./pages/OTP";
import { ProfileLayout } from "./pages/Profile";
import { SellerLayout } from "./pages/SellerLayout";
import { SellerUpload } from "./components/SellerUpload";
import { SellerInsights } from "./components/SellerInsight";
import { SellerInventory } from "./components/SellerInventory";
import { SellerSettings } from "./components/SellerSettings";
import { Dashboard } from "./pages/Dasboard";
import { Templates } from "./pages/amin/Templates";
import { Analytics } from "./pages/amin/Analytics";
import { Settings } from "./pages/amin/Settings";

// Component wrapper to use hooks like useLocation
function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login & admin pages
  const hideNav =
    ["/signin", "/signup", "/verify-otp", "/login"].includes(
      location.pathname,
    ) ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard");
  return (
    <AnimatePresence mode="wait">
      {!hideNav && <Navbar />}

      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        <Route path="/estore" element={<EStore />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/template/:id" element={<TemplateDetail />} />
        <Route path="/sellers" element={<SellersDirectory />} />
        <Route path="/s/:slug" element={<SellerStorefront />} />
        <Route path="/register-seller" element={<RegisterSeller />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        {/* Redirects */}

        {/* Redirect root to home */}

        {/* Admin Login */}

        {/* Admin Routes (Private) */}
        {/* <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminDashboard />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="templates/:id" element={<TemplateView />} />
          </Route>
        </Route> */}

        {/* Profile Dashboard Routes */}
        <Route path="/profile" element={<ProfileLayout />}>
          {/* This index route renders when the user hits exactly /profile */}
          <Route index element={<Navigate to="overview" replace />} />

          <Route path="overview" element={<ProfileOverview />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="library" element={<DigitalLibrary />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="orders/:id" element={<OrderTracking />} />
        </Route>
        <Route path="/dashboard" element={<SellerLayout />}>
          <Route index element={<Navigate to="insights" replace />} />
          <Route path="insights" element={<SellerInsights />} />
          <Route path="inventory" element={<SellerInventory />} />
          <Route path="upload" element={<SellerUpload />} />
          <Route path="settings" element={<SellerSettings />} />
        </Route>

        <Route path="/admin" element={<PrivateRoute />}>
          {/* AdminDashboard acts as the Layout wrapper with Sidebar and Outlet */}
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
