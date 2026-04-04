import { useEffect, useState } from "react";
import ActivityList from "../components/ActivityList";

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Activités</h1>
      <ActivityList activities={activities} handleEdit={() => {}} handleDelete={() => {}} />
    </div>
  );
}

export default Activities;