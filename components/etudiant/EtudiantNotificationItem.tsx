import React from "react";

type Notification = {
  title: string;
  message: string;
  date: string;
  type: "info" | "urgent" | "reminder";
};

type Props = {
  notification: Notification;
};

const EtudiantNotificationItem: React.FC<Props> = ({ notification }) => {
  return (
    <div className={`notification ${notification.type}`}>
      <h4>{notification.title}</h4>
      <p>{notification.message}</p>
      <small>{notification.date}</small>
    </div>
  );
};

export default EtudiantNotificationItem;