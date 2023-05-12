import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function Notification() {
  const notification = useSelector(({ notification }) => notification);

  if (notification === null) {
    return null;
  }

  return <div className={notification.class}>{notification.message}</div>;
}

Notification.propTypes = {
  notification: PropTypes.object,
};
