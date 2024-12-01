'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Xsidebar(){
  const [selected, setSelected] = useState("الرئيسية");

  const options = [
    { title: "الرئيسية", Icon: Icons.home, href: "/Admin-dashboard" },
    {
      title: "المستخدمين",
      Icon: Icons.users,
      notifs: 4,
      href: "#",
      dropdownItems: [
        { title: "الطلاب", Icon: Icons.student, notifs: 2, href: "/students"},
        { title: "المدرسين", Icon: Icons.teacher, notifs: 1, href: "/teachers"},
        { title: "الموظفين", Icon: Icons.staff, notifs: 1, href: "/staff"},
      ],
    },
    { title: "صندوق البريد", Icon: Icons.mailBox, notifs: 4, href: "/mailbox" },
    { title: "إدارة التطبيق", Icon: Icons.appManagement, href: "/app-management" },
    { title: "إعدادات", Icon: Icons.settings, href: "/settings" },
  ];

  return (
    <motion.nav
      layout
      className="sticky hidden lg:block top-0 w-[250px] h-screen shrink-0 border-l-[3px] border-slate-300 bg-white p-[25px]"
    >
      <TitleSection />
      <div className="flex flex-col gap-[10px]">
        {options.map((option) =>
          option.dropdownItems ? (
            <DropdownOption
              key={option.title}
              Icon={option.Icon}
              title={option.title}
              notifs={option.notifs}
              selected={selected}
              setSelected={setSelected}
              dropdownItems={option.dropdownItems}
            />
          ) : (
            <Option
              key={option.title}
              Icon={option.Icon}
              title={option.title}
              notifs={option.notifs}
              href={option.href}
              selected={selected}
              setSelected={setSelected}
            />
          )
        )}
      </div>
    </motion.nav>
  );
};

const Option = ({ Icon, title, href, selected, setSelected, notifs, isOpen }) => {
  const insideDropDown = ['الطلاب', 'المدرسين', 'الموظفين'];

  return (
    <Link href={href}>
      <motion.button
        dir="rtl"
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-[34px] w-[95%] items-center rounded-[5px] transition-colors ${selected === title || isOpen ? "bg-[#EFEDFB] text-[#7164FA]" : `${insideDropDown.includes(title) ? 'text-[#00000090]' : 'text-[#000000]'} hover:bg-slate-100`}`}
      >
        <motion.div layout className="grid h-full w-10 place-content-center">
          <Icon selected={selected}/>
        </motion.div>

        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="flex justify-between items-center w-full text-[12px] font-semibold"
        >
          {title}
          {title === "المستخدمين" && (
            <FiChevronDown className={`${isOpen && 'transform rotate-180 transition duration-500'} text-[24px] ml-[15px] transform transition duration-500`} />
          )}
        </motion.span>

        {notifs && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute top-1/4 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const DropdownOption = ({ Icon, title, notifs, selected, setSelected, dropdownItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Option
        Icon={Icon}
        title={title}
        href="#" // Placeholder URL for dropdown title
        selected={selected}
        notifs={notifs}
        isOpen={isOpen}
        setSelected={() => {
          setSelected(title);
          setIsOpen(!isOpen);
        }}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <div className="flex flex-col gap-[5px] ml-[20px]">
          {dropdownItems.map((item) => (
            <Option
              key={item.title}
              Icon={item.Icon}
              title={item.title}
              notifs={item.notifs}
              href={item.href}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      )}
    </>
  );
};

const TitleSection = () => {
  return (
    <>
      <div dir="rtl" className="relative flex items-center gap-2 rounded-md transition-colors hover:bg-slate-100 cursor-pointer mb-[25px] border-slate-300">
        <div className="z-10 size-[50px] bg-[#B1D4FE] border-[2px] border-[#7164FA] rounded-[15px]"></div>
        <div>
          <p className="text-[16px] font-semibold">طارق صابوني</p>
          <p className="text-[12px] text-[#00000071]">مشرف التطبيق</p>
        </div>
      </div>
      <div className="h-[2px] w-full bg-slate-300 mb-[25px]" />
    </>
  );
};

const Icons = {
  home: ({selected})=> (
    <svg width="14" height="14" viewBox="0 0 14 14" fill={`${selected==='الرئيسية'? '#7164FA':'#000000'}`} xmlns="http://www.w3.org/2000/svg">
        <path d="M13.2222 4.21171L8.55557 0.534113C8.12778 0.190156 7.57397 0 7.00002 0C6.42608 0 5.87227 0.190156 5.44448 0.534113L0.777846 4.21171C0.530801 4.41033 0.33366 4.65397 0.19955 4.92643C0.0654406 5.19888 -0.00256086 5.4939 7.37282e-05 5.79182V11.9025C7.37282e-05 12.4588 0.245905 12.9923 0.683486 13.3857C1.12107 13.779 1.71456 14 2.33339 14H11.6667C12.2855 14 12.879 13.779 13.3166 13.3857C13.7541 12.9923 14 12.4588 14 11.9025V5.78483C14.0015 5.48808 13.933 5.19441 13.7989 4.92324C13.6648 4.65206 13.4683 4.40955 13.2222 4.21171ZM8.55557 12.6017H5.44448V9.10586C5.44448 8.92043 5.52642 8.74259 5.67228 8.61147C5.81814 8.48036 6.01597 8.40669 6.22225 8.40669H7.7778C7.98407 8.40669 8.1819 8.48036 8.32776 8.61147C8.47362 8.74259 8.55557 8.92043 8.55557 9.10586V12.6017ZM12.4444 11.9025C12.4444 12.0879 12.3625 12.2658 12.2166 12.3969C12.0708 12.528 11.8729 12.6017 11.6667 12.6017H10.1111V9.10586C10.1111 8.54957 9.86528 8.01606 9.4277 7.62271C8.99012 7.22935 8.39663 7.00837 7.7778 7.00837H6.22225C5.60342 7.00837 5.00993 7.22935 4.57235 7.62271C4.13477 8.01606 3.88894 8.54957 3.88894 9.10586V12.6017H2.33339C2.12711 12.6017 1.92928 12.528 1.78342 12.3969C1.63756 12.2658 1.55562 12.0879 1.55562 11.9025V5.78483C1.55576 5.68556 1.57941 5.58745 1.62501 5.49704C1.67061 5.40663 1.7371 5.32598 1.82006 5.26046L6.48669 1.58985C6.62863 1.47776 6.8111 1.41594 7.00002 1.41594C7.18895 1.41594 7.37142 1.47776 7.51335 1.58985L12.18 5.26046C12.263 5.32598 12.3294 5.40663 12.375 5.49704C12.4206 5.58745 12.4443 5.68556 12.4444 5.78483V11.9025Z"/>
    </svg>

  ),
  users: ({selected})=> (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99984 6.83335C9.2885 6.83335 10.3332 5.90061 10.3332 4.75002C10.3332 3.59943 9.2885 2.66669 7.99984 2.66669C6.71117 2.66669 5.6665 3.59943 5.6665 4.75002C5.6665 5.90061 6.71117 6.83335 7.99984 6.83335Z" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.2667 11C11.2667 10.2265 10.9226 9.48463 10.3099 8.93765C9.69733 8.39066 8.86644 8.08337 8.00007 8.08337C7.13369 8.08337 6.3028 8.39066 5.69018 8.93765C5.07756 9.48463 4.7334 10.2265 4.7334 11H11.2667Z" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.7334 5.16667C12.1311 5.16667 12.5222 5.07589 12.8696 4.90296C13.217 4.73003 13.5091 4.48069 13.7182 4.17861C13.9273 3.87653 14.0465 3.53173 14.0643 3.17698C14.0822 2.82222 13.9982 2.46927 13.8204 2.15164C13.6425 1.83401 13.3766 1.56225 13.048 1.36217C12.7195 1.16208 12.339 1.04031 11.9429 1.00842C11.5468 0.976527 11.1481 1.03557 10.7847 1.17995C10.4214 1.32433 10.1053 1.54924 9.8667 1.83333" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.2001 9.33329H15.0001C15.0001 8.55974 14.6559 7.81788 14.0433 7.2709C13.4307 6.72392 12.5998 6.41663 11.7334 6.41663" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.13335 1.83333C5.89471 1.54924 5.5787 1.32433 5.21532 1.17995C4.85194 1.03557 4.45326 0.976527 4.05714 1.00842C3.66101 1.04031 3.28059 1.16208 2.952 1.36217C2.62341 1.56225 2.35756 1.83401 2.17969 2.15164C2.00182 2.46927 1.91783 2.82222 1.93571 3.17698C1.95359 3.53173 2.07273 3.87653 2.28183 4.17861C2.49093 4.48069 2.78304 4.73003 3.13043 4.90296C3.47782 5.07589 3.86895 5.16667 4.26668 5.16667" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.26667 6.41663C3.40029 6.41663 2.5694 6.72392 1.95678 7.2709C1.34417 7.81788 1 8.55974 1 9.33329H3.8" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  ),
  mailBox: ({selected})=> (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4615 3.33334C13.3187 3.33334 13.1818 3.39188 13.0808 3.49606C12.9798 3.60025 12.9231 3.74156 12.9231 3.8889V8.33334C12.9231 8.48069 12.8663 8.62199 12.7654 8.72618C12.6644 8.83037 12.5274 8.8889 12.3846 8.8889H1.61538C1.47258 8.8889 1.33562 8.83037 1.23463 8.72618C1.13365 8.62199 1.07692 8.48069 1.07692 8.33334V3.8889C1.07692 3.74156 1.02019 3.60025 0.919211 3.49606C0.81823 3.39188 0.68127 3.33334 0.538462 3.33334C0.395653 3.33334 0.258693 3.39188 0.157712 3.49606C0.0567306 3.60025 0 3.74156 0 3.8889V8.33334C0.000377035 8.77522 0.170816 9.19886 0.473846 9.51112C0.776499 9.82377 1.1871 9.99962 1.61538 10H12.3846C12.8129 9.99962 13.2235 9.82377 13.5262 9.51112C13.8292 9.19886 13.9996 8.77522 14 8.33334V3.8889C14 3.74156 13.9433 3.60025 13.8423 3.49606C13.7413 3.39188 13.6043 3.33334 13.4615 3.33334Z" fill={`${selected==='#'? '#7164FA':'#000000'}`}/>
      <path d="M6.67677 6.55555C6.76997 6.62768 6.88334 6.66667 6.99984 6.66667C7.11635 6.66667 7.22972 6.62768 7.32292 6.55555L13.6822 1.63333C13.7814 1.55615 13.8516 1.44594 13.8811 1.3214C13.9105 1.19686 13.8973 1.06564 13.8437 0.95C13.7635 0.779067 13.6561 0.623206 13.526 0.488889C13.2233 0.176239 12.8127 0.000389005 12.3845 0H1.61523C1.18695 0.000389005 0.776342 0.176239 0.47369 0.488889C0.343573 0.623206 0.236189 0.779067 0.155997 0.95C0.102375 1.06564 0.0891655 1.19686 0.118607 1.3214C0.148049 1.44594 0.21833 1.55615 0.317536 1.63333L6.67677 6.55555ZM1.61523 1.11111H12.3845C12.4344 1.103 12.4853 1.103 12.5352 1.11111L6.99984 5.41667L1.46446 1.11111C1.51441 1.103 1.56528 1.103 1.61523 1.11111Z" fill={`${selected==='#'? '#7164FA':'#000000'}`}/>
    </svg>

  ),
  appManagement: ({selected})=> (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.87817 3.32982V1" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.87842 15V7.08527" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.87822 7.0852C3.91553 7.0852 4.75643 6.24452 4.75643 5.20749C4.75643 4.17045 3.91553 3.32977 2.87822 3.32977C1.84091 3.32977 1 4.17045 1 5.20749C1 6.24452 1.84091 7.0852 2.87822 7.0852Z" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="bevel"/>
      <path d="M8.00026 8.64752L8.00024 1" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.00024 15V12.403" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.00005 12.403C9.03736 12.403 9.87826 11.5623 9.87826 10.5252C9.87826 9.48821 9.03736 8.64752 8.00005 8.64752C6.96274 8.64752 6.12183 9.48821 6.12183 10.5252C6.12183 11.5623 6.96274 12.403 8.00005 12.403Z" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="bevel"/>
      <path d="M13.1218 4.9787V1" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.1216 15V8.73413" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.1219 8.73413C14.1592 8.73413 15.0001 7.89345 15.0001 6.85642C15.0001 5.81938 14.1592 4.9787 13.1219 4.9787C12.0846 4.9787 11.2437 5.81938 11.2437 6.85642C11.2437 7.89345 12.0846 8.73413 13.1219 8.73413Z" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-linecap="round" stroke-linejoin="bevel"/>
    </svg>

  ),
  settings: ({selected})=> (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.00007 10.8076C9.2859 10.8076 10.3283 9.77439 10.3283 8.49989C10.3283 7.22539 9.2859 6.1922 8.00007 6.1922C6.71424 6.1922 5.67188 7.22539 5.67188 8.49989C5.67188 9.77439 6.71424 10.8076 8.00007 10.8076Z" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.8436 5.24962L14.2616 4.25038C13.9403 3.69827 13.2284 3.50962 12.6714 3.82808L12.3652 4.00346C11.2011 4.66923 9.74602 3.83673 9.74602 2.50462V2.15385C9.74602 1.51635 9.22508 1 8.58192 1H7.41782C6.77466 1 6.25372 1.51635 6.25372 2.15385V2.50462C6.25372 3.83673 4.7986 4.66981 3.6345 4.00346L3.32835 3.82808C2.77133 3.50962 2.05948 3.69827 1.73819 4.25038L1.15614 5.24962C0.834849 5.80173 1.02518 6.50731 1.5822 6.82577L1.88836 7.00115C3.05246 7.6675 3.05246 9.3325 1.88836 9.99885L1.5822 10.1742C1.02518 10.4927 0.834849 11.1983 1.15614 11.7504L1.73819 12.7496C2.05948 13.3017 2.77133 13.4904 3.32835 13.1719L3.6345 12.9965C4.7986 12.3302 6.25372 13.1633 6.25372 14.4954V14.8462C6.25372 15.4837 6.77466 16 7.41782 16H8.58192C9.22508 16 9.74602 15.4837 9.74602 14.8462V14.4954C9.74602 13.1633 11.2011 12.3302 12.3652 12.9965L12.6714 13.1719C13.2284 13.4904 13.9403 13.3017 14.2616 12.7496L14.8436 11.7504C15.1649 11.1983 14.9746 10.4927 14.4175 10.1742L14.1114 9.99885C12.9473 9.3325 12.9473 7.6675 14.1114 7.00115L14.4175 6.82577C14.9746 6.50731 15.1655 5.80173 14.8436 5.24962Z" stroke={`${selected==='#'? '#7164FA':'#000000'}`} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  ),
  student: ({selected})=> (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4088 3.3459L7.89764 0.281154C7.63455 0.0981279 7.32154 0 7.00082 0C6.6801 0 6.36709 0.0981279 6.104 0.281154L0.592797 3.3459C0.409652 3.47796 0.260529 3.65151 0.157687 3.85228C0.0548456 4.05306 0.0012207 4.27532 0.0012207 4.5008C0.0012207 4.72628 0.0548456 4.94854 0.157687 5.14931C0.260529 5.35009 0.409652 5.52364 0.592797 5.6557L0.647909 5.6907L2.47663 6.72061V11.5002C2.47663 12.2851 3.60893 14 6.98579 14C10.3627 14 11.495 12.2851 11.495 11.5002V6.72061L12.998 5.88568V11.5002C12.998 11.6328 13.0508 11.76 13.1448 11.8537C13.2387 11.9475 13.3661 12.0002 13.499 12.0002C13.6319 12.0002 13.7593 11.9475 13.8533 11.8537C13.9473 11.76 14 11.6328 14 11.5002V4.5008C13.9993 4.2755 13.9454 4.05354 13.8427 3.8529C13.7399 3.65225 13.5913 3.47857 13.4088 3.3459ZM10.4929 11.5002C10.4929 11.6952 9.78648 13.0001 6.98579 13.0001C4.1851 13.0001 3.47866 11.6952 3.47866 11.5002V7.27557L6.08396 8.72044C6.34913 8.90298 6.66365 9.00073 6.98579 9.00073C7.30793 9.00073 7.62245 8.90298 7.88762 8.72044L10.4929 7.27557V11.5002ZM12.8327 4.83577L7.32147 7.89551C7.22485 7.96397 7.10929 8.00075 6.9908 8.00075C6.8723 8.00075 6.75674 7.96397 6.66013 7.89551L1.14893 4.83577C1.09791 4.79603 1.05665 4.7452 1.02826 4.68716C0.99988 4.62912 0.985129 4.56538 0.985129 4.5008C0.985129 4.43621 0.99988 4.37248 1.02826 4.31444C1.05665 4.25639 1.09791 4.20557 1.14893 4.16583C1.14893 4.16583 6.66013 1.12108 6.66013 1.10608C6.75856 1.03747 6.87574 1.00068 6.99581 1.00068C7.11588 1.00068 7.23306 1.03747 7.33149 1.10608L12.8427 4.16583C12.8937 4.20557 12.935 4.25639 12.9634 4.31444C12.9917 4.37248 13.0065 4.43621 13.0065 4.5008C13.0065 4.56538 12.9917 4.62912 12.9634 4.68716C12.935 4.7452 12.8937 4.79603 12.8427 4.83577H12.8327Z" fill={`${selected==='#'? '#7164FA':'#808080'}`}/>
    </svg>
  ),
  teacher: ({selected})=>(
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.24984 10.6C7.5385 10.6 8.58317 9.52544 8.58317 8.19996C8.58317 6.87447 7.5385 5.79996 6.24984 5.79996C4.96117 5.79996 3.9165 6.87447 3.9165 8.19996C3.9165 9.52544 4.96117 10.6 6.24984 10.6Z" stroke={`${selected==='#'? '#7164FA':'#808080'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.56042 13C2.89152 12.2818 3.41399 11.6749 4.06711 11.25C4.72023 10.825 5.47718 10.5994 6.25 10.5994C7.02282 10.5994 7.77977 10.825 8.43289 11.25C9.08601 11.6749 9.60848 12.2818 9.93958 13H14.4167C14.5714 13 14.7197 12.9368 14.8291 12.8243C14.9385 12.7117 15 12.5591 15 12.4V1.6C15 1.44087 14.9385 1.28826 14.8291 1.17574C14.7197 1.06321 14.5714 1 14.4167 1H1.58333C1.42862 1 1.28025 1.06321 1.17085 1.17574C1.06146 1.28826 1 1.44087 1 1.6V12.4C1 12.5591 1.06146 12.7117 1.17085 12.8243C1.28025 12.9368 1.42862 13 1.58333 13H2.56042Z" stroke={`${selected==='#'? '#7164FA':'#808080'}`} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.5002 10.6001H12.6668V3.40005H3.3335V4.60005" stroke={`${selected==='#'? '#7164FA':'#808080'}`} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  ),
  staff: ({selected})=>(
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 17.3246V13.0649C14 11.6234 13.1548 10.2886 11.7502 9.38915C12.3814 8.42657 12.751 7.2652 12.751 6.01531C12.751 2.69857 10.1521 0 6.95782 0C3.76498 0 1.16742 2.69857 1.16742 6.01531C1.16742 7.28126 1.54768 8.45513 2.19344 9.42556C0.824139 10.325 0 11.6466 0 13.0649V17.325H1.17537V13.0649C1.17537 12.0249 1.84705 11.0349 2.96089 10.3567C3.71796 11.1094 4.66828 11.6512 5.72853 11.8911L4.52412 17.9549L7.00034 20L9.47657 17.9549L8.25073 11.8736C9.29992 11.6241 10.2412 11.0802 10.9879 10.3275C12.1332 11.0056 12.8246 12.006 12.8246 13.0649V17.325L14 17.3246ZM7.00034 18.4464L5.82014 17.472L6.81056 12.485H7.17319L8.17882 17.4727L7.00034 18.4464ZM6.95782 10.8168C4.41316 10.8168 2.34244 8.66285 2.34244 6.01531C2.34244 3.36706 4.41281 1.21384 6.95782 1.21384C9.50388 1.21384 11.5753 3.36706 11.5753 6.01531C11.5753 8.66285 9.50388 10.8168 6.95782 10.8168Z" fill={`${selected==='#'? '#7164FA':'#808080'}`}/>
    </svg>
  ),
}