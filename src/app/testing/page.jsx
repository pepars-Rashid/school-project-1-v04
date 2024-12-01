import { Cardlayout, Gridlayout } from "@/components/testing/gridlayout";
import { FiArrowRight } from 'react-icons/fi';

export default function page() {
  return (
    <div className="">
      <Gridlayout>
        <Cardlayout
          className={ "col-span-4 lg:col-span-3 bg-green-200"}
        >
          1
        </Cardlayout>
        
        <Cardlayout
          className={ "col-span-4 lg:col-span-1 bg-green-400"}
        >
          2
        </Cardlayout>

        <Cardlayout
          className={"col-span-4 lg:col-span-4 h-[349px] bg-green-600"}
        >
          3
        </Cardlayout>
      </Gridlayout>
    </div>
  );
};
