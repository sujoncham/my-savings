

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      text: "This app has made managing my loans and savings so much easier. Highly recommended!",
      name: "John Doe",
      role: "Small Business Owner",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      text: "A must-have tool for anyone looking to simplify their finances. The interface is fantastic!",
      name: "Jane Smith",
      role: "Freelancer",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      text: "Managing expenses has never been easier. The support team is also amazing!",
      name: "Michael Brown",
      role: "Entrepreneur",
      image: "https://via.placeholder.com/50",
    },
  ];

 

  return (
    <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* <!-- Testimonial 1 --> */}
                    {testimonials.map(testi=><div key={testi.id} className="bg-gray-50 p-6 rounded shadow">
                        <p className="text-gray-600 italic">
                        &quot; { testi.text} &quot;
                        </p>
                        <div className="mt-4 flex items-center">
                        <img 
                            src="https://via.placeholder.com/50" 
                            alt="User 1" 
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="text-sm font-bold">{ testi.name}</h4>
                          <span className="text-xs text-gray-500">{ testi.role}</span>
                        </div>
                        </div>
                    </div>)}
                    
                   
                    </div>
                </div>
            </section>
  );
};

export default Testimonial;
