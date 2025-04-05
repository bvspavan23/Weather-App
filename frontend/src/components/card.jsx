import React from "react";
import { motion } from "framer-motion";
const Card = ({ title, content, icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/20 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl text-center flex flex-col items-center space-y-2"
    >
      <div className="text-4xl">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-lg">{content}</p>
    </motion.div>
  );

export default Card;