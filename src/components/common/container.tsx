//#region Imports
import { cn } from "@/src/lib/utils/utils";
import type { ReactNode } from "react";
//#endregion

//#region Interfaces
interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}
//#endregion

/**
 * Container component
 * @param {ContainerProps} props - Container props
 * @returns {JSX.Element} - JSX element
 * @description Container component, used to display a main tag with a default padding of 5px
 */
const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <main className={cn("p-5", className)} id={id}>
      {children}
    </main>
  );
};

export default Container;
