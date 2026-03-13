import React from "react";

type SessionLocation = {
  sessionName: string;
  date: string;
  room: string;
  building: string;
};

type Props = {
  location: SessionLocation;
};

const SessionLocationCard: React.FC<Props> = ({ location }) => {
  return (
    <div className="session-card">
      <h3>{location.sessionName}</h3>
      <p>Date : {location.date}</p>
      <p>Salle : {location.room} - {location.building}</p>
    </div>
  );
};

export default SessionLocationCard;