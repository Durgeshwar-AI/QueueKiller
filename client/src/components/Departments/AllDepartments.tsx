import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";


interface departmentProps {
  companyId: string;
  companyName: string;
  department: {
    _id: string;
    name: string;
    type: string;
  }
}

const URL = process.env.API_URL;

const AllDepartments = () => {
  const [departments, setDepartments] = useState<departmentProps[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      console.log(URL);
      try {
        const result = await axios.get(`${URL}/api/departments/all`);
        console.log(result.data.departments)
        setDepartments(result.data.departments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-8 max-w-[1200px] mx-auto mb-16">
      {departments && departments.map((dept) => (
        <Cards
          key={dept.department._id}
          id={dept.department._id}
          company={dept.companyName}
          department={dept.department.name}
          description={dept.department.name}
          type={dept.department.type}
        />
      ))}
    </div>
  );
};

export default AllDepartments;
