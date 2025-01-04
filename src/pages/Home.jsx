import Blog from "../componants/Blog";
import Message from "../componants/Message";
import Testimonial from "../componants/Testimonial";



const Home = () => {
    return (
        <div>
            

            {/*  Hero Section  */}
            <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
                <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Manage Savings and Loans Effortlessly!</h1>
                <p className="text-lg mb-6">Simple, intuitive, and secure solutions for tracking and managing your finances.</p>
                <div className="flex justify-center space-x-4">
                    <a href="/signup" className="bg-white text-blue-500 px-6 py-2 rounded font-semibold">Get Started Now</a>
                    <a href="#services" className="bg-blue-700 px-6 py-2 rounded font-semibold">Learn More</a>
                </div>
                </div>
            </section>

            {/* {Services Section} */}
            <section id="services" className="py-16">
                <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 border rounded text-center">
                    <h3 className="text-xl font-semibold mb-2">Savings Management</h3>
                    <p>Track and grow your savings easily.</p>
                    </div>
                    <div className="p-6 border rounded text-center">
                    <h3 className="text-xl font-semibold mb-2">Loan Tracking</h3>
                    <p>Stay on top of loans with detailed insights.</p>
                    </div>
                    <div className="p-6 border rounded text-center">
                    <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
                    <p>Keep an eye on where your money goes.</p>
                    </div>
                    <div className="p-6 border rounded text-center">
                    <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
                    <p>Access all your financial data in one place.</p>
                    </div>
                </div>
                </div>
            </section>

            {/* {Blog Section} */}
           <Blog />

            {/* { Sliding Services Section } */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
                <div className="relative">
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                    <div className="min-w-[300px] bg-white rounded shadow p-6">
                        <h3 className="text-xl font-semibold">Personal Loans</h3>
                        <p className="mt-2 text-gray-600">Affordable and flexible loans for your needs.</p>
                    </div>
                    <div className="min-w-[300px] bg-white rounded shadow p-6">
                        <h3 className="text-xl font-semibold">Savings Accounts</h3>
                        <p className="mt-2 text-gray-600">Grow your savings with our secure accounts.</p>
                    </div>
                    <div className="min-w-[300px] bg-white rounded shadow p-6">
                        <h3 className="text-xl font-semibold">Financial Planning</h3>
                        <p className="mt-2 text-gray-600">Get expert advice for better financial health.</p>
                    </div>
                    <div className="min-w-[300px] bg-white rounded shadow p-6">
                        <h3 className="text-xl font-semibold">Expense Management</h3>
                        <p className="mt-2 text-gray-600">Track and optimize your expenses effortlessly.</p>
                    </div>
                    </div>
                </div>
                </div>
                
            </section>

            <Testimonial />
            


            {/* Contact Section  */}
            <Message />
            </div>
    );
};

export default Home;