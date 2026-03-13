import DashboardLayout from '@/components/dashboard/layout';

export default function EtudiantLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout userRole="etudiant">
      {children}
    </DashboardLayout>
  );
}
