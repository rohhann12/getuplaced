import { FC } from 'react';
import { FaUserGraduate, FaBookOpen, FaChalkboardTeacher, FaRocket, FaCode, FaBriefcase, FaLaptopCode, FaTools, FaCheck } from 'react-icons/fa';

const steps = [
  { icon: <FaUserGraduate size={24} />, title: 'Create Account', description: 'Sign up on GetYouPlaced and build your student profile.' },
  { icon: <FaRocket size={24} />, title: 'Cold Email', description: 'Create template and start mass cold emailing.' },
  { icon: <FaCheck size={24} />, title: 'Get Placed', description: 'Land your dream job!' },
];

const HowToUseGetYouPlaced: FC = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Use GetYouPlaced</h2>
        <p className="text-lg text-gray-600 mb-10">
          Start your placement journey with these simple steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="flex justify-center items-center w-12 h-12 bg-grey-500 text-black-500 rounded-full mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Watch a Quick Overview</h3>
          <p className="text-gray-600 mb-4">Learn more about how GetYouPlaced works in this video.</p>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/uoytlPVVqVw"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
        </div>

        </div>
      </div>
    </section>
  );
};

export default HowToUseGetYouPlaced;
