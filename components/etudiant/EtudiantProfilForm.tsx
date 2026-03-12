import React, { useState } from "react";

type StudentProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  profile: StudentProfile;
  onSave: (data: StudentProfile) => void;
};

const EtudiantProfileForm: React.FC<Props> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Prénom" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nom" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" />
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default EtudiantProfileForm;