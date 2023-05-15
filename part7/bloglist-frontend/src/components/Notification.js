import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

export default function Notification() {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return <Alert variant={notification.class}>{notification.message}</Alert>;
}

Notification.propTypes = {
  notification: PropTypes.object,
};
