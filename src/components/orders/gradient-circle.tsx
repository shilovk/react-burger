import React from "react";
import placeholderImage from "../../images/ingredient.png";

interface GradientCircleProps {
  imageUrl?: string;
  text?: string;
}

const GradientCircle: React.FC<GradientCircleProps> = ({ imageUrl, text }) => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
      <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-[#801AB3] to-[#4C4CFF]">
        <div className="w-full h-full rounded-full bg-grayBackground flex items-center justify-center relative">
          <img
            src={text ? placeholderImage : imageUrl || ""}
            alt="Ingredient"
            className={`w-full h-full object-cover rounded-full ${text ? "opacity-50" : "opacity-100"}`}
          />

          {text && (
            <span className="absolute inset-0 flex items-center justify-center text_type_main-default">{text}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradientCircle;
