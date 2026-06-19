import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & About */}
          <div>
            <h2 className="text-3xl font-bold">
              <span className="text-orange-500">Recipe</span>
              <span className="text-green-500">Hub</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Discover, share, and save your favorite recipes.
              Join our community of food lovers and explore
              delicious culinary inspirations from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-orange-500 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/recipes"
                  className="hover:text-orange-500 transition"
                >
                  Browse Recipes
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-orange-500 transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-orange-500 transition"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-sm">
              <p>Email: support@recipehub.com</p>
              <p>Phone: +880 1234-567890</p>
              <p>Address: Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-pink-500 transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-sky-500 transition"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-red-500 transition"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} RecipeHub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;