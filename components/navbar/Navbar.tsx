import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center p-4">
      <h1 className="text-xl font-extrabold">getyouplaced</h1>
      <div>
        <Link href="/login" className="bg-black text-white px-4 py-2 rounded">
          Login
        </Link>
      </div>
    </div>
  );
}
