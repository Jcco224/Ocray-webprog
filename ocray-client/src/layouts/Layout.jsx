import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="min-h-screen w-full bg-white">
        <NavBar />
        <main className="px-6 pb-12 pt-4 md:px-10 md:pb-16 md:pt-2 lg:px-16 xl:px-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
