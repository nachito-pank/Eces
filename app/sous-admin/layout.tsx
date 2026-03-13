import DashboardLayout from '@/components/dashboard/layout';

export default function SousAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout userRole="sous-admin">
      {children}
    </DashboardLayout>
  );
}
