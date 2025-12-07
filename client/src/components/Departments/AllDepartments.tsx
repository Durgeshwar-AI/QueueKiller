import Cards, { type CardProps } from "./Cards";

const departmentsData: CardProps[] = [
  {
    id: 1,
    company: "TechCorp",
    department: "Engineering",
    description: "Handles all engineering tasks and product development.",
    type: "company",
  },
  {
    id: 2,
    company: "HealthPlus",
    department: "Emergency",
    description: "Provides emergency medical services.",
    type: "hospital",
  },
  {
    id: 3,
    company: "FinServe",
    department: "Customer Support",
    description: "Handles customer inquiries and support services.",
    type: "company",
  },
  {
    id:4,
    company: "MediCare",
    department: "Pediatrics",
    description: "Provides pediatric medical services.",
    type: "hospital",
  },
  {
    id:5,
    company: "RetailHub",
    department: "Sales",
    description: "Manages retail sales and customer relations.",
    type: "company",
  },
];

const AllDepartments = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-8 max-w-[1200px] mx-auto mb-16">
      {departmentsData.map((dept) => (
        <Cards
          key={dept.id}
          id={dept.id}
          company={dept.company}
          department={dept.department}
          description={dept.description}
          type={dept.type}
        />
      ))}
    </div>
  );
};

export default AllDepartments;
