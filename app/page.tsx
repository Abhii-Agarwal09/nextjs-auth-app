import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Hello world</div>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/profile">Profile</Link>
    </>
  );
}
