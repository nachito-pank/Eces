import { Note } from "../../../types/etudiant";

type Props = {
  notes: Note[];
};

const EtudiantNotesTable = ({ notes }: Props) => {
  const total = notes.reduce((acc, n) => acc + n.devoir * n.devoir, 0);
  const totalCoeff = notes.reduce((acc, n) => acc + n.devoir, 0);
  const average = (total / totalCoeff).toFixed(2);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Matière</th>
            <th>Note</th>
            <th>Coefficient</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, idx) => (
            <tr key={idx}>
              <td>{note.matiere}</td>
              <td>{note.devoir}</td>
              <td>{note.session}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Moyenne générale : {average}</p>
    </div>
  );
};

export default EtudiantNotesTable;