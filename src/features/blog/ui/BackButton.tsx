'use client';
import { FaArrowLeft } from 'react-icons/fa6';

export const BackButton: React.FC = () => (
  <button
    onClick={() => history.back()}
    className="my-6 flex cursor-pointer items-center gap-4"
  >
    <FaArrowLeft />
    <p> Regresar </p>
  </button>
);
