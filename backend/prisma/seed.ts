import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Clear all data in correct order ---
  await prisma.message.deleteMany();
  await prisma.budgetItem.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑️  Cleared existing data");

  // --- Users ---
  const adminPassword = await bcrypt.hash("admin", 10);
  const userPassword  = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: { name: "Administrador", email: "admin@gmail.com", password: adminPassword, role: "ADMIN" },
  });

  const gorka = await prisma.user.create({
    data: { name: "Gorka Etxeberria", email: "gorka@gudi.com", password: userPassword, role: "USER" },
  });

  const mario = await prisma.user.create({
    data: { name: "Mario Fernández", email: "mario@gudi.com", password: userPassword, role: "USER" },
  });

  const cliente = await prisma.user.create({
    data: { name: "Laura García", email: "laura@empresa.com", password: userPassword, role: "USER" },
  });

  console.log(`👤 Created ${4} users`);

  // --- Appointments ---
  const now = new Date();

  const appointments = await prisma.appointment.createMany({
    data: [
      {
        title: "Reunión de equipo semanal",
        description: "Revisión del sprint y planificación de la semana",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0),
        endDate:   new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0),
        userId: admin.id,
      },
      {
        title: "Demo con cliente — Empresa XYZ",
        description: "Presentación del módulo de presupuestación al cliente",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 11, 0),
        endDate:   new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 12, 30),
        userId: admin.id,
      },
      {
        title: "Revisión de diseño frontend",
        description: "Feedback sobre las pantallas de login y dashboard",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 15, 0),
        endDate:   new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 16, 0),
        userId: admin.id,
      },
      {
        title: "Llamada con proveedor",
        description: "Negociación de licencias de software",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 10, 0),
        endDate:   new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 10, 45),
        userId: admin.id,
      },
      {
        title: "Entrega de documentación del proyecto",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 9, 0),
        endDate:   new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 9, 30),
        userId: admin.id,
      },
      {
        title: "Formación interna — TypeScript avanzado",
        description: "Sesión de formación para el equipo de desarrollo",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 14, 0),
        endDate:   new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 16, 0),
        userId: gorka.id,
      },
      {
        title: "Reunión de seguimiento con Mario",
        description: "Revisión del avance en diseño y documentación",
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 11, 0),
        endDate:   new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 11, 30),
        userId: mario.id,
      },
    ],
  });

  console.log(`📅 Created ${appointments.count} appointments`);

  // --- Budgets ---
  const budget1 = await prisma.budget.create({
    data: {
      title: "Desarrollo web corporativa — Empresa ABC",
      clientName: "Empresa ABC S.L.",
      taxRate: 21,
      status: "ACCEPTED",
      userId: admin.id,
      items: {
        create: [
          { description: "Diseño UX/UI (5 pantallas)", quantity: 1, unitPrice: 800 },
          { description: "Desarrollo frontend React", quantity: 40, unitPrice: 45 },
          { description: "Desarrollo backend Node.js", quantity: 30, unitPrice: 50 },
          { description: "Configuración servidor y dominio", quantity: 1, unitPrice: 150 },
        ],
      },
    },
  });

  const budget2 = await prisma.budget.create({
    data: {
      title: "Mantenimiento mensual — Cliente García",
      clientName: "García & Asociados",
      taxRate: 21,
      status: "SENT",
      userId: admin.id,
      items: {
        create: [
          { description: "Mantenimiento y soporte técnico", quantity: 4, unitPrice: 120 },
          { description: "Actualizaciones de seguridad", quantity: 1, unitPrice: 80 },
        ],
      },
    },
  });

  const budget3 = await prisma.budget.create({
    data: {
      title: "App móvil — Startup Innovatech",
      clientName: "Innovatech S.L.",
      taxRate: 21,
      status: "DRAFT",
      userId: admin.id,
      items: {
        create: [
          { description: "Análisis de requisitos", quantity: 8, unitPrice: 60 },
          { description: "Diseño de interfaces móvil", quantity: 1, unitPrice: 1200 },
          { description: "Desarrollo iOS + Android (React Native)", quantity: 120, unitPrice: 55 },
          { description: "Testing y QA", quantity: 20, unitPrice: 40 },
          { description: "Publicación en tiendas", quantity: 1, unitPrice: 200 },
        ],
      },
    },
  });

  const budget4 = await prisma.budget.create({
    data: {
      title: "Consultoría transformación digital",
      clientName: "Industrias Martínez",
      taxRate: 21,
      status: "REJECTED",
      userId: admin.id,
      items: {
        create: [
          { description: "Auditoría procesos actuales", quantity: 2, unitPrice: 500 },
          { description: "Plan de transformación digital", quantity: 1, unitPrice: 1500 },
        ],
      },
    },
  });

  console.log(`📄 Created 4 budgets (${budget1.id}, ${budget2.id}, ${budget3.id}, ${budget4.id})`);

  // --- Messages ---
  await prisma.message.createMany({
    data: [
      {
        subject: "Consulta sobre presupuesto app móvil",
        body: "Buenos días,\n\nMe pongo en contacto para solicitar más información sobre el presupuesto que nos enviaron la semana pasada para el desarrollo de la aplicación móvil.\n\n¿Sería posible tener una reunión esta semana para revisar los detalles?\n\nQuedo a su disposición.\n\nSaludos,\nCarlos Innovatech",
        channel: "EMAIL",
        status: "UNREAD",
        senderName: "Carlos Ruiz",
        senderContact: "carlos@innovatech.com",
        userId: admin.id,
      },
      {
        subject: "Confirmación reunión del martes",
        body: "Hola,\n\nConfirmo mi asistencia a la reunión del martes a las 11:00h.\n\nNos vemos entonces.\n\nUn saludo,\nLaura García",
        channel: "EMAIL",
        status: "READ",
        senderName: "Laura García",
        senderContact: "laura@empresa.com",
        userId: admin.id,
      },
      {
        subject: null,
        body: "Hola! Me han dicho que ofrecéis servicios de mantenimiento web. ¿Podéis decirme el precio mensual? Gracias 🙏",
        channel: "WHATSAPP",
        status: "UNREAD",
        senderName: "Ana Torres",
        senderContact: "+34 612 345 678",
        userId: admin.id,
      },
      {
        subject: null,
        body: "Buenas, ¿estáis disponibles para hacer una web para mi negocio? Es una tienda de ropa. Me gustaría saber plazos y presupuesto aproximado.",
        channel: "WHATSAPP",
        status: "UNREAD",
        senderName: "Pedro Sánchez",
        senderContact: "+34 698 765 432",
        userId: admin.id,
      },
      {
        subject: "Retraso en entrega de assets",
        body: "Hola equipo,\n\nOs informo de que los assets del cliente para el proyecto ABC llegarán con dos días de retraso. Ajustad el planning en consecuencia.\n\nGracias,\nMario",
        channel: "INTERNAL",
        status: "READ",
        senderName: "Mario Fernández",
        senderContact: "mario@gudi.com",
        userId: admin.id,
      },
      {
        subject: "Problema con despliegue en producción",
        body: "He detectado un error en el pipeline de CI/CD al intentar hacer el despliegue. El build falla en el paso de migraciones de Prisma. ¿Alguien puede echar un vistazo?\n\nGorka",
        channel: "INTERNAL",
        status: "UNREAD",
        senderName: "Gorka Etxeberria",
        senderContact: "gorka@gudi.com",
        userId: admin.id,
      },
      {
        subject: "Factura pendiente — mes de marzo",
        body: "Estimados,\n\nLes recordamos que tienen pendiente el pago de la factura correspondiente al mes de marzo por importe de 580€.\n\nPor favor, procedan al pago antes del día 15.\n\nAtentamente,\nDpto. Contabilidad",
        channel: "EMAIL",
        status: "ARCHIVED",
        senderName: "Gestoría Contable",
        senderContact: "contabilidad@gestoria.com",
        userId: admin.id,
      },
      {
        subject: null,
        body: "Hola! Ya he revisado los diseños que me mandasteis. Todo perfecto, podéis seguir adelante con el desarrollo. 👍",
        channel: "WHATSAPP",
        status: "READ",
        senderName: "Laura García",
        senderContact: "+34 654 321 987",
        userId: admin.id,
      },
    ],
  });

  console.log("💬 Created 8 messages");
  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 Credentials:");
  console.log("   Admin → admin@gmail.com / admin");
  console.log("   User  → gorka@gudi.com / password123");
  console.log("   User  → mario@gudi.com / password123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
