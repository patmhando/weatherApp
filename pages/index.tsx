import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <div>
        <label htmlFor="search">
          <input type="text" />
        </label>
      </div>
    </main>
  );
}
