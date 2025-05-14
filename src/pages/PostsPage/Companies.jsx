import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Companies = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Duplicate the array to ensure enough slides for loop
  const companiesImages = [
    'https://i.postimg.cc/cK2NP8xN/client-1.png',
    'https://i.postimg.cc/8fBQFKh1/client-2.png',
    'https://i.postimg.cc/grvPBJ1f/client-3.png',
    // 'https://i.postimg.cc/V0cPkQ0G/client-4.png',
    'https://i.postimg.cc/ZBNhmKnv/client-5.png',
    'https://i.postimg.cc/Mvq8kwSX/client-6.png',
    'https://i.postimg.cc/8fBQFKh1/client-2.png',
    'https://i.postimg.cc/ZBNhmKnv/client-5.png',

    
  ];

  return (
    <section id="clients" className="clients section py-12">
      <div data-aos="fade-up" data-aos-delay="100">
            <h1 className='font-linotte text-3xl lg:text-4xl text-center font-semibold pt-20 pb-1 font-GESSTwoBold' lang='ar'>برعاية</h1>

      <div className="container mx-auto px-4 mt-16" >

        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          speed={600}
          autoplay={{ 
            delay: 2000,
            disableOnInteraction: false, // Keep autoplay running after interaction
          }}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 60
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 80
            },
            992: {
              slidesPerView: 6,
              spaceBetween: 120,
              // Add these for better loop control
              loopAdditionalSlides: 6,
              loopedSlides: 6,
            }
          }}
          className="swiper-init"
        >
          {companiesImages.map((company, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center pb-8">
              <img 
                src={company} 
                className="w-[70%] h-[70%] md:w-[130%] md:h-[130%]  object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" 
                alt={`Client ${index + 1}`} 
              />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mt-8 lg:mt-12"></div>
        </Swiper>
      </div>
      </div>
    </section>
  );
};

export default Companies;