// "use client"

// import OverviewItems from '@/components/OverviewItems';
// import { useSession } from '@/lib/auth-client';
// import React from 'react';

// const DashboardPremium = () => {

//   const { data: session, isPending } = useSession();
//   if (isPending) {
//     return<div>Loading...</div>
//   }

//   const user = session?.user;

//   console.log(user, "this is premium page ");
//   return (
//     <div>
//       <h2 className='text-4xl font-bold'>Wellcome Back, {user?.name}</h2>
//       <OverviewItems />
//     </div>
//   );
// };

// export default DashboardPremium;
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function PremiumPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isPremium) {
    redirect("/dashboard");
  }

  return <div>Premium Content</div>;
}