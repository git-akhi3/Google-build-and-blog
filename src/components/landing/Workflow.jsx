import { CheckCircle2 } from "lucide-react";
import Chat from '../../assets/chatSS.png';
import { checklistItems } from "./contant";

const Workflow = () => {
  return (
    <section className="relative py-20 bg-black border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-tilt text-white mb-6">
            Accelerate your{" "}
            <span className="bg-gradient-to-r from-[#A67C52] to-[#D1C2AC] text-transparent bg-clip-text font-bold">
              learning journey.
            </span>
          </h2>
          <p className="text-lg text-white/80 font-dm max-w-2xl mx-auto">
            Experience history through authentic conversations with figures who shaped our world.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl shadow-[#A67C52]/20 transform hover:scale-105 transition-all duration-500">
            <img 
              src={Chat} 
              alt="Historical Conversation" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Checklist Section */}
          <div className="space-y-8">
            {checklistItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-6 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 
                          hover:bg-neutral-800/70 hover:border-[#A67C52]/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full 
                              bg-black border-2 border-[#A67C52] text-[#D1C2AC]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h5 className="text-xl font-bold font-dm text-white mb-2">{item.title}</h5>
                  <p className="text-md text-neutral-400 font-dm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#A67C52]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#A67C52]/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Workflow;