import MentorCard from "../../Components/ui/Mentors/MentorCard";
import { mentorsData } from "../../Database/mentorsData";

const Mentors = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {mentorsData.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default Mentors;
