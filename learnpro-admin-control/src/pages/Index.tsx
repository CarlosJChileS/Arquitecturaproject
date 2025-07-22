import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
                LearnPro
              </span>
            </div>
            <Link to="/admin">
              <Button className="gap-2 bg-gradient-primary hover:opacity-90">
                Acceder Admin
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold font-display mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Plataforma de Cursos Online
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Sistema completo de gestión de cursos con suscripciones mensuales y anuales. 
            Administra contenido, usuarios y pagos desde un solo lugar.
          </p>
          <Link to="/admin">
            <Button size="lg" className="gap-2 bg-gradient-primary hover:opacity-90 shadow-elegant">
              Ir al Panel de Admin
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Gestión de Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Crea, edita y organiza cursos con lecciones, categorías y contenido multimedia.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Suscripciones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sistema completo de suscripciones con planes mensuales y anuales. Gestión de pagos integrada.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Dashboard completo con estadísticas de usuarios, ingresos y progreso de estudiantes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-elegant bg-gradient-subtle border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">¿Listo para empezar?</h2>
              <p className="text-muted-foreground mb-6">
                Accede al panel de administración para gestionar tu plataforma de cursos online.
              </p>
              <Link to="/admin">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                  Acceder al Panel Admin
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
