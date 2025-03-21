import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Link from 'next/link';

import { SessionProvider } from './components/SessionProvider';

import './globals.css';
import UserButton from './components/UserButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextJS ChatGPT App',
  description: 'ChatGPT App made in NextJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 md:px-5`}
        >
          <header className='bg-white flex p-2 mb-3'>
            <div className='mx-auto flex flex-grow h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8'>
              <Link href='/' className='block text-teal-600'>
                <span className='sr-only'>Home</span>
                GPTChat
              </Link>

              <div className='flex flex-1 items-center justify-end md:justify-between'>
                <nav aria-label='Global' className='hidden md:block'>
                  <ul className='flex items-center gap-6 text-sm'>
                    <li>
                      <Link
                        href='about'
                        className='text-gray-500 transition hover:text-gray-500/75'
                      >
                        About
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div>
                  <UserButton />
                </div>
              </div>
            </div>
          </header>
          <div className='flex flex-col md:flex-row'>
            <div className='flex-grow'>{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
