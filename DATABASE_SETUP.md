# 📚 Guía de Configuración de Base de Datos

## 🎯 Resumen

Esta aplicación utiliza **Prisma ORM** con **SQLite** como base de datos. La estructura ya está definida y lista para usar.

---

## 🗄️ Estructura de la Base de Datos

### Tablas Principales:

#### 1. **User** - Usuarios del sistema
```sql
- id: String (Primary Key)
- email: String? (opcional)
- name: String? (opcional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 2. **TestResult** - Resultados de los tests
```sql
- id: String (Primary Key)
- userId: String? (Foreign Key)
- testType: Enum (AQ10, AQ50)
- answers: JSON (respuestas del usuario)
- score: Int (puntuación obtenida)
- result: String (interpretación)
- createdAt: DateTime
```

#### 3. **Payment** - Registros de pagos
```sql
- id: String (Primary Key)
- userId: String? (Foreign Key)
- testResultId: String? (Unique, Foreign Key)
- amount: Float
- currency: String (default: USD)
- paymentMethod: Enum (PAYPAL)
- transactionId: String?
- status: Enum (PENDING, COMPLETED, FAILED, REFUNDED)
- createdAt: DateTime
```

#### 4. **Config** - Configuraciones del sistema
```sql
- id: String (Primary Key)
- key: String (Unique)
- value: String
- createdAt: DateTime
- updatedAt: DateTime
```

---

## 🔧 Configuración Paso a Paso

### Paso 1: Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Base de Datos SQLite (desarrollo)
DATABASE_URL="file:./dev.db"

# Opcional: PostgreSQL para producción
# DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/aqtest"

# Opcional: MySQL para producción  
# DATABASE_URL="mysql://usuario:contraseña@localhost:3306/aqtest"
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Generar Base de Datos

```bash
# Crear la base de datos con la estructura definida
npm run db:push

# O alternatively
npx prisma db push
```

### Paso 4: Verificar Instalación

```bash
# Ejecutar script de verificación
npx tsx scripts/verify-database.ts

# O abrir Prisma Studio (interfaz visual)
npx prisma studio
```

---

## 🚀 Opciones de Base de Datos

### Opción 1: SQLite (Recomendado para Desarrollo)

**Ventajas:**
- ✅ Fácil de usar (archivo único)
- ✅ No requiere servidor adicional
- ✅ Ideal para desarrollo y pequeños proyectos

**Configuración:**
```bash
DATABASE_URL="file:./dev.db"
```

### Opción 2: PostgreSQL (Recomendado para Producción)

**Ventajas:**
- ✅ Escalable
- ✅ Mejor rendimiento para grandes volúmenes
- ✅ Más características avanzadas

**Configuración:**
```bash
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/aqtest"
```

### Opción 3: MySQL

**Ventajas:**
- ✅ Ampliamente utilizado
- ✅ Buen rendimiento
- ✅ Comunidad grande

**Configuración:**
```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/aqtest"
```

---

## 📝 Comandos Útiles de Prisma

```bash
# Generar base de datos
npm run db:push

# Verificar schema
npx prisma validate

# Abrir interfaz visual
npx prisma studio

# Generar cliente Prisma
npx prisma generate

# Resetear base de datos (¡cuidado! borra todos los datos)
npx prisma db push --force-reset
```

---

## 🔍 Sobre NEXTAUTH_SECRET y NEXTAUTH_URL

Estas variables son para **NextAuth.js**, un sistema de autenticación que **no está implementado actualmente** en esta aplicación.

### Si quisieras añadir autenticación en el futuro:

1. **Instalar NextAuth.js:**
```bash
npm install next-auth @next-auth/prisma-adapter
```

2. **Configurar variables:**
```bash
NEXTAUTH_SECRET="tu_secreto_muy_seguro_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

3. **Generar un secreto seguro:**
```bash
openssl rand -base64 32
```

### ¿Qué significan estas variables?

- **NEXTAUTH_SECRET**: Clave secreta para firmar y verificar tokens JWT
- **NEXTAUTH_URL**: URL base de tu aplicación para redirecciones

---

## 🎯 Configuración Actual (Funcionando)

La aplicación ya está configurada con:

- ✅ **Base de datos**: SQLite en `/home/z/my-project/db/custom.db`
- ✅ **ORM**: Prisma con schema definido
- ✅ **Tablas**: User, TestResult, Payment, Config
- ✅ **Configuración inicial**: Insertada automáticamente
- ✅ **Cliente Prisma**: Generado y listo para usar

---

## 🔄 Migraciones

Si necesitas hacer cambios en el futuro:

```bash
# 1. Modifica el schema en prisma/schema.prisma

# 2. Aplica los cambios
npm run db:push

# 3. Verifica que todo funciona
npx tsx scripts/verify-database.ts
```

---

## 🐛 Solución de Problemas

### Problema: "Database file not found"
```bash
# Asegúrate de que el directorio existe
mkdir -p db

# Genera la base de datos
npm run db:push
```

### Problema: "Permission denied"
```bash
# Asegúrate de tener permisos en el directorio
chmod 755 db/
```

### Problema: "Prisma schema validation failed"
```bash
# Valida el schema
npx prisma validate

# Revisa errores en el archivo prisma/schema.prisma
```

---

## ✅ Verificación Final

Para asegurarte de que todo funciona correctamente:

```bash
# 1. Verificar base de datos
npx tsx scripts/verify-database.ts

# 2. Iniciar aplicación
npm run dev

# 3. Abrir en navegador
http://localhost:3000
```

¡La aplicación debería funcionar perfectamente con la base de datos configurada! 🎉