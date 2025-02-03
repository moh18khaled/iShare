import React, { useEffect } from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css';

const Categories = () => {
    useEffect(() => {
        Aos.init({
          duration: 2000,
          once: true,
        });
      }, []);
      
    const categoryNames = [
        {
            name: "All Categories",
            path : "#",
        },
        {
            name: "Dining",
            path : "#",
        },
        {
            name: "Healthcare",
            path : "#",
        },
        {
            name: "Education",
            path : "#",
        },
        {
            name: "Fashion",
            path : "#",
        },
    ]
  return (
    <div className='mt-12' data-aos="fade-up" data-aos-delay="100">
      <div className="flex gap-3 flex-wrap justify-center text-lg">
        {categoryNames.map((category,idx)=>(
            <a key={idx} className="text-center my-2 inline-block w-40 rounded-full bg-mainColor bg-opacity-10 px-4 py-2 font-semibold text-red-800 duration-200 hover:bg-opacity-95 hover:text-white hover:no-underline sm:w-56"
            href={category.path}>{category.name}</a>
        ))}
    
</div>
    </div>
  )
}

export default Categories
