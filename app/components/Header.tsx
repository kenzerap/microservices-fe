import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center gap-4">
        <Image src="/favicon.ico" alt="Logo" width={50} height={50} />
        <h1 className="text-2xl font-bold">Next Shop</h1>
      </div>
      <nav className="flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/products" className="hover:underline">
          Products
        </Link>
      </nav>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
