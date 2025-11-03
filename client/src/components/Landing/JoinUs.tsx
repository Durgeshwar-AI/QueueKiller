import { ArrowRight } from "lucide-react";

function JoinUs() {
  return (
    <div className="bg-[#5045E8] flex flex-col text-white w-full justify-center items-center">
      <div className="flex flex-col items-center text-center gap-8 py-32">
        {/* Heading */}
        <p className="font-semibold text-lg">Ready to Get Started?</p>

        {/* Subheading */}
        <p className="text-lg">
          Join thousands of users who trust schedule for their appointment
          scheduling needs.
        </p>

        {/* Button */}
        <button className="mt-4 flex items-center gap-2 bg-white text-black font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Create Your Account
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <hr className="w-full text-black bg-black" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-16 px-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Stay Updated</h2>
          <p className="text-lg">
            Subscribe to our newsletter for the latest updates and features
          </p>
        </div>
        <div className="flex items-center justify-end gap-4 p-4 bg-transparent">
          <input
            type="text"
            placeholder="Enter Your Email"
            className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 placeholder:text-gray-300 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
