import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

//styles
import './globals.css';

export const metadata: Metadata = {
  title: 'Weather Forecast App',
};

const montserrat = Montserrat({ subsets: ['latin'] });
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-secondaryColor text-gray-600 px-4 sm:px-[15vw] lg:px-[20vw] pb-8 text-lg md:text-xl`}
      >
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
