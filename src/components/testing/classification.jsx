'use client';  
import { FiCheck, FiPlus, FiX } from "react-icons/fi";  
import Accordion from "./Accordion";  
import { AnimatedSubscribeButton } from "./animated-Button";  
import { useState, useEffect, useRef, useContext } from "react";  
import { ClickContext } from "./clickContex";
import EditableForm from "./editable-class";

export default function AccordionList() {  
  const {clicked, postion} = useContext(ClickContext)
  const [disableScroll, setDisableScroll] = useState(false);  
  const scrollableContainerRef = useRef(null);  

  const data = [  
    { id: 100, level: 'الصف الأول', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },  
    { id: 1, level: 'الصف الثاني', sections: [] },  
    { id: 2, level: 'الصف 2', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },  
    { id: 3, level: 'الصف 3', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },  
    { id: 4, level: 'الصف 4', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },  
    { id: 5, level: 'الصف 5', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },  
    { id: 6, level: 'الصف 6', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },  
    { id: 7, level: 'الصف 7', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },  
  ];  

  const handleScroll = (event) => {  
    if (disableScroll) {  
      event.preventDefault();  
    }  
  };  

  useEffect(() => {  
    const scrollableContainer = scrollableContainerRef.current;  

    if (scrollableContainer) {  
      // Attach event listeners to the container  
      scrollableContainer.addEventListener('wheel', handleScroll, { passive: false }); // Prevent mouse scroll  
      scrollableContainer.addEventListener('touchmove', handleScroll, { passive: false }); // Prevent touch scroll  
      
      // Handle swipe gesture for touchpad (trackpads) by preventing scrolling  
      scrollableContainer.addEventListener('scroll', (event) => {  
        if (disableScroll) {  
          event.preventDefault(); // Prevent scroll when using touchpad or touch screen  
        }  
      }, { passive: false });  

      // Cleanup to remove event listeners to avoid memory leaks  
      return () => {  
        scrollableContainer.removeEventListener('wheel', handleScroll);  
        scrollableContainer.removeEventListener('touchmove', handleScroll);  
        scrollableContainer.removeEventListener('scroll', (event) => {  
          if (disableScroll) {  
            event.preventDefault();  
          }  
        });  
      };  
    }  
  }, [disableScroll]);  

  return (  
    <div className="h-full flex flex-col">  
      <div dir="rtl" className="flex justify-between items-center py-[10px] pr-[10px] pl-[25px]">  
        <AnimatedSubscribeButton  
          subscribeStatus={false}  
          initialText={  
            <span className="group w-full h-full text-[12px] font-semibold flex justify-center items-center">  
              <FiPlus className="ml-[8px] text-[18px] transition-transform duration-300 group-hover:translate-x-1" />  
              إضافة  
            </span>  
          }  
          changeText={  
            <span className="group w-full h-full flex justify-center items-center">  
              <FiCheck className="text-[24px] text-green-500 group-hover:text-[30px]"/>  
            </span>  
          }  
        />  
        <span className="text-[16px] font-semibold">الصفوف و الشعب</span>  
      </div>  

      <div className="h-[3px] bg-[#BFBFBF]" />  

      <div  
        ref={scrollableContainerRef} // Attach ref to the container  
        className="flex-grow flex flex-col gap-[5px] p-[10px] overflow-y-auto"  
        >
        { (clicked && postion.pos1===-1 && postion.pos2===-1 ) &&  <EditableForm/> }   
        {data.map((item) => (  
          <Accordion key={item.id} pos1={item.id} level={item.level} sections={item.sections} setDisableScroll={setDisableScroll} />  
        ))}
      </div>  
    </div>  
  );  
}