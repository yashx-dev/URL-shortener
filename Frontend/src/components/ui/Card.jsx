const Card = ({ children, className = "", padding = "normal" }) => {
  const paddings = {
    none: "",
    small: "p-4",
    normal: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`
      bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 
      shadow-sm hover:shadow-md transition-shadow duration-200
      ${paddings[padding]} ${className}
    `}
    >
      {children}
    </div>
  );
};

export default Card;
