import { useEffect, useState } from 'react';
import CreateSchedule from '../components/company/CreateSchedule'
import EditSchedule from '../components/company/EditSchedule'
import axios from 'axios';

const Scheduler = () => {
    const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/schedule/");
      setSchedules(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch schedules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <CreateSchedule onCreated={fetchData} />
      <EditSchedule
        schedules={schedules}
        refresh={fetchData}
        loading={loading}
        error={error}
        setError = {setError}
      />
    </div>
  )
}

export default Scheduler
