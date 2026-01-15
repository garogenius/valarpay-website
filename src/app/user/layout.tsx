import Sidebar from "@/components/user/sidebar/Sidebar";
import Content from "@/components/user/content";
import UserProtectionProvider from "@/providers/UserProtectionProvider";
import SessionTimeoutProvider from "@/providers/SessionTimeoutProvider";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionTimeoutProvider>
    <UserProtectionProvider>
      <div className="relative flex w-full h-screen overflow-hidden bg-[#000000]">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </UserProtectionProvider>
    </SessionTimeoutProvider>
  );
}
