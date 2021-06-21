import '../styles/globals.css';
import '../configure-amplify';
import Link from 'next/link';

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/" passHref>
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
        <Link href="/create-post" passHref>
          <span className="mr-6 cursor-pointer">Create Post</span>
        </Link>
        <Link href="/profile" passHref>
          <span className="mr-6 cursor-pointer">Profile</span>
        </Link>
      </nav>
      <div className="py-8 px-16">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
