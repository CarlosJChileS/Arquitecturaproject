import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, Star, Search, Filter } from "lucide-react";
import { getCourses } from "../api";

type Course = {
  id: number;
  title: string;
  description: string;
  image?: string;
  instructor?: string;
  duration?: string;
  students?: number;
  rating?: number;
  level?: string;
  category?: string;
  price?: string;
};

const categories = ["Todas", "Programación", "Frontend", "Backend", "Data Science", "Diseño", "DevOps"];
const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"];

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedLevel, setSelectedLevel] = useState("Todos");

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch((err) => console.error(err));
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "Todos" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Explora Nuestros Cursos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre una amplia variedad de cursos diseñados para llevar tus habilidades al siguiente nivel
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Mostrando {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-glow transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {course.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant="outline" 
                    className={`bg-background/80 backdrop-blur-sm ${
                      course.level === 'Principiante' ? 'border-green-500 text-green-600' :
                      course.level === 'Intermedio' ? 'border-yellow-500 text-yellow-600' :
                      'border-red-500 text-red-600'
                    }`}
                  >
                    {course.level}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Por {course.instructor}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link to={`/courses/${course.id}`}>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                      Ver Curso
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No se encontraron cursos</h3>
            <p className="text-muted-foreground mb-6">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Todas");
                setSelectedLevel("Todos");
              }}
              variant="outline"
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;