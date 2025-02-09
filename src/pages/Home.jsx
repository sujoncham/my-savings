import { Link } from "react-router-dom";

import Message from "../componants/Message";
import Testimonial from "../componants/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBlogs } from "../redux/features/blogSlice";



const Home = () => {
    const dispatch = useDispatch();
  const { homeBlogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs({ type: "home" }));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
    return (
        <div>
            

            {/*  Hero Section  */}
            <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
                <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Manage Savings and Loans Effortlessly!</h1>
                <p className="text-lg mb-6">Simple, intuitive, and secure solutions for tracking and managing your finances.</p>
                <div className="flex justify-center space-x-4">
                    <a href={"#contact"} className="bg-white text-blue-500 px-6 py-2 rounded font-semibold">Get Started Now</a>
                    <Link href="#services" className="bg-blue-700 px-6 py-2 rounded font-semibold">Learn More</Link>
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
            <section id="home-blog" className="bg-gray-100 py-16">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8">Latest Blog Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {homeBlogs.map((blog) => (
                        <div key={blog._id} className="p-6 bg-white rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                        <p className="text-sm">{blog.content.slice(0, 120)} ...</p>
                        <img src={blog.image} alt={blog.title} className="my-4 w-full h-48 object-cover rounded" />
                        <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline mt-4 inline-block">
                            Read More
                        </Link>
                        </div>
                    ))}
                    </div>
                    <div className="text-center mt-6">
                    <Link to="/blogs" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        View All Blogs
                    </Link>
                    </div>
                </div>
                </section>

            {/* { Sliding Services Section } */}
            <section  className="bg-gray-300 py-16">
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
            <section id="contact" className="bg-gradient-to-r from-blue-500 to-teal-500 py-20">

            <Message />
            </section>
            </div>
    );
};

export default Home;