import Header from "../../components/Header/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
