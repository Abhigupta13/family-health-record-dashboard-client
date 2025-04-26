import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HeartPulse, Stethoscope, UserCog, Shield } from "lucide-react";
import useScrollToTop from "../hooks/useScrollToTop";

const LandingPage = () => {
  const navigate = useNavigate();
  useScrollToTop();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token"); 
    if (token) {
      navigate('/dashboard'); 
    } else {
      navigate('/auth'); 
    }
  };

  const features = [
    {
      title: "Health Records",
      description: "Health records are digital files that contain important medical information such as diagnoses, treatments, medications, and test results. They provide easy access to essential health data, helping individuals and healthcare providers manage care efficiently.",
      icon: HeartPulse,
      link: "/dashboard"
    },
    {
      title: "Prescription Tracking",
      description: "Prescription tracking helps users monitor medications, track dosage, and manage refills. It ensures timely adherence and provides a clear history for better healthcare management.",
      icon: Stethoscope,
      link: "/prescription-tracking"
    },
    {
      title: "Doctor Access",
      description: "Doctor access allows users to easily share health records with healthcare providers, enabling timely consultations and informed decision-making. It streamlines communication for better care coordination.",
      icon: UserCog,
      link: "/doctor-access"
    },
    {
      title: "Health Support",
      description: "Health support offers assistance through personalized care plans, wellness tips, and expert advice. It ensures continuous guidance for maintaining and improving overall health.",
      icon: Shield,
      link: "/health-support"
    }
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-white items-center justify-center py-12 sm:py-20 h-auto min-h-[500px] sm:min-h-[630px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://cdn.pixabay.com/photo/2022/03/27/08/46/medicine-7094412_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Family Health Management Simplified
          </h1>
          <p className="text-base sm:text-lg mb-6 text-teal-300 drop-shadow-md max-w-2xl mx-auto">
            Store and monitor your family&apos;s health records, prescriptions, and
            treatments in one place.
          </p>
          <Button
            onClick={handleGetStarted}
            variant="primary"
            size="lg"
            className="px-6 py-3 mt-4 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-xl shadow-lg hover:shadow-xl active:scale-95"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Our Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-teal-50 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-xl group-hover:bg-teal-200 transition-colors">
                      <feature.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-teal-600">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-teal-600 group-hover:text-teal-700 transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 sm:py-20 bg-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
            Ready to take control of your family&apos;s health?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of families who are already managing their health records efficiently.
          </p>
          <Button
            onClick={handleGetStarted}
            variant="primary"
            size="lg"
            className="px-6 py-3 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-xl shadow-lg hover:shadow-xl active:scale-95"
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;