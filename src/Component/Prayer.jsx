import PropTypes from "prop-types";

function Prayer({ name, time }) {
  return (
    <div className="prayer">
      <p className="name_prayer">{name}</p>
      <p className="time_prayer">{time}</p>
    </div>
  );
}

Prayer.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Prayer;
