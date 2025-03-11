import Navbar from '../../components/Navbar';
import { Poppins } from 'next/font/google';
import { GradientBackground } from '../../components/ui/ui/gradient-background';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={poppins.className}>
      <GradientBackground>
        <div className="max-w-[1440px] mx-auto">
          <Navbar />
          {children}
        </div>
      </GradientBackground>
    </main>
  );
}
