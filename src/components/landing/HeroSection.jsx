import { motion } from "framer-motion";
import Video from '../../assets/bg_video.mp4';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={Video} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/50">
        
        {/* Floating Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide font-tilt text-white"
        >
          Historical figure simulator
        </motion.h1>

        {/* Typing Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="mt-10 text-lg text-center font-dm text-[#D1C2AC] max-w-4xl px-4"
        >
          "History is no longer a book you read — it's a conversation you have."
        </motion.p>

        {/* Subtext */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="mt-2 text-lg font-dm text-center text-white max-w-4xl"
        >
          Speak to visionaries, creators, and legends. Today.
        </motion.span>

        {/* Button with Hover Effect */}
        <motion.div
          className="flex justify-center my-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2.5 , repeat: Infinity, repeatType: "reverse" }}
        >
         <motion.a
  href="#"
  whileHover={{ 
    scale: 1.05,
    color: "#fff",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)"
  }}
  whileTap={{ 
    scale: 0.95,
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
    y: 2
  }}
  className="bg-[#D1C2AC] py-3 px-5  rounded-md font-poppins font-semibold text-md
             border-b-4 border-[#8B7A68] 
             shadow-2xl transform -translate-y-1
             transition-all duration-200
             relative z-10
             before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-md before:z-[-1]"
>
  Start the Conversation
</motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
