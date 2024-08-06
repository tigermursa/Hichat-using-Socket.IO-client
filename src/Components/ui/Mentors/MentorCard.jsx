import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MentorCard = ({ mentor }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white text-center">
      <img
        className="w-24 h-24 rounded-full mx-auto"
        src={mentor.img}
        alt={mentor.name}
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{mentor.name}</h3>
        <p className="text-gray-600">DENMARK</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            APPOINTMENT
          </button>
          <Link
            to={`/conversation/${mentor.id}`}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded"
          >
            MESSAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

MentorCard.propTypes = {
  mentor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default MentorCard;
