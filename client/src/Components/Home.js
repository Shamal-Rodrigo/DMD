import React, { useState } from 'react';
import { PhoneCall, MapPin, Clock, Car, Droplet, Zap, Truck, Menu, X, Instagram, Facebook, Check, ChevronRight } from 'lucide-react';

// Custom TikTok icon component since it's not in lucide-react
const TikTok = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4c0-1.1.9-2 2-2h2" />
    <path d="M12 16a4 4 0 0 1-4-4" />
    <path d="M17 8a4 4 0 0 0 4 4" />
    <path d="M21 12a4 4 0 0 1-4 4" />
  </svg>
);

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  
  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        {/* Navigation content remains the same */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Daniel's Mobile Detailing</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="/home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Pricing</a>
              {/* <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Testimonials</a> */}
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </div>
            
            {/* <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
              Book Now
            </button> */}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 px-2 space-y-4 bg-white">
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Home</a>
              <a href="#services" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Services</a>
              <a href="#pricing" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Pricing</a>
              {/* <a href="#testimonials" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Testimonials</a> */}
              <a href="#about" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Contact</a>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
                Book Now
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section and Features Section remain the same */}
       {/* Services Section */}
       <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive cleaning and detailing services for all vehicle types and commercial properties</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="text-white h-20 w-20 transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Car Detailing</h3>
                <p className="text-gray-600 mb-4">Complete interior and exterior detailing to make your vehicle look and feel like new.</p>
                <a href="#pricing" className="text-blue-600 font-medium flex items-center group-hover:text-blue-700">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Droplet className="text-white h-20 w-20 transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Car Wash</h3>
                <p className="text-gray-600 mb-4">Mobile wash services with eco-friendly products that protect your vehicle's finish.</p>
                <a href="#pricing" className="text-blue-600 font-medium flex items-center group-hover:text-blue-700">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-blue-400 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="text-white h-20 w-20 transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Gas Station Cleaning</h3>
                <p className="text-gray-600 mb-4">Specialized cleaning services for gas stations to maintain professional standards.</p>
                <a href="#pricing" className="text-blue-600 font-medium flex items-center group-hover:text-blue-700">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-blue-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Truck className="text-white h-20 w-20 transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Commercial Cleaning</h3>
                <p className="text-gray-600 mb-4">Professional cleaning services for commercial properties and businesses.</p>
                <a href="#pricing" className="text-blue-600 font-medium flex items-center group-hover:text-blue-700">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEW PRICING SECTION */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Prices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Affordable packages for all vehicle types with transparent pricing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Exterior Package */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1 text-center">Exterior</h3>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-sm opacity-75">Car</p>
                    <p className="text-3xl font-bold">£25</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-75">Van</p>
                    <p className="text-3xl font-bold">£35</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hand Wash & Wipedown Exterior</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Clean Windows</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Clean door shuts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Tire dressing</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-700">
                    + Add special hand wax & shining for <span className="font-bold">£15</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Interior Package */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1 text-center">Interior</h3>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-sm opacity-75">Car</p>
                    <p className="text-3xl font-bold">£25</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-75">Van</p>
                    <p className="text-3xl font-bold">£35</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Interior Vacuum</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Clean all door jambs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Dashboard and center console cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Clean Interior plastic panel</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Clean all carpets and seats</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-700">
                    + Add seats & carpets steam cleaning for <span className="font-bold">£15</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Full Package */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
              </div>
              
              <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1 text-center">Exterior & Interior</h3>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-sm opacity-75">Car</p>
                    <p className="text-3xl font-bold">£40</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-75">Van</p>
                    <p className="text-3xl font-bold">£60</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Everything on Interior package</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Everything on Exterior package</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-700">
                    + Add special services on both packages for <span className="font-bold">£20</span>
                  </p>
                </div>
                
                {/* <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Book This Package
                </button> */}
              </div>
            </div>
          </div>

            {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">We Come To You</h3>
              <p className="text-gray-600">Save time and hassle with our mobile service that comes to your home or workplace.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Droplet className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Products</h3>
              <p className="text-gray-600">We use only high-quality, eco-friendly products that are safe for your vehicle and the environment.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Check className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">If you're not 100% satisfied with our service, we'll make it right. Your happiness is our priority.</p>
            </div>
          </div>
        </div>
      </section>
          
          {/* Additional Info */}
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Service Area</h4>
                  <p className="text-gray-600">No transportation charges within 8 miles radius</p>
                  <p className="font-medium">Park Gate, Southampton</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <PhoneCall className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Book Now</h4>
                  <p className="text-gray-600">Call us directly to schedule your appointment</p>
                  <p className="font-medium text-xl">078 69 99 7211</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto mt-8 bg-yellow-50 p-4 rounded-lg">
            <p className="text-center text-sm text-gray-700">
              <span className="font-bold">Note:</span> Electricity needs to be provided • Limited time offer
            </p>
          </div>
        </div>
      </section>

      {/* The rest of the sections remain the same */}
      {/* ... existing code ... */}
      
      {/* Update the Contact section to include TikTok */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions or ready to book? Contact us today.</p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <PhoneCall className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">078 69 99 7211</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">Park Gate, Southampton</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Business Hours</p>
                    <p className="font-medium">Mon-Sat: 8AM - 6PM</p>
                    <p className="font-medium">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="www.facebook.com" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="https://www.instagram.com/daniel_s_mobiledetailing?igsh=MTI1ZTRxaHdpaW5xag==" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="www.tiktok.com" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
                    <TikTok />
                  </a>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-center text-gray-600">
                  <strong>Note:</strong> Our contact form is temporarily unavailable. Please call us directly or reach out via social media.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* About Section */}
        <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Daniel's Mobile Detailing</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Founded with a passion for perfection, Daniel's Mobile Detailing brings professional cleaning services right to your doorstep. 
                We understand that your time is valuable, which is why we've made it our mission to provide convenient, high-quality detailing services.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                What we lack in years, we make up for with enthusiasm, cutting-edge techniques, and a customer-first approach. Every vehicle we touch is treated with the utmost care using only premium, eco-friendly products that deliver outstanding results.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg">
                Our Story
              </button>
            </div>
            <div className="bg-gray-200 h-96 rounded-xl overflow-hidden shadow-xl">
              {/* This would be an image in a real implementation */}
              <div className="h-full w-full flex items-center justify-center">
                <Car className="h-32 w-32 text-gray-400" />
                <span className="sr-only">Image of Daniel's Mobile Detailing team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Without Newsletter */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-bold">Daniel's Mobile Detailing</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Professional mobile detailing services that come to you. Quality, convenience, and excellence in every detail.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Car Detailing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Car Wash</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gas Station Cleaning</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Commercial Cleaning</a></li>
              </ul>
            </div>
          </div>
          
          <hr className="border-gray-700 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Daniel's Mobile Detailing. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;