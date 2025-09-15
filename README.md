# visualization-tools-IX
Repositorio para subir todos los codigos de Pedrozo

# Planeación Unidad 1 - Visual Modeling for Information
## Proyecto y Portafolio de Evidencias

### Fechas Críticas
- **Deadline Final**: 26 de Septiembre, 2025
- **Tiempo Disponible**: 2 semanas máximo
- **Presentación Oral**: Durante la última semana

---

## Estructura del Equipo y Responsabilidades

### Roles Definidos
- **Sergio**: Web para Proyecto
- **Alan**: Web para Portafolio  
- **Ariel**: Generador / API
- **Damaris**: ML / Analysis
- **Paulina**: Q&A / Testing
- **Diego**: Comodín (Soporte general)

---

## Entregables de la Unidad 1

### Proyecto: "Database-to-Dashboard Foundation" (25% de la calificación)
#### Componentes Requeridos:
1. **Database Integration Component** (25%)
2. **Data Processing Module** (25%)
3. **Web Visualization Interface** (35%)
4. **Technical Documentation** (15%)

### Portafolio de Evidencias (25% de la calificación)
#### Componentes Requeridos:
1. **Database Integration Projects**
2. **Statistical Analysis Reports** 
3. **Basic Visualization Gallery**
4. **Reflection Document**

---

## Cronograma por Semanas

### SEMANA 1 (Días 1-7)

#### Día 1-2: Setup e Infraestructura
**Ariel (API/Generator)**:
- [ ] Completar endpoints faltantes en la API
- [ ] Implementar conexiones SQL y NoSQL
- [ ] Crear scripts de inserción de datos
- [ ] Generar datasets sintéticos adicionales para el streaming platform
- [ ] Dockerizar completamente todos los servicios

**Diego (Comodín - Infraestructura)**:
- [ ] Configurar VPS con todos los servicios
- [ ] Asegurar que docker-compose funcione correctamente
- [ ] Implementar sistema de backup de datos
- [ ] Configurar monitoreo básico de servicios

#### Día 3-4: Base de Datos y Análisis
**Ariel (Continuación)**:
- [ ] Implementar schemas tanto SQL como NoSQL
- [ ] Crear queries complejos requeridos (mínimo 5 con joins, subqueries)
- [ ] Implementar agregaciones MongoDB (mínimo 3 pipelines)
- [ ] Documentar justificación de normalización

**Damaris (ML/Analysis)**:
- [ ] Crear Jupyter notebooks para análisis exploratorio
- [ ] Implementar estadísticas descriptivas (tendencia central, dispersión)
- [ ] Realizar detección de outliers y patrones
- [ ] Iniciar análisis de distribuciones de variables clave

#### Día 5-7: Desarrollo Web Inicial
**Sergio (Web Proyecto)**:
- [ ] Diseñar arquitectura de la aplicación web del proyecto
- [ ] Implementar página de selección principal
- [ ] Crear templates base para visualizaciones
- [ ] Integrar con API para obtener datos

**Alan (Web Portafolio)**:
- [ ] Crear estructura web para portafolio
- [ ] Implementar navegación entre componentes del portafolio
- [ ] Diseñar templates para mostrar evidencias
- [ ] Crear sistema de documentación integrado

**Paulina (Q&A)**:
- [ ] Definir casos de prueba para todos los componentes
- [ ] Crear checklist de calidad para entregables
- [ ] Revisar y validar datasets generados
- [ ] Documentar bugs encontrados

### SEMANA 2 (Días 8-14)

#### Día 8-9: Análisis Avanzado y Visualizaciones
**Damaris (ML/Analysis)**:
- [ ] Completar análisis inferenciales (correlaciones, clustering)
- [ ] Implementar pruebas de hipótesis
- [ ] Crear modelos predictivos básicos para retención
- [ ] Generar reportes de insights y recomendaciones

**Sergio (Web Proyecto)**:
- [ ] Implementar dashboards interactivos
- [ ] Crear visualizaciones con D3.js/Plotly
- [ ] Implementar filtros y drill-down capabilities
- [ ] Asegurar responsive design

#### Día 10-11: Integración y Testing
**Alan (Web Portafolio)**:
- [ ] Integrar todos los componentes del portafolio
- [ ] Crear sistema de reflexiones y documentación
- [ ] Implementar galería de visualizaciones
- [ ] Asegurar navegación fluida entre secciones

**Paulina (Q&A)**:
- [ ] Realizar testing integral de todos los sistemas
- [ ] Validar funcionalidad de APIs y endpoints
- [ ] Revisar calidad de visualizaciones
- [ ] Documentar procedimientos de testing

**Diego (Comodín)**:
- [ ] Apoyar en integración de componentes
- [ ] Resolver bugs críticos
- [ ] Optimizar performance de aplicaciones
- [ ] Asistir donde se requiera más ayuda

#### Día 12-13: Documentación y Refinamiento
**Todo el Equipo**:
- [ ] Completar documentación técnica
- [ ] Crear README.md completo del proyecto
- [ ] Preparar demo en vivo
- [ ] Refinar visualizaciones y UX

**Asignaciones Específicas**:
- **Ariel**: Documentar APIs y arquitectura de datos
- **Damaris**: Completar reportes de análisis estadístico
- **Sergio + Alan**: Crear guías de usuario para aplicaciones web
- **Paulina**: Crear reporte de calidad y testing
- **Diego**: Coordinar entrega final y deployment

#### Día 14: Preparación de Presentación
**Todo el Equipo**:
- [ ] Preparar presentación oral (15 min + 5 min Q&A)
- [ ] Ensayar demo en vivo
- [ ] Preparar respuestas para preguntas técnicas
- [ ] Realizar deployment final en VPS

---

## Distribución de Tareas por Componente

### Para el PROYECTO ("Database-to-Dashboard Foundation")

#### Database Integration Component (Ariel + Diego)
- Conexiones SQL (PostgreSQL) y NoSQL (MongoDB)
- Scripts de extracción con manejo de errores
- Documentación de schemas y relaciones
- Estrategias de optimización de performance

#### Data Processing Module (Damaris + Ariel)
- Parsing de CSV y JSON
- Algoritmos de limpieza y transformación
- Funciones de análisis estadístico
- Detección de patrones y anomalías

#### Web Visualization Interface (Sergio + Alan)
- Dashboard responsive HTML/CSS/JavaScript
- Charts interactivos con D3.js/Plotly
- Navegación y filtrado user-friendly
- Implementación mobile-responsive

#### Technical Documentation (Paulina + Diego)
- Documentación de APIs
- Comentarios de código y arquitectura
- Manual de usuario para dashboard
- Procedimientos de testing y validación

### Para el PORTAFOLIO DE EVIDENCIAS

#### Database Integration Projects (Ariel)
- Ejemplos de queries SQL y NoSQL
- Documentación de extracción y limpieza
- Samples de procesamiento CSV/JSON

#### Statistical Analysis Reports (Damaris)
- Cálculos de tendencia central
- Ejemplos de análisis de correlación
- Estudios de casos de reconocimiento de patrones

#### Basic Visualization Gallery (Sergio + Alan)
- Charts y gráficos simples
- Visualizaciones web con HTML/CSS/JavaScript
- Documentación de decisiones de diseño

#### Reflection (Todo el equipo, coordinado por Paulina)
- Análisis de principios de visualización aprendidos
- Insights personales sobre desafíos de interpretación de datos

---

## Tecnologías y Tools Confirmadas

### Backend y Datos
- **Bases de Datos**: PostgreSQL (SQL) + MongoDB (NoSQL)
- **API**: Python Flask/FastAPI
- **Análisis**: Python (pandas, numpy, scipy, scikit-learn)
- **Visualización de Datos**: matplotlib, seaborn, plotly

### Frontend
- **Web**: HTML, CSS, JavaScript
- **Librerías de Visualización**: D3.js, Plotly, Chart.js
- **Framework**: Posiblemente Flask para server-side rendering

### DevOps e Infraestructura
- **Containerización**: Docker + docker-compose
- **Deployment**: VPS privado del equipo
- **Version Control**: Git (ya configurado)

---

## Criterios de Éxito y Quality Gates

### Checkpoints Semanales
**Fin de Semana 1**:
- [ ] Todos los servicios corriendo en VPS
- [ ] APIs completamente funcionales
- [ ] Datasets generados y almacenados
- [ ] Análisis estadístico básico completado
- [ ] Prototipos web funcionales

**Fin de Semana 2**:
- [ ] Proyecto completamente integrado
- [ ] Portafolio web desplegado
- [ ] Documentación completa
- [ ] Presentación preparada
- [ ] Testing finalizado

### Métricas de Calidad
- **Funcionalidad**: 100% de endpoints funcionando
- **Performance**: Tiempos de respuesta < 2 segundos
- **UX**: Navegación intuitiva y responsive
- **Documentación**: README completo + documentación técnica
- **Testing**: Cobertura básica de casos de uso principales

---

## Entregables Finales

### Formato de Entrega (26 Septiembre)
1. **GitHub Repository** completo con documentación
2. **Aplicaciones desplegadas** en VPS (URLs funcionales)
3. **Presentación oral** (15 min + 5 min Q&A)
4. **Demo en vivo** de funcionalidades

### Checklist Pre-Entrega
- [ ] Todos los servicios funcionando en VPS
- [ ] README.md completo con instrucciones de setup
- [ ] Documentación técnica completa
- [ ] APIs documentadas con ejemplos
- [ ] Análisis estadísticos con interpretaciones
- [ ] Visualizaciones interactivas funcionando
- [ ] Portafolio web navegable y completo
- [ ] Presentación preparada y ensayada



## Estructura del Equipo y Responsabilidades

| Nombre  | Responsabilidad             |
| ------  | --------------------------- |
| Alan    | Web para Portafolio         |
| Ariel   | Generador / API             |
| Damaris | ML / Analysis               |
| Diego   | Team Lead (Soporte general) |
| Paulina | Q&A / Testing               |
| Sergio  | Web para Proyecto           |



## Variables de Entorno

| Nombre              |
| ------------------- |
| MONGO_URL           |
| MONGO_DB            |
| MONGO_ROOT_USER     |
| MONGO_ROOT_PASSWORD |
| MONGO_USER          |
| MONGO_PASSWORD      |
| POSTGRES_HOST       |
| POSTGRES_PORT       |
| POSTGRES_DB         |
| POSTGRES_USER       |
| POSTGRES_PASSWORD   |
| URL_API             |

## Autor(es)
* [Alan Valbuena](https://github.com/AlanVAal)
* [Ariel Buenfil](https://github.com/areo-17)
* [Damaris Dzul](https://github.com/damarisuwu1)
* [Diego Monroy](https://github.com/monroyminerodiego)
* [Paulina Chiquete](https://github.com/)
* [Sergio Barrera](https://github.com/S3RG10-B4RR3R4)
