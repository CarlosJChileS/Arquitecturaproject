import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-learning">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            LearnPro
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-slide-up">
            Plataforma de cursos online con suscripciones flexibles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Explorar cursos
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-white/10 border-white hover:bg-white hover:text-primary">
              Ver planes
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Accede a todas tus herramientas
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card hover:shadow-soft transition-all duration-300 bg-gradient-card border-0 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors duration-300">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Cursos</CardTitle>
                <CardDescription>
                  Accede a tu biblioteca de cursos y continúa aprendiendo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-primary">
                  Ver cursos
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-soft transition-all duration-300 bg-gradient-card border-0 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Dashboard</CardTitle>
                <CardDescription>
                  Revisa tu progreso y estadísticas de aprendizaje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-primary">
                  Ver dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-soft transition-all duration-300 bg-gradient-card border-0 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors duration-300">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Suscripción</CardTitle>
                <CardDescription>
                  Gestiona tu plan y métodos de pago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-primary">
                  Gestionar plan
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-soft transition-all duration-300 bg-gradient-card border-0 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors duration-300">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Perfil</CardTitle>
                <CardDescription>
                  Edita tu información personal y preferencias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-primary">
                  Ver perfil
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="shadow-card bg-gradient-card border-0 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-primary">¿Necesitas ayuda?</CardTitle>
                <CardDescription>
                  Nuestro equipo de soporte está aquí para asistirte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/contacto">
                  <Button className="w-full bg-gradient-primary">
                    Ir a Contacto
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
