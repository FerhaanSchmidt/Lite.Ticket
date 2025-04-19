import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  showHeader?: boolean;
  children: React.ReactNode;
  showFooter?: boolean;
}

const SharedLayout: React.FC<LayoutProps> = ({
  showHeader = true,
  children,
  showFooter = true,
}) => {
  return (
    <>
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default SharedLayout;
