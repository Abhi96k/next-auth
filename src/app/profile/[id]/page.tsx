export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Profile</h1>
      <hr className="w-1/2 border-white mb-6" />
      <p className="text-3xl">
        Profile page
        <span className="p-3 ml-4 rounded-full bg-orange-500 text-black font-semibold shadow-lg">
          {params.id}
        </span>
      </p>
    </div>
  );
}
