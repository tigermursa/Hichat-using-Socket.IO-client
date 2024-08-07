import { useEffect, useState } from "react";
import MentorCard from "../../Components/ui/Mentors/MentorCard";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // Fetch user data from API
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allUsers");
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {mentors.map((mentor) => (
          <MentorCard
            key={mentor.userId}
            mentor={{
              id: mentor.userId,
              name: mentor.user.fullName,
              img: "https://blog.kingland.com/hubfs/leadership-2022/Leadership_Matt-Good.jpg",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Mentors;
