import React from "react";
import { Etudiant } from "../../../types/etudiant";

const EtudiantCard= (props:Etudiant) => {
  return (
    <div className="student-card">
      {/* <img src={props.photo} alt="Avatar" className="avatar" /> */}
      <h2>{props.nom} {props.prenom}</h2>
      <p>{props.niveau} - {props.filiere}</p>
    </div>
  );
};

export default EtudiantCard;