import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

interface departmentProps {
  id: number;
  name: string;
  type: string;
  companyId: number;
  company: {
    name: string;
    logo: string | null;
  };
  createdAt: string;
}

const URL = process.env.API_URL;

const AllDepartments = () => {
  const [departments, setDepartments] = useState<departmentProps[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      console.log(URL);
      try {
        const result = await axios.get(`${URL}/api/user/schedules`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(result.data.departments);
        setDepartments(result.data.departments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-8 max-w-[1200px] mx-auto mb-16">
      {departments &&
        departments.map((dept) => (
          <Cards
            key={dept.id}
            id={dept.id}
            company={dept.company.name}
            department={dept.name}
            description={dept.name}
            type={dept.type}
          />
        ))}
    </div>
  );
};

export default AllDepartments;
