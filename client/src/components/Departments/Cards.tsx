import { Building2, Hospital } from "lucide-react";
import { Link } from "react-router-dom";

export interface CardProps {
  id: number;
  company: string;
  department: string;
  description: string;
  type: "company" | "hospital";
}


const Cards = ({ company, department, description, type, id }: CardProps) => {
  return (
    <div className="w-full flex flex-col justify-between gap-4 p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 bg-white">
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
          {type === "company" ? (
            <Building2 className="w-6 h-6 text-blue-600" />
          ) : (
            <Hospital className="w-6 h-6 text-blue-600" />
          )}
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold text-xl text-gray-900">{department}</h2>
          <h3 className="text-sm font-medium text-gray-500">{company}</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      <Link to={`/book/${id}`}>
        <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Apply Now
        </button>
      </Link>
    </div>
  );
};

export default Cards;
