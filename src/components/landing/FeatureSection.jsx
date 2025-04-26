import { features } from "./contant";

const FeatureSection = () => {
  return (
    <section className="relative py-20 border-b border-neutral-800 bg-gradient-to-b from-[#A67C52] to-[#8B5E3C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="bg-black text-white font-poppins border-2 border-white rounded-full text-lg font-medium px-8 py-3 uppercase tracking-wider shadow-lg">
              Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-tilt text-white mb-6">
            Converse with{" "}
            <span className="bg-gradient-to-r from-[#5C3B22] to-[#8B5E3C] text-transparent bg-clip-text font-bold">
              historical legends
            </span>
          </h2>
          <p className="text-lg text-white/90 font-dm max-w-2xl mx-auto">
            Transform your understanding of history through authentic conversations 
            with figures who shaped our world.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl transition-all duration-300 
                        hover:bg-black/40 hover:transform hover:scale-105 hover:shadow-xl 
                        border border-white/10 hover:border-white/20"
            >
              <div className="flex items-start space-x-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full 
                              bg-black border-2 border-[#D1C2AC] shadow-md
                              group-hover:bg-[#D1C2AC] transition-colors duration-300">
                  <div className="text-[#D1C2AC] text-xl">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-tilt text-white mb-3">
                    {feature.text}
                  </h3>
                  <p className="text-white/80 font-dm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default FeatureSection;