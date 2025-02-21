
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
                <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Manage Savings and Loans Effortlessly!</h1>
                <p className="text-lg mb-6">Simple, intuitive, and secure solutions for tracking and managing your finances.</p>
                <div className="flex justify-center space-x-4">
                    <a href={"#contact"} className="bg-white text-blue-500 px-6 py-2 rounded font-semibold">Get Started Now</a>
                    <Link to={"/ourInfo"} className="bg-blue-700 px-6 py-2 rounded font-semibold">Learn More</Link>
                </div>
                </div>
            </section>
    );
};

export default Banner;