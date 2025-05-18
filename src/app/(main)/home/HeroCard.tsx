'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function HeroCard({ title, description, image, url }: HeroCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        backgroundColor: 'rgba(var(--color-secondary-rgb), 0.2)',
      }}
      transition={{ duration: 0.3 }}
      className="border-secondary/30 bg-secondary/10 overflow-hidden rounded-lg border shadow-lg"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <div className="relative h-60 overflow-hidden md:h-full">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              className="h-full w-full"
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        <div className="w-full p-6 md:w-2/3">
          <h3 className="mb-2 text-2xl font-bold text-secondary">{title}</h3>
          <p className="text-on-body/80 mb-4">{description}</p>
          <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
            <Link
              href={`/${url}`}
              className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 font-medium text-on-secondary shadow transition-all duration-300 hover:bg-primary hover:text-on-primary"
            >
              Explorar
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="ml-1 h-4 w-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
