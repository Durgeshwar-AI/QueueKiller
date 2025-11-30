import { Building2, Hospital } from "lucide-react";
import React from "react";

interface CardProps {
  company: string;
  department: string;
  description: string;
  type: "company" | "hospital";
}


const Cards = ({ company, department, description, type }: CardProps) => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 border rounded-xl shadow-md hover:shadow-lg hover:scale-105 duration-150">
      {type === "company" ? <Building2 /> : <Hospital />}
      <h2 className="font-semibold text-xl">{department}</h2>
      <h3 className="text-gray-700">{company}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Cards;
