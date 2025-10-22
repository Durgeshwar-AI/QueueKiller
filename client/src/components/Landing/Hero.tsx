const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col max-w-[700px] gap-4">
        <p className="font-bold text-3xl m-4">Book Appointments with Ease</p>
        <p className="text-justify">
          Connect with departments across multiple companies and schedule
          appointments seamlessly. Whether you're booking a consultation or
          managing availability, we've got you covered.
        </p>
        <div className="gap-4 flex">
          <button className="text-white font-bold bg-black px-4 py-2 rounded-lg">
            Get Started -&gt;
          </button>
          <button className="px-4 py-2 rounded-lg bg-white">Company Login</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
