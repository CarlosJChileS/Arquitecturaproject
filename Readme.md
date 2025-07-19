Opción B: Plataforma de Suscripción "LearnPro"
Descripción: Sistema de cursos online con planes de suscripción mensual y anual.

Funcionalidades principales:

Gestión de cursos y lecciones
Sistema de suscripciones (mensual/anual)
Control de acceso basado en suscripción
Pasarelas de pago recurrentes
Dashboard de progreso del estudiante
Sistema de notificaciones y recordatorios


REQUISITOS TÉCNICOS OBLIGATORIOS
1. Documentación de Arquitectura
Herramienta: C4 Model o arc42
Entregables mínimos:
Diagrama de contexto (C1)
Diagrama de contenedores (C2)
Diagrama de componentes (C3)
Decisiones arquitectónicas (ADRs)
2. Calidad de Código
Integración con SonarQube
Coverage mínimo: 70%
Quality Gate: Passed
Sin vulnerabilidades críticas
Configurar GitHub Actions para análisis automático
3. Control de Versiones
Repositorio GitHub
Branching strategy (GitFlow)
Pull requests obligatorios
Code reviews entre miembros
README completo
4. Patrones de Diseño (Mínimo 3)
Obligatorios:

Factory Method
Singleton
Repository Pattern
Strategy Pattern
5. Modelo Arquitectónico
Opciones: Monolítico modular o Microservicios
Justificar la elección en la documentación
Este repositorio adopta la alternativa de **Microservicios**, por lo que el código se divide en servicios independientes.
6. Estilos Arquitectónicos Ágiles
Implementar CI/CD
Despliegue automatizado
Pruebas automatizadas
7. Funcionamiento Local y Cloud
Local: Docker Compose
Cloud: Mínimo un proveedor (AWS, Azure, GCP, Vercel, Render)
8. Despliegue Automatizado
GitHub Actions, Cloud Run, o Azure DevOps
Ambientes: desarrollo, staging, producción
9. Arquitectura Cloud-Native
Diseño escalable
Stateless services
Health checks
10. Middleware
API Gateway
Rate limiting
Autenticación/Autorización
11. Pasarelas de Pago (2-3)
Obligatorias:

Stripe
PayPal
Opcional:

Mercado Pago o similar
12. Modelo de Negocio
Documentar canvas de modelo de negocio
Análisis de costos cloud
Proyección de escalabilidad
📐 ARQUITECTURA DE REFERENCIA

Para Proyecto Monolítico Modular

├── api-gateway/
├── core/
│   ├── domain/
│   ├── application/
│   └── infrastructure/
├── modules/
│   ├── auth/
│   ├── products/
│   ├── payments/
│   └── notifications/
├── shared/
│   ├── middleware/
│   ├── utils/
│   └── patterns/
└── docker/

Para Proyecto Microservicios

├── api-gateway/
├── services/
│   ├── auth-service/
│   ├── product-service/
│   ├── payment-service/
│   └── notification-service/
├── shared/
│   ├── contracts/
│   ├── utils/
│   └── middleware/
├── infrastructure/
│   ├── docker/
│   ├── k8s/
│   └── terraform/
└── docs/


📦 ENTREGABLES
1. Código Fuente
Repositorio GitHub con acceso público
Branches organizados según GitFlow
Commits descriptivos
Pull requests documentados
2. Documentación
README.md completo con instrucciones
Documentación de arquitectura (C4/arc42)
ADRs (Architecture Decision Records)
API documentation (Swagger/OpenAPI)
Modelo de negocio (Business Model Canvas)
3. Calidad
Reporte de SonarQube
Resultados de tests
Coverage report
Performance metrics
4. Despliegue
URLs de aplicación desplegada
Scripts de deployment
Configuración de CI/CD
Documentación de infraestructura
5. Presentación
Demo en vivo (15 minutos)
Presentación técnica (10 minutos)
Q&A (5 minutos)
🛠️ RECURSOS Y HERRAMIENTAS
Herramientas Obligatorias
Git/GitHub
Docker & Docker Compose
SonarQube (Cloud o Self-hosted)
Postman/Insomnia para testing de APIs
Servicios Cloud Gratuitos
AWS: Free tier (EC2, RDS, S3)
Azure: $200 créditos estudiantes
Google Cloud: $300 créditos nuevos usuarios
Render: Free tier para web services
Vercel: Free tier para frontend
Supabase: Free tier para backend
Railway: Free tier $5/mes
Pasarelas de Pago (Modo Test)
Stripe: Test mode con tarjetas de prueba
PayPal: Sandbox environment
MercadoPago: Ambiente de pruebas
Herramientas de Documentación
C4 Model: PlantUML, Structurizr, diagrams.net
arc42: Template oficial
Swagger: Para documentación de APIs
📝 NOTAS IMPORTANTES
Trabajo en Equipo: Todos los miembros deben contribuir equitativamente
Plagio: Será penalizado con nota 0
Asistencia: Obligatoria a las presentaciones finales
Comunicación: Mantener al docente informado del progreso
Problemas Técnicos: Reportar inmediatamente para buscar soluciones
🎯 CRITERIOS DE ÉXITO
Proyecto Exitoso debe:
Funcionar correctamente en local y cloud
✅ Tener documentación clara y completa
✅ Cumplir con estándares de calidad (SonarQube)
✅ Implementar todos los patrones requeridos
✅ Demostrar trabajo colaborativo
✅ Ser presentado profesionalmente