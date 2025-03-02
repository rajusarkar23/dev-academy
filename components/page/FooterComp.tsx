export default function FooterComp() {
  return (
    <footer className="text-white py-8 relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center opacity-5">
        <h1 className="text-7xl md:text-9xl font-bold uppercase text-white">
          Dev Academy
        </h1>
      </div>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold">Dev Academy</h2>
            <p className="text-gray-400 mt-2">
              Empowering developers through education.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Dev Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
