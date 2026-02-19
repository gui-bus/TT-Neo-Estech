//#region Imports
import { Skeleton } from "antd";
import Image from "next/image";
//#endregion

//#region Interfaces
interface PageTitleProps {
  iconSrc: string;
  title: string;
  description: string;
  isLoading: boolean;
}
//#endregion

/**
 * PageTitle component
 * @param {PageTitleProps} props - The props object passed to the component
 * @param {string} props.iconSrc - The source of the icon to be displayed
 * @param {string} props.title - The title of the page
 * @param {string} props.description - The description of the page
 * @param {boolean} props.isLoading - A boolean indicating whether the page is loading or not
 * @returns {JSX.Element} - The PageTitle component
 * @description This component renders a page title with an icon, title, and description.
 * It also provides a skeleton loader when the page is loading.
 */
const PageTitle = ({
  description,
  iconSrc,
  title,
  isLoading,
}: PageTitleProps) => {
  return (
    <div className="flex items-center gap-3">
      {/* ICON */}
      {isLoading ? (
        <Skeleton.Avatar size={"large"} />
      ) : (
        <Image src={iconSrc} alt={`Ícone de ${title}`} width={50} height={50} />
      )}

      {/* TITLE - DESCRIPTION */}
      <div className="flex flex-col gap-1">
        {/* TITLE */}
        {isLoading ? (
          <Skeleton.Button
            block
            active
            style={{ height: 32 }}
            className="w-44!"
          />
        ) : (
          <h1 className="text-2xl font-semibold">{title}</h1>
        )}

        {/* DESCRIPTION */}
        {isLoading ? (
          <Skeleton.Button
            block
            active
            style={{ height: 24 }}
            className="w-96!"
          />
        ) : (
          <p className="text-sm">{description}</p>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
