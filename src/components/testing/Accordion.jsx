'use client'
import { useContext, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiChevronDown, FiEdit, FiMoreVertical, FiPlus, FiTrash2 } from 'react-icons/fi';
import { ClickContext } from './clickContex';
import EditableForm from './editable-class';

export default function Accordion({level, sections, setDisableScroll, pos1}){
  const {postion} = useContext(ClickContext)
  const [listIsOpen, setListIsOpen] = useState(false);

  const toggleAccordion = () => {
    setListIsOpen(!listIsOpen);
  };

  return (
    <div>
      <div>
        <button
          dir='rtl'
          type="button"
          className={`w-full h-[34px] px-[10px] flex justify-between items-center border-[#BFBFBF] ${listIsOpen ? 'rounded-t-[5px] border-t-[3px] border-r-[3px]' : 'rounded-[5px] border-[3px]'} border-l-[3px] text-black hover:bg-gray-100 focus:outline-none focus:ring-blue-300 font-medium text-sm dark:hover:bg-gray-100 dark:focus:ring-blue-800`}
          onClick={toggleAccordion}
        >
          <div className='flex gap-[10px] items-center'>
            <ThreeDotsMenu setDisableScroll={setDisableScroll} listIsOpen={listIsOpen} pos1={pos1}/>
            <span>
              {level}
            </span>
          </div>
          <FiChevronDown className={`text-[20px] transform duration-500 ${listIsOpen ? 'rotate-180' : ''} shrink-0`}/>
        </button>
      </div>
      <div dir='rtl'
        className={`${listIsOpen ? 'flex' : 'hidden'} justify-start rounded-b-[5px] border-[#BFBFBF] border-b-[3px] border-r-[3px] border-l-[3px] bg-white divide-y divide-gray-100 dark:bg-white`}
      >
        {/* check whether sections is empty or not  'is empty': rest (let this for me)*/}
        {sections.length === 0 ? 
        ( 
          <div className="text-sm w-full h-[34px] flex justify-between px-[10px] items-center">
            { postion.pos1 === pos1 ?
            <EditableForm/>
            :
            <span>لا يوجد شعب</span>
            }
          </div> 
        ) 
        :
        ( <ul className="w-full text-sm text-black"> 
            {sections.map((section, index) => ( 
              <li key={index}> 
                <button className="w-full h-[34px] flex justify-between px-[10px] items-center hover:bg-gray-100 dark:hover:bg-gray-100"> 
                  <div className="flex items-center gap-[12px]"> 
                    <ThreeDotsMenu isSection={true} setDisableScroll={setDisableScroll} listIsOpen={listIsOpen}/> 
                    <span>{section}</span>
                  </div>
                  <FiArrowLeft/>
                </button> 
              </li> 
            ))}
            { postion.pos1 === pos1 &&
            <EditableForm/>
            }
          </ul> 
        )}
      </div>
    </div>
  );
};

const ThreeDotsMenu = ({ isSection, setDisableScroll, listIsOpen, pos1, pos2 }) => { 
  const {clicked, action} = useContext(ClickContext)
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
            top: `${buttonRef.current.getBoundingClientRect().bottom- (window.innerWidth < 1024 ? 620 : 100) + window.scrollY }px`,  
          }}  
        >  
          <ul className="p-[1px] text-sm">  
            {!isSection && ( 
              <li className="flex justify-start items-center gap-[5px] rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={(e)=>{listIsOpen && e.stopPropagation() ;setIsOpen(false); action(true, pos1)}}
              >  
                <FiPlus />  
                إضافة  
              </li>   
            )} 
              <li className="flex justify-start items-center gap-[5px] rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={(e)=>{e.stopPropagation(); action(false)}}
              >  
                <FiEdit />  
                تعديل  
              </li>    
              <li className="flex justify-start items-center gap-[5px] rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={(e)=>{e.stopPropagation(); action(false)}}
              >  
                <FiTrash2 />  
                حذف  
              </li>  
          </ul>  
        </div>  
      )}  
    </div>  
  )};