import DashboardLayout from '@/components/dashboard/layout';

export default function EnseignantLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout userRole="enseignant">
      {children}
    </DashboardLayout>
  );
}
