import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Ideally, you'd have a route to get user data by token.
                    // For now, we'll just assume the token is valid if it exists,
                    // or decode it if we had a decoder.
                    // But since the backend doesn't have a /me route explicitly in the prompt,
                    // we might just set a dummy user or try to fetch tasks to validate.
                    // Let's assume we store user info in local storage on login too for MVP simplicity,
                    // or just rely on the token.
                    // Wait, the backend has `GET /tasks` which is protected.
                    // If we can fetch tasks, we are logged in.
                    // But we need user details (name) for the UI.
                    // The login response returns { token }.
                    // Let's decode the token if we can, or just set authenticated state.
                    // For this MVP, let's just set loading to false.
                    // If we get a 401 later, we logout.

                    // Actually, let's try to decode the token payload if possible, 
                    // but we don't have jwt-decode installed.
                    // We'll just set a flag.
                    setUser({ token });
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
        return res.data;
    };

    const signup = async (name, email, password) => {
        const res = await api.post('/auth/signup', { name, email, password });
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
