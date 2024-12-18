'use client'

import { useContext } from "react";
import { ClickContext } from "./clickContex";
import { FiX } from "react-icons/fi";

export default function EditableForm(){
  const {action} = useContext(ClickContext)
  return(
  <form
    dir="rtl"
    className='flex gap-[5px] justify-start items-center w-full h-[34px] px-[5px] border-[3px]'
    onSubmit={(e) => { e.preventDefault();}}
  >
    <div className='cursor-pointer'
        onClick={(e) => {action(false) }}
    >
      <FiX className='text-red-600 text-[20px]' />
    </div>
    <input
      className='w-full px-[5px] border-[2px] border-blue-200'
      type="text"
      required
    />
  </form>
)}
