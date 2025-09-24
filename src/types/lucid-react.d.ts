declare module "lucide-react" {
  import * as React from "react";

  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export const Home: React.FC<IconProps>;
  export const FileText: React.FC<IconProps>;
  export const Briefcase: React.FC<IconProps>;
  export const User: React.FC<IconProps>;
  export const Settings: React.FC<IconProps>;
}
