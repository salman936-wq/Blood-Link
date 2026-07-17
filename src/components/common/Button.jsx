const variants = {
  primary: "bg-primary hover:bg-red-700 text-white border-none shadow-md",
  secondary: "btn-outline border-gray-300 hover:border-primary hover:bg-transparent hover:text-primary text-gray-700",
  ghost: "btn-ghost text-gray-700 hover:bg-gray-50",
};

export default function Button({ children, variant = "primary", icon: Icon, className = "", ...props }) {
  return (
    <button className={`btn rounded-xl gap-2 ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}
