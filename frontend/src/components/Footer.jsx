import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold text-white mb-4">Xilikha</h3>
            <p className="text-gray-400 mb-4">
              Premium Haritaki products from the heart of Assam. Bringing traditional Assamese
              wellness to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="hover:text-primary-400 transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/how-to-use" className="hover:text-primary-400 transition-colors">
                  How to Use
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Guwahati, Assam, India</li>
              <li>Email: hello@xilikha.com</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Xilikha. All rights reserved. | Handcrafted with ❤️ in
            Assam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
