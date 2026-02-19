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
 * @param {PageTitleProps} props - PageTitle props
 * @returns {JSX.Element} - JSX element
 * @description PageTitle component, used to display a title and description with an icon
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
