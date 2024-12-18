import Accordion from "@/components/testing/Accordion";
import AccordionList from "@/components/testing/classification";
import { ClickProvider } from "@/components/testing/clickContex";
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
        <Gridlayout>
        <Cardlayout
            className={ "col-span-4 lg:col-span-3"}
          >
            1
          </Cardlayout>

          <Cardlayout
            className={ "z-40 col-span-4 lg:col-span-1"}
          >
            <ClickProvider>
              <AccordionList/>
            </ClickProvider>
          </Cardlayout>

          <Cardlayout
            className={"col-span-4 lg:col-span-4 h-[350px]"}
          >
            3
          </Cardlayout>
        </Gridlayout>
      </div>
      <Xsidebar/>
    </div>
  );
}