import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './components/Header';
import { consumeMessages } from './libs/kafka-consumer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

async function startConsumer() {
  await consumeMessages(
    'GetProductFromExpress',
    'express-response-consumer-group',
    (message) => {
      console.log('GetProductFromNodejs:', message);
      fetch(`${process.env.PUBLIC_URL}/api/products/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  );

  await consumeMessages(
    'GetProductFromNestjs',
    'nestjs-response-consumer-group',
    (message) => {
      console.log('GetProductFromNestjs:', message);
      fetch(`${process.env.PUBLIC_URL}/api/products/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  startConsumer();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
