"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/user/sidebar/Sidebar";
import Content from "@/components/user/content";
import UserProtectionProvider from "@/providers/UserProtectionProvider";
import SessionTimeoutProvider from "@/providers/SessionTimeoutProvider";
import useUserStore from "@/store/user.store";
import ChangePasscodeModal from "@/components/modals/settings/ChangePasscodeModal";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUserStore();
  const [showPasscodeSetup, setShowPasscodeSetup] = useState(false);

  useEffect(() => {
    // If user is loaded and passcode is NOT set, trigger modal
    // We check user.id to ensure user object is populated
    if (user?.id && !(user as any)?.isPasscodeSet) {
      setShowPasscodeSetup(true);
    }
  }, [user]);

  return (
    <SessionTimeoutProvider>
      <UserProtectionProvider>
        <div className="relative flex w-full h-screen overflow-hidden bg-[#000000]">
          <Sidebar />
          <Content>{children}</Content>

          <ChangePasscodeModal
            isOpen={showPasscodeSetup}
            onClose={() => setShowPasscodeSetup(false)}
          />
        </div>
      </UserProtectionProvider>
    </SessionTimeoutProvider>
  );
}
