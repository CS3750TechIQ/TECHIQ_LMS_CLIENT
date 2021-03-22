import Nav from '../components/navBar';
import Notification from '../components/notificationCards';

export default function Notifications() {
  return (
    <notificationStyles>
      <Nav />
      <Notification />
      <Notification />
      <Notification />
    </notificationStyles>
  );
}
