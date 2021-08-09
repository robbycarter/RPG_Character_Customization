import React, { FC } from "react";

import { Props } from "./props";

export const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <div className="min-h-screen font-Oldenburg bg-lightTheme dark:bg-darkTheme transition-colors">
      {children}
    </div>
  );
};