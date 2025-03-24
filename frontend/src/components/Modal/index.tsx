import { motion } from "motion/react";
import { useState } from "react";

type ModalProps = {
  title: string;
  openModal?: boolean;
};

const Modal = ({ title, openModal = true }: ModalProps) => {
  const [showModal, setShowModal] = useState(openModal);
  return (
    <>
      <motion.div
        initial={{ opacity: showModal ? 0 : 1 }}
        animate={{ opacity: showModal ? 1 : 0 }}
        className="absolute max-w-[450px] h-max max-h-[500px] p-4 bg-gray-950 rounded-3xl inset-x-0 inset-y-0 m-auto"
      >
        <div className="w-full flex items-center justify-between text-xl font-bold mb-6 border-b-2 pb-4 border-emerald-800">
          <p className="">{title}</p>
          <i
            className="ri-close-large-line"
            onClick={() => setShowModal(false)}
          ></i>
        </div>
        <div className="border-b-2 pb-4 border-emerald-950 text-lg font-semibold text-center">
          What Do you want to do today?
        </div>
        <div className="flex items-center justify-between px-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="rounded-full bg-emerald-800 p-4 flex flex-col gap-2 w-30 h-30 items-center justify-center cursor-pointer"
            onClick={() => {
              const queryParams = new URLSearchParams({
                role: "sender",
                client: "mobile",
              });
              window.location.href = `?${queryParams.toString()}`;
            }}
          >
            <motion.i
              initial={{ translateX: 0, translateY: 0 }}
              whileHover={{
                translateX: [0, 10, 20, 30, 20, 10, 0],
                translateY: [0, -10, -20, -30, -20, -10, 0],
              }}
              transition={{
                duration: 1,
              }}
              className="ri-send-plane-fill text-5xl"
            ></motion.i>
            <p className="text-lg font-bold bg-emerald-600 rounded-full truncate px-2">
              Send
            </p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="rounded-full bg-amber-800 p-4 flex flex-col gap-2 w-30 h-30 items-center justify-center cursor-pointer"
          >
            <motion.i
              initial={{ translateX: 0, translateY: 0 }}
              whileHover={{
                translateY: [0, 10, 20, 30, 20, 10, 0],
              }}
              transition={{
                duration: 1,
              }}
              className="ri-download-2-line text-5xl"
              onClick={() => {
                const queryParams = new URLSearchParams({ role: "receiver" });
                window.location.href = `?${queryParams.toString()}`;
              }}
            ></motion.i>
            <p className="text-xl font-bold bg-amber-600 px-8 rounded-full">
              Receive
            </p>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
