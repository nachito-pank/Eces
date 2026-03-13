import DashboardLayout from '@/components/dashboard/layout';

export default function SousAdminLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <DashboardLayout userRole="sous-admin">
      {children}
    </DashboardLayout>
  );
}
=======
    <div>
      <Sidebar role="sous-admin"/>
      <div>
        <Navbar showLogo={false} />
        <main className="container mx-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
>>>>>>> 6cb6547d86e3aad1dad1538c9d71323b2c702832
