import { FiArrowRight } from 'react-icons/fi';

const Gridlayout= ({children, className}) => {
  return (
    <div className={`grid w-full bg-red-600 auto-rows-[500px] grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  )
}

const Cardlayout = ({children, className}) =>{
  return(
    <div 
      className={`group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl  [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu  ${className}`}
    >
      {children}
    </div>
  )}

export {Gridlayout, Cardlayout}