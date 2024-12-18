"use client";

import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClickContext } from "./clickContex";


export const AnimatedSubscribeButton = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
}) => {
  const {clicked, action} = useContext(ClickContext)

  return (
    <AnimatePresence mode="wait">
      {clicked ? (
        <motion.button
          className="relative flex w-[75px] h-[35px] items-center justify-center overflow-hidden border-[3px] border-[#BFBFBF] rounded-md bg-white outline outline-1 outline-black"
          onClick={() => action(!clicked)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative flex w-[75px] h-[35px] cursor-pointer items-center justify-center border-[3px] border-[#BFBFBF] rounded-md"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={() => action(!clicked)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative w-full h-full block"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};