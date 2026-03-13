import React from "react";


const EtudiantMoyenne = (props:number) => {
  return (
    <div className="student-average">
      <h3>Moyenne générale</h3>
      <p>{props.toFixed(2)}</p>
    </div>
  );
};

export default EtudiantMoyenne;