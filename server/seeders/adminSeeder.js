import bcrypt from 'bcryptjs';
import db from '../db.js';

const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await db('users')
      .where({ email: 'admin@example.com' })
      .first();

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await db('users').insert({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change the password after first login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();