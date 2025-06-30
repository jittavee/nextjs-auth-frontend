// hooks/useAuth.ts
// นี่เป็นไฟล์ Logic ไม่ใช่ Component จึงไม่ต้องมี 'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  profile_image_url: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const { data } = await api.get('/api/auth/dashboard');
          setUser(data);
        } catch (error) {
          // ถ้า token ไม่ถูก, ให้ลบออก
          Cookies.remove('token');
          setUser(null);
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);
  
  const login = async (email: any, password: any) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      Cookies.set('token', data.token, { expires: 1 }); // expires in 1 day
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      const { data: userData } = await api.get('/api/auth/dashboard');
      setUser(userData);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const register = async (formData: FormData) => {
    try {
        await api.post('/api/auth/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Registration successful! Please log in.');
        router.push('/login');
    } catch (error) {
        console.error('Registration failed', error);
        toast.error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully.');
    router.push('/login');
  };

  return { user, loading, login, register, logout };
};