import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  open?: boolean;
}

export const SlideBar: React.FC<Props> = ({ children, open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ left: '-100%' }}
          animate={{ left: 0 }}
          exit={{ left: '-100%' }}
          transition={{ duration: 0.3, delay: 0, ease: 'easeInOut' }}
          className="absolute top-0 h-full"
        >
          <div className="h-full w-full flex-col">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
