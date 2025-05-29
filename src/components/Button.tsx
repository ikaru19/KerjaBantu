import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white shadow-sm hover:shadow-md hover:translate-y-[-2px]",
    secondary: "bg-accent text-white shadow-sm hover:shadow-md hover:translate-y-[-2px]",
    outline: "bg-white text-gray-800 border border-gray-200 hover:border-primary hover:text-primary",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
    light: "bg-white text-primary hover:bg-gray-50"
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 