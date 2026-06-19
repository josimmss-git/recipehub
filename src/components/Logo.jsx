import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className=" p-2 ">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="RecipeHub Logo"
          className="h-10 w-10 rounded-full  object-contain"
        />
      </div>

      <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
        RecipeHub
      </span>
    </Link>
  );
};

export default Logo;