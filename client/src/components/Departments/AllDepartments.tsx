import React from 'react'
import Cards from './Cards';

type DeptType = "company" | "hospital";

interface Department {
  company: string;
  department: string;
  description: string;
  type: DeptType;
}


const departmentsData: Department[] = [
  {
    company: "TechCorp",
    department: "Engineering",
    description: "Handles all engineering tasks and product development.",
    type: "company"
  },
    {
      company: "HealthPlus",
      department: "Emergency",
      description: "Provides emergency medical services.",
      type: "hospital"
    },
    {
      company: "FinServe",
      department: "Customer Support",
      description: "Handles customer inquiries and support services.",
      type: "company"
    },
    {
      company: "MediCare",
      department: "Pediatrics",
      description: "Provides pediatric medical services.",
      type: "hospital"
    },
    {
        company: "RetailHub",
        department: "Sales",
        description: "Manages retail sales and customer relations.",
        type: "company"
    }
];

const AllDepartments = () => {
  return (
    <div className='grid grid-cols-3 gap-6 p-8 max-w-[1200px] mx-auto mb-16'>
      {departmentsData.map((dept, index) => (
        <Cards
          key={index}
          company={dept.company}
          department={dept.department}
          description={dept.description}
          type={dept.type}
        />
      ))}
    </div>
  )
}

export default AllDepartments
