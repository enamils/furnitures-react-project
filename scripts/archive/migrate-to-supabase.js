import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  console.error('Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/migrate-to-supabase.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Lire les données JSON (les fichiers sont des tableaux directs)
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/api/products.json'), 'utf-8'));
const teamsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/api/teams.json'), 'utf-8'));
const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/api/posts.json'), 'utf-8'));
const imagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/api/images.json'), 'utf-8'));
const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/api/orders.json'), 'utf-8'));

async function migrateData() {
  console.log('🚀 Starting data migration to Supabase...\n');

  // 1. Migrate Products
  console.log('📦 Migrating products...');
  const { data: products, error: productsError } = await supabase
    .from('products')
    .insert(productsData);
  
  if (productsError) {
    console.error('❌ Products migration failed:', productsError);
  } else {
    console.log(`✅ ${productsData.length} products migrated`);
  }

  // 2. Migrate Teams
  console.log('\n👥 Migrating teams...');
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .insert(teamsData);
  
  if (teamsError) {
    console.error('❌ Teams migration failed:', teamsError);
  } else {
    console.log(`✅ ${teamsData.length} teams migrated`);
  }

  // 3. Migrate Posts
  console.log('\n📝 Migrating posts...');
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .insert(postsData);
  
  if (postsError) {
    console.error('❌ Posts migration failed:', postsError);
  } else {
    console.log(`✅ ${postsData.length} posts migrated`);
  }

  // 4. Migrate Images
  console.log('\n🖼️  Migrating images...');
  const { data: images, error: imagesError } = await supabase
    .from('images')
    .insert(imagesData);
  
  if (imagesError) {
    console.error('❌ Images migration failed:', imagesError);
  } else {
    console.log(`✅ ${imagesData.length} images migrated`);
  }

  // 5. Migrate Orders (if exists)
  if (ordersData && ordersData.length > 0) {
    console.log('\n🛒 Migrating orders...');
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .insert(ordersData.map(order => ({
        ...order,
        billing_details: order.billingDetails,
        cart_items: order.cartItems,
      })));
    
    if (ordersError) {
      console.error('❌ Orders migration failed:', ordersError);
    } else {
      console.log(`✅ ${ordersData.length} orders migrated`);
    }
  }

  console.log('\n✨ Data migration completed!\n');
}

migrateData().catch(console.error);
