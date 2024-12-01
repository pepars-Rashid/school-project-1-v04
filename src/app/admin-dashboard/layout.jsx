import { Cardlayout, Gridlayout } from "@/components/testing/gridlayout";
import Xsidebar from "@/components/testing/XadminNav";

export default function AdminLayout({
  children,
  classifications,
  notifications,
  statistics,
}) {

  return(
    <div className="flex gap-[25px] h-full">
      <div className="flex-grow lg:pl-[25px] pt-[100px]">
        <Gridlayout className={''}>
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
      <Xsidebar/>
    </div>
  );
}