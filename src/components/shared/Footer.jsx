import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-8">
        {/* Logo and Social Media Icons */}
        <div className="flex justify-between items-center mb-8">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#1569B8]"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13.41V16h-2v-.59l-4.5-4.5V9h5V6h2v3h5v2l-4.5 4.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>HealthCare</span>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-2xl cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-2xl cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-2xl cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
          {/* Address & Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <p>Address: National Housing Complex, Ranchi, Jharkhand, India</p>
            <p>Call Us: (+91) 8988456764</p>
            <p>Email: info@healthcaresuccess.com</p>
          </div>

          {/* Our Clients */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Clients</h3>
            <ul className="space-y-2">
              <li>Hospitals and Health Systems</li>
              <li>Multilocation Medical</li>
              <li>Multilocation Dental</li>
              <li>Marketing for Doctors</li>
              <li>Addiction Treatment</li>
              <li>Long-Term Care</li>
              <li>Pharma and Biotech</li>
              <li>Medical Device</li>
              <li>Medicare Advantage</li>
            </ul>
          </div>

          {/* Marketing Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Marketing Services</h3>
            <ul className="space-y-2">
              <li>Branding</li>
              <li>Creative</li>
              <li>Paid Search</li>
              <li>Social Media</li>
              <li>SEO</li>
              <li>Content Marketing</li>
              <li>Traditional Advertising and Media</li>
              <li>Reputation Management</li>
              <li>Website Design</li>
            </ul>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">About Us</h3>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>Team</li>
              <li>Testimonials</li>
              <li>Case Studies</li>
              <li>Our Work</li>
              <li>Blog</li>
              <li>Press</li>
              <li>Speaking</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Links */}
        <div className="flex justify-between items-center mt-12 border-t border-gray-700 pt-4">
          {/* Copyright */}
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCopyright} className="text-sm mr-2" />
            <span className="text-sm">Reserved by Dhruv, Abhishek, Nitesh</span>
          </div>

          {/* Terms & Privacy Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:underline">
              Terms & Conditions
            </a>
            <a href="#" className="text-sm hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
