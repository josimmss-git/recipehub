import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Please login first.</h2>
      </div>
    );
  }

  const db = await dbConnect();

  let currentUser = await db.collection("users").findOne({
    email: user.email,
  });

  // যদি users collection-এ user না থাকে,
  // তাহলে session-এর data ব্যবহার করবে
  if (!currentUser) {
    currentUser = {
      name: user.name || "",
      email: user.email,
      image: user.image || "",
    };
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <ProfileForm user={currentUser} />
    </div>
  );
}