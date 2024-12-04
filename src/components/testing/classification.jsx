import Accordion from "./Accordion";

export default function AccordionList(){

  const data = [
    {id:100, level: 'الصف الأول', sections: ['الشعبة الأولى', 'الشعبة الثانية']},
    { id: 1, level: 'الصف الثاني', sections: []},
    { id: 2, level: 'الصف 2', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },
    { id: 3, level: 'الصف 3', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },
    { id: 4, level: 'الصف 4', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },
    { id: 5, level: 'الصف 5', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },
    { id: 6, level: 'الصف 6', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },
    { id: 7, level: 'الصف 7', sections: ['الشعبة الأولى', 'الشعبة الثانية'] },
  ];

  return (
    <div className="h-full flex flex-col">
      
      <div className="p-[10px]">sssssssssssss</div>

      <div className="h-[3px] bg-[#BFBFBF]" />
      
      <div className="flex-grow overflow-y-auto flex flex-col gap-[5px] p-[10px]">
        {data.map((item) => (
          <Accordion key={item.id} id={item.id} level={item.level} sections={item.sections}/>
        ))}
      </div>
    </div>
  );
};
