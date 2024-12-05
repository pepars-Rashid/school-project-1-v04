'use client'
import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiChevronDown, FiEdit, FiMoreVertical, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Accordion({level, sections, setDisableScroll}){
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <button
          dir='rtl'
          type="button"
          className={`w-full h-[34px] px-[10px] flex justify-between items-center border-[#BFBFBF] ${isOpen ? 'rounded-t-[5px] border-t-[3px] border-r-[3px]' : 'rounded-[5px] border-[3px]'} border-l-[3px] text-black hover:bg-gray-100 focus:outline-none focus:ring-blue-300 font-medium text-sm dark:hover:bg-gray-100 dark:focus:ring-blue-800`}
          onClick={toggleAccordion}
        >
          <div className='flex gap-[10px] items-center'>
            <ThreeDotsMenu setDisableScroll={setDisableScroll}/>
            <span>
              {level}
            </span>
          </div>
          <FiChevronDown className={`text-[20px] transform duration-500 ${isOpen ? 'rotate-180' : ''} shrink-0`}/>
        </button>
      </div>
      <div dir='rtl'
        className={`${isOpen ? 'flex' : 'hidden'} justify-start rounded-b-[5px] border-[#BFBFBF] border-b-[3px] border-r-[3px] border-l-[3px] bg-white divide-y divide-gray-100 dark:bg-white`}
      >
        {/* check whether sections is empty or not  'is empty': rest (let this for me)*/}
        {sections.length === 0 ? 
        ( 
          <div className="text-sm w-full h-[34px] flex justify-between px-[10px] items-center">
            لا يوجد شعب
          </div> 
        ) 
        :
        ( <ul className="w-full text-sm text-black"> 
            {sections.map((section, index) => ( 
              <li key={index}> 
                <button className="w-full h-[34px] flex justify-between px-[10px] items-center hover:bg-gray-100 dark:hover:bg-gray-100"> 
                  <div className="flex items-center gap-[12px]"> <ThreeDotsMenu isSection={true} setDisableScroll={setDisableScroll}/> 
                    <span>{section}</span>
                  </div>
                  <FiArrowLeft />
                </button> 
              </li> 
            ))} 
          </ul> 
        )}
      </div>
    </div>
  );
};

const ThreeDotsMenu = ({ isSection, setDisableScroll }) => {  
  const [isOpen, setIsOpen] = useState(false);  
  const dropdownRef = useRef(null);  
  const buttonRef = useRef(null);  

  useEffect(() => {  
    const handler = (e) => {  
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {  
        setIsOpen(false);  
        setDisableScroll(false)
      }  
    };  

    document.addEventListener('mousedown', handler);  
    return () => {  
      document.removeEventListener('mousedown', handler);  
    };  
  }, []);  

  const toggleDropdown = (e) => {  
    e.stopPropagation();  
    setIsOpen(!isOpen);
    setDisableScroll(true)
  };  

  return (  
    <div ref={dropdownRef} className="inline-block">  
      <div onClick={toggleDropdown} ref={buttonRef} className="flex items-center">  
        <FiMoreVertical className="text-[#7164FA] cursor-pointer size-[20px] p-[2px] rounded-[5px] hover:bg-gray-50" />  
      </div>  
      {isOpen && (  
        <div  
          className="absolute z-50 mt-[5px] w-[120px] rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5"  
          style={{  
            top: `${buttonRef.current.getBoundingClientRect().bottom-100 + window.scrollY }px`,  
          }}  
        >  
          <ul className="p-[1px] text-sm">  
            <li className="flex justify-start items-center gap-[5px] rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">  
              <FiPlus />  
              إضافة  
            </li>  
            {!isSection && (  
              <li className="flex justify-start items-center gap-[5px] rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">  
                <FiEdit />  
                تعديل  
              </li>  
            )}  
            <li className="flex justify-start items-center gap-[5px] rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">  
              <FiTrash2 />  
              حذف  
            </li>  
          </ul>  
        </div>  
      )}  
    </div>  
  );  
};  

