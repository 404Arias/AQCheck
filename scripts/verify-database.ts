import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔍 Verificando estructura de la base de datos...\n')

    // Verificar tablas
    console.log('📋 Tablas encontradas:')
    
    // Verificar tabla Config
    const configCount = await prisma.config.count()
    console.log(`   • Config: ${configCount} registros`)
    
    // Verificar tabla User
    const userCount = await prisma.user.count()
    console.log(`   • User: ${userCount} registros`)
    
    // Verificar tabla TestResult
    const testResultCount = await prisma.testResult.count()
    console.log(`   • TestResult: ${testResultCount} registros`)
    
    // Verificar tabla Payment
    const paymentCount = await prisma.payment.count()
    console.log(`   • Payment: ${paymentCount} registros`)
    
    console.log('\n✅ Base de datos verificada correctamente!')
    
    // Insertar configuración inicial si no existe
    const existingConfig = await prisma.config.findFirst({
      where: { key: 'GOOGLE_ANALYTICS_ID' }
    })
    
    if (!existingConfig) {
      console.log('\n📝 Insertando configuración inicial...')
      await prisma.config.createMany({
        data: [
          { key: 'GOOGLE_ANALYTICS_ID', value: '' },
          { key: 'PAYPAL_CLIENT_ID', value: '' },
          { key: 'PAYPAL_CLIENT_SECRET', value: '' },
          { key: 'PAYPAL_MODE', value: 'sandbox' }
        ]
      })
      console.log('✅ Configuración inicial insertada!')
    }
    
  } catch (error) {
    console.error('❌ Error al verificar la base de datos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()