import axios from "axios";
import { useEffect, useState } from "react";


const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  // console.log(testimonials);
  useEffect(() => { 
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/testimonials/getTestimonials");
        setTestimonials(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* <!-- Testimonial 1 --> */}
                    {testimonials.map(testi=><div key={testi._id} className="bg-gray-50 p-6 rounded shadow">
                        <p className="text-gray-600 italic">
                        &quot; { testi.text} &quot;
                        </p>
                        <div className="mt-4 flex items-center">
                        <img 
                            src={testi.image} 
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
