import { TopBar } from '@/components/common/TopBar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-screen min-h-screen">
      <Toaster position="top-right" />
      <TopBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
