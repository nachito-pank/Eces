import React from "react";

type Payment = {
  date: string;
  amount: number;
  status: string;
};

type Props = {
  payments: Payment[];
};

const EtudiantPayments: React.FC<Props> = ({ payments }) => {
  return (
    <div>
      <h3>Historique des paiements</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Montant</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, idx) => (
            <tr key={idx}>
              <td>{p.date}</td>
              <td>{p.amount} FCFA</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EtudiantPayments;