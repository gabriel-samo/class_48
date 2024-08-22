import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-gray-200 text-gray-700 dark:text-gray-200 dark:bg-gray-700 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
