import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Website Name */}
          <div>
            <h2 className="text-2xl font-bold">Movie Portal</h2>
            <p className="mt-2">
              Your one-stop destination for exploring, viewing, and managing
              movies!
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="mt-2">
              <li>Email: support@movieportal.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Movie Lane, Film City</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://web.facebook.com/salman.izhar.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebookF size={24} />
              </a>

              <a
                href="https://www.instagram.com/mdsalmanizhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman-izhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-6 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Movie Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
