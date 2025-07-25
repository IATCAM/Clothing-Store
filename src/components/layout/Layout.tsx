import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import SignUp from "../signUp/SignUp";

interface IlayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: IlayoutProps) {
  return (
    <div>
      <SignUp />
      <Navbar />
      {children}
     <Footer />
    </div>
  );
}

export default Layout;
