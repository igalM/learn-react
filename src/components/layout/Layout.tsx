import { useEffect } from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import ProtectedRoute from "../../components/routing/ProtectedRoute";
import { useAuthContext } from "../../contexts/auth-context";
import useAuth from "../../hooks/useAuth";
import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/login/LoginPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import RegisterPage from "../../pages/register/RegisterPage";
import SettingsPage from "../../pages/settings/SettingsPage";
import { storage } from "../../utils/utils";

export default function Layout() {
    const { getUserByToken, response } = useAuth();
    const { setUser } = useAuthContext();
  
  
    useEffect(() => {
      let token = storage.getToken();
      const getUser = async () => token ? await getUserByToken(token) : null;
      getUser();
    }, []);
  
    useEffect(() => {
      if (response) {
        setUser(response.user);
      }
    }, [response]);
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile/:username" element={
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