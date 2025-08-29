# AQ Test - Aplicación de Tests de Autismo

Una aplicación web moderna y completa para realizar tests de autismo AQ-10 y AQ-50, con sistema de pagos integrado y panel de administración.

## Características

- **Tests AQ-10 y AQ-50**: Versiones corta y completa del Autism Spectrum Quotient
- **Sistema de Pagos**: Integración con PayPal para desbloquear resultados
- **Panel de Administración**: Gestión completa de pagos, estadísticas y configuración
- **Diseño Responsivo**: Optimizado para móvil y escritorio
- **Exportación de Resultados**: Descarga de resultados en TXT y PNG
- **Bloques JavaScript Personalizados**: Soporte para píxeles y scripts de terceros

## Tecnologías Utilizadas

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de Datos**: SQLite (por defecto) o MySQL/PostgreSQL
- **Pagos**: PayPal Checkout SDK
- **Analytics**: Google Analytics 4

## Instalación

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd aq-test-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Editar el archivo `.env` con tus configuraciones:

   **Para SQLite (desarrollo):**
   ```env
   DATABASE_URL="file:./dev.db"
   ```

   **Para MySQL (producción):**
   ```env
   DATABASE_URL="mysql://usuario:contraseña@localhost:3306/aqtest"
   ```

   **Para PostgreSQL (producción):**
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/aqtest"
   ```

4. **Inicializar la base de datos**
   ```bash
   npm run db:push
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## Configuración de Base de Datos

### Opción 1: SQLite (Recomendado para Desarrollo)

SQLite es una base de datos en archivo que no requiere servidor adicional.

**Ventajas:**
- Fácil configuración (solo un archivo)
- Ideal para desarrollo y pruebas
- No requiere instalación de servidor

**Configuración:**
```env
DATABASE_URL="file:./dev.db"
```

### Opción 2: MySQL (Recomendado para Producción)

MySQL es una base de datos robusta ideal para producción.

#### Requisitos previos:
- Servidor MySQL instalado y corriendo
- Base de datos creada
- Usuario con privilegios

#### Pasos para configurar:

1. **Instalar el cliente MySQL de Prisma:**
   ```bash
   npm install mysql2
   ```

2. **Crear la base de datos en MySQL:**
   ```sql
   CREATE DATABASE aqtest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'aqtest_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';
   GRANT ALL PRIVILEGES ON aqtest.* TO 'aqtest_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Configurar variables de entorno:**
   ```env
   DATABASE_URL="mysql://aqtest_user:tu_contraseña_segura@localhost:3306/aqtest"
   ```

4. **Generar la base de datos:**
   ```bash
   npm run db:push
   ```

#### Ejemplo de configuración para producción remota:
```env
DATABASE_URL="mysql://usuario:contraseña@tu-servidor.com:3306/aqtest?ssl-mode=REQUIRED"
```

### Opción 3: PostgreSQL (Alternativa para Producción)

PostgreSQL es otra excelente opción para entornos de producción.

#### Configuración:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/aqtest"
```

## Comandos Útiles de Base de Datos

```bash
# Generar/actualizar base de datos
npm run db:push

# Validar schema
npx prisma validate

# Abrir interfaz visual de la base de datos
npx prisma studio

# Generar cliente Prisma
npx prisma generate

# Resetear base de datos (¡elimina todos los datos!)
npx prisma db push --force-reset
```

## Configuración de Servicios Externos

### PayPal

Para obtener las claves de PayPal:

1. **Crear cuenta de PayPal Developer**
   - Visita [https://developer.paypal.com/](https://developer.paypal.com/)
   - Regístrate o inicia sesión con tu cuenta de PayPal

2. **Crear una aplicación**
   - Ve a "Dashboard" → "Apps & Credentials"
   - Haz clic en "Create App"
   - Nombre: "AQ Test App"
   - Tipo: "Merchant"

3. **Obtener credenciales**
   - **Client ID**: Clave pública de la API
   - **Client Secret**: Clave secreta de la API

4. **Configurar en la aplicación**
   - Ingresa al panel de administración en `/admin`
   - Ve a la pestaña "Configuración"
   - Ingresa el Client ID y Client Secret de PayPal

### Google Analytics

Para obtener el ID de Google Analytics:

1. **Crear cuenta de Google Analytics**
   - Visita [https://analytics.google.com/](https://analytics.google.com/)

2. **Crear una propiedad**
   - Haz clic en "Admin" (engranaje)
   - Crea una nueva cuenta y propiedad
   - Nombre: "AQ Test App"

3. **Obtener el ID de medición**
   - Una vez creada, ve a "Flujo de datos" → "Web"
   - Configura tu sitio web y obtén el **ID de medición** (formato: G-XXXXXXXXXX)

4. **Configurar en la aplicación**
   - Ingresa al panel de administración en `/admin`
   - Ve a la pestaña "Configuración"
   - Ingresa el ID de Google Analytics

## Uso

### Para Usuarios

1. **Acceso a la aplicación**: Visita la URL de tu aplicación
2. **Elegir test**: Selecciona entre AQ-10 (gratis) o AQ-50 ($2 USD)
3. **Realizar test**: Responde todas las preguntas
4. **Ver resultados**:
   - AQ-10: Resultados inmediatos y gratuitos
   - AQ-50: Paga $2 USD para desbloquear resultados

### Para Administradores

1. **Acceso al panel**: Visita `/admin`
2. **Configuración**:
   - Configurar claves de PayPal
   - Configurar Google Analytics
   - Agregar scripts personalizados
3. **Estadísticas**:
   - Ver tests completados
   - Ver ingresos generados
   - Analizar métricas

## Despliegue

### Producción

1. **Construir la aplicación**
   ```bash
   npm run build
   ```

2. **Iniciar en producción**
   ```bash
   npm start
   ```

### Vercel (Recomendado)

1. **Conectar repositorio a Vercel**
2. **Configurar variables de entorno** (incluyendo `DATABASE_URL`)
3. **Desplegar automáticamente**

## Estructura del Proyecto

```
src/
├── app/                 # Páginas y API routes
│   ├── admin/          # Panel de administración
│   ├── test/           # Páginas de tests
│   └── api/            # API routes
├── components/         # Componentes UI
├── hooks/             # Custom hooks
└── lib/               # Utilidades y configuración
```

## Contribuir

1. Fork del repositorio
2. Crear una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Soporte

Para soporte técnico, abre un issue en el repositorio o contacta al equipo de desarrollo.

## Notas Importantes

- Los tests AQ no reemplazan un diagnóstico médico profesional
- Los datos de los usuarios son tratados de forma confidencial
- La aplicación cumple con las normativas de privacidad aplicables
- Se recomienda revisar y cumplir con las políticas de PayPal y Google Analytics