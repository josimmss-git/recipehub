import Link from "next/link";
import { Button, Card, CardHeader } from "@heroui/react";
import { FaLock, FaHome } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c16] px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,.15),transparent_60%)]" />

      <Card className="relative w-full max-w-lg bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        <CardHeader className="flex flex-col items-center text-center gap-5">

          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <FaLock className="text-red-400 text-5xl" />
          </div>

          <h1 className="text-4xl font-extrabold text-white">
            Access Denied
          </h1>

          <p className="text-slate-400 max-w-md">
            Sorry, you don't have permission to access this page.
            Please sign in with an authorized account or return to the homepage.
          </p>

        </CardHeader>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button
              radius="lg"
              className="bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold px-8"
              startContent={<FaHome />}
            >
              Back to Home
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
};

export default Unauthorized;