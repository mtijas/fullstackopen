import PropTypes from "prop-types";

export default function Notification({ notification }) {
  if (notification === null) {
    return null;
  }

  return <div className={notification.class}>{notification.message}</div>;
}

Notification.propTypes = {
  notification: PropTypes.object,
};
