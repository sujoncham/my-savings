

const Footer = () => {
  const year = new Date().getFullYear();
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-400">© { year} Savings App. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  