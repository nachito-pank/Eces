import React from "react";

type ScheduleItem = {
  course: string;
  teacher: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
};

type Props = {
  schedule: ScheduleItem[];
};

const EtudiantSchedule: React.FC<Props> = ({ schedule }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Cours</th>
          <th>Professeur</th>
          <th>Jour</th>
          <th>Heure</th>
          <th>Salle</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item, idx) => (
          <tr key={idx}>
            <td>{item.course}</td>
            <td>{item.teacher}</td>
            <td>{item.day}</td>
            <td>{item.startTime} - {item.endTime}</td>
            <td>{item.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EtudiantSchedule;