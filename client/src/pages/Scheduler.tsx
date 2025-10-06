import { useEffect, useState } from "react";
import CreateSchedule from "../components/company/CreateSchedule";
import EditSchedule from "../components/company/EditSchedule";
import axios from "axios";

const Scheduler = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (date: string) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/schedule/", {
        params: {
          date,
        },
      });
      console.log(res);
      if (res.status == 204) {
        setSchedules([]);
      } else setSchedules(res.data.schedule);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch schedules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getISODate = (d = new Date()) => d.toISOString().split("T")[0];
    fetchData(getISODate());
  }, []);

  return (
    <div>
      <CreateSchedule onCreated={() => fetchData(new Date().toISOString())} />
      <EditSchedule
        schedules={schedules}
        refresh={fetchData}
        loading={loading}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default Scheduler;
