//#region Imports

import Image from "next/image";

//#endregion

//#region Interfaces
interface PageTitleProps {
  iconSrc: string;
  title: string;
  description: string;
}
//#endregion

/**
 * PageTitle component
 * @param {PageTitleProps} props - PageTitle props
 * @returns {JSX.Element} - JSX element
 * @description PageTitle component, used to display a title and description with an icon
 */
const PageTitle = ({ description, iconSrc, title }: PageTitleProps) => {
  return (
    <div className="flex items-center gap-3">
      {/* ICON */}
      <Image src={iconSrc} alt={`Ícone de ${title}`} width={50} height={50} />

      {/* TITLE - DESCRIPTION */}
      <div>
        {/* TITLE */}
        <h1 className="text-xl uppercase font-semibold">{title}</h1>

        {/* DESCRIPTION */}
        <p className="text-sm font-light">{description}</p>
      </div>
    </div>
  );
};

export default PageTitle;
