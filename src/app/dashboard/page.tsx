// import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "./_components/Header";
import DashboardContent from "./_components/DashboardContent";

export default async function Dashboard() {
  // // Server-side authentication check
  // const {user} = await useUser();
  
  // // If no user is authenticated, redirect to sign-in
  // if (!user) {
  //   redirect("/sign-in");
  // }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />
        <DashboardContent />
      </div>
    </div>
  );
}
