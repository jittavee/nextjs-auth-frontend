// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuthContext } from './AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
            <h1 className="text-xl font-bold text-primary">I Care เพื่อนกัน</h1>
            <p className="text-xs text-muted-foreground">ช่วยเหลือเกื้อกูลกัน</p>
          </div>

        



        

        <Link href="/" className="text-xl font-bold">AuthApp</Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
              <span className="font-semibold">Hi, {user.first_name}</span>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">Login</Link>
              <Link href="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
          

        </div>
      </div>
    </nav>
  );
};

export default Navbar;