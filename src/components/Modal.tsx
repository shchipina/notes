import type { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  children: ReactNode,
  onClose: () => void,
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      <div
        className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow text-[#333] w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black"
        >
          <IoMdClose size={30} />
        </button>

        {children}
      </div>
    </>

  );
}

export default Modal;
