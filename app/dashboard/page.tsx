// app/dashboard/page.tsx
'use client';
import { useAuthContext } from "@/components/AuthProvider";
import Image from 'next/image';

export default function DashboardPage() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    // Middleware should handle this, but as a fallback
    return <div className="text-center mt-10">You are not logged in.</div>;
  }
  
  // Construct the full image URL
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.profile_image_url.replace(/\\/g, '/')}`;

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>
        
        {user.profile_image_url && (
          <div className="mb-6 text-center">
            <Image 
              src={imageUrl} 
              alt={`${user.username}'s profile`}
              width={150}
              height={150}
              className="rounded-full mx-auto object-cover"
              priority // load this image first
            />
          </div>
        )}
        
        <div className="space-y-4 text-gray-700">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Phone:</strong> {user.phone_number}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      </div>
    </div>
  );
}