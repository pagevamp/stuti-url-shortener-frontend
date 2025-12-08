import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export const TableLoader = () => {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0.3 }}
      animate={{ scale: [1, 0.8, 1], opacity: 1 }}
      transition={{
        duration: 5,
        delay: 0,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <Icon
        icon="eos-icons:bubble-loading"
        height={84}
        width={84}
        className="text-emerald-950 bg-transparent text-shadow-2xs text-shadow-gray-700"
      />
    </motion.div>
  );
};
