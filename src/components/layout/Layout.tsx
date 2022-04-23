import {
    Routes,
    Route,
} from "react-router-dom";
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import ProtectedRoute from "../../components/routing/ProtectedRoute";
import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/login/LoginPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import RegisterPage from "../../pages/register/RegisterPage";
import SettingsPage from "../../pages/settings/SettingsPage";

export default function Layout() {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } />
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                } />
            </Routes>
            <Footer></Footer>
        </>
    )
}