import Header from "@/components/shared/Header";
import SharedLayout from "@/components/shared/SharedLayout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <SharedLayout>
        <main className="flex-1">{children}</main>
      </SharedLayout>
    </div>
  );
};

export default Layout;
