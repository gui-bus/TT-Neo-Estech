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

const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <main className={cn("p-5", className)} id={id}>
      {children}
    </main>
  );
};

export default Container;
