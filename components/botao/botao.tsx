import { cn } from "@/lib/cn";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type BotaoProps = TouchableOpacityProps & {
  className?: string;
  children: React.ReactNode;
};

const Botao = ({ className, children, ...props }: BotaoProps) => {
  return (
    <TouchableOpacity
      className={cn("bg-[#ff0013] p-5 rounded-3xl min-w-60", className)}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
export default Botao;
