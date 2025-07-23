import { AdminLayout } from "@/components/admin/AdminLayout";
import useAdminAuth from "@/hooks/use-admin-auth";
import { StatsCard } from "@/components/admin/StatsCard";
import { DataTable } from "@/components/admin/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Plus,
  Calendar,
  LogOut
} from "lucide-react";

// Mock data
const recentCourses = [
  { id: 1, title: "React Avanzado", students: 245, status: "published", created: "2024-01-15" },
  { id: 2, title: "Node.js Básico", students: 189, status: "draft", created: "2024-01-10" },
  { id: 3, title: "Python para Datos", students: 312, status: "published", created: "2024-01-08" },
];

const recentSubscribers = [
  { id: 1, name: "Carlos Mendoza", email: "carlos@email.com", plan: "Premium", date: "2024-01-20" },
  { id: 2, name: "Ana López", email: "ana@email.com", plan: "Basic", date: "2024-01-19" },
  { id: 3, name: "Luis García", email: "luis@email.com", plan: "Premium", date: "2024-01-18" },
];

const courseColumns = [
  { key: "title", label: "Curso" },
  { key: "students", label: "Estudiantes" },
  { key: "status", label: "Estado", type: "badge" as const },
  { key: "created", label: "Creado", type: "date" as const },
  { key: "actions", label: "Acciones", type: "actions" as const },
];

const subscriberColumns = [
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
  { key: "plan", label: "Plan", type: "badge" as const },
  { key: "date", label: "Fecha", type: "date" as const },
  { key: "actions", label: "Acciones", type: "actions" as const },
];

export default function AdminDashboard() {
  useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    navigate("/admin");
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Bienvenido a LearnPro Admin
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Último mes
            </Button>
            <Button className="gap-2 bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4" />
              Nuevo Curso
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Estudiantes"
            value="2,847"
            icon={Users}
            change={{ value: "+12% este mes", type: "positive" }}
          />
          <StatsCard
            title="Cursos Activos"
            value="24"
            icon={BookOpen}
            change={{ value: "+3 este mes", type: "positive" }}
          />
          <StatsCard
            title="Ingresos Mensual"
            value="$15,240"
            icon={DollarSign}
            change={{ value: "+8% este mes", type: "positive" }}
          />
          <StatsCard
            title="Tasa de Conversión"
            value="3.2%"
            icon={TrendingUp}
            change={{ value: "+0.5% este mes", type: "positive" }}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Ingresos por Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-subtle rounded-lg">
                <p className="text-muted-foreground">Gráfico de ingresos aquí</p>
              </div>
            </CardContent>
          </Card>

          {/* Growth Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Crecimiento de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-subtle rounded-lg">
                <p className="text-muted-foreground">Gráfico de crecimiento aquí</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable
            title="Cursos Recientes"
            data={recentCourses}
            columns={courseColumns}
            onEdit={(course) => console.log("Edit course:", course)}
            onDelete={(course) => console.log("Delete course:", course)}
            onView={(course) => console.log("View course:", course)}
          />
          
          <DataTable
            title="Nuevos Suscriptores"
            data={recentSubscribers}
            columns={subscriberColumns}
            onView={(subscriber) => console.log("View subscriber:", subscriber)}
          />
        </div>
      </div>
    </AdminLayout>
  );
}