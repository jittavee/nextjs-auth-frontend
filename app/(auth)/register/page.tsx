// app/(auth)/register/page.tsx
'use client';
import { useState } from 'react';
import { useAuthContext } from '@/components/AuthProvider';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { register } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImage) {
        alert("Please select a profile image.");
        return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('phone_number', phone);
    formData.append('address', address);
    formData.append('profileImage', profileImage);

    register(formData);
  };
  
  const inputStyle = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Register</h2>
        {/* Add inputs for all fields similar to the one below */}
        <input type="text" placeholder="ชื่อผู้ใช้ Username" value={username} onChange={(e) => setUsername(e.target.value)} className={inputStyle} required />
        <input type="email" placeholder="อีเมล email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputStyle} mt-4`} required />
        <input type="password" placeholder="Password รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputStyle} mt-4`} required />
        <input type="text" placeholder="ชื่อ First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`${inputStyle} mt-4`} />
        <input type="text" placeholder="นามสกุล Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`${inputStyle} mt-4`} />
        <input type="text" placeholder="เบอร์โทร Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${inputStyle} mt-4`} />
        <textarea placeholder="ที่อยู่ Address" value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputStyle} mt-4`}></textarea>
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">รูป Profile Image</label>
            <input type="file" onChange={(e) => e.target.files && setProfileImage(e.target.files[0])} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" required />
        </div>
        <button type="submit" className="w-full mt-6 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}