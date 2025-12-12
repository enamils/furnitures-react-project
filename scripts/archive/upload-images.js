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
  console.error('Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/upload-images.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadImages() {
  console.log('🚀 Starting images upload to Supabase Storage...\n');

  const imagesDir = path.join(__dirname, '../backend/public/images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found:', imagesDir);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  console.log(`📁 Found ${files.length} files to upload\n`);

  let uploadedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    // Déterminer bucket selon le nom du fichier
    let bucket = 'products';
    if (file.includes('post')) bucket = 'posts';
    if (file.includes('person')) bucket = 'teams';

    console.log(`📤 Uploading ${file} to ${bucket}...`);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file, fileBuffer, {
        contentType: `image/${file.split('.').pop()}`,
        upsert: true,
      });

    if (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Uploaded ${file}`);
      uploadedCount++;
    }
  }

  console.log(`\n✨ Upload completed!`);
  console.log(`   Successful: ${uploadedCount}`);
  console.log(`   Failed: ${errorCount}`);
}

uploadImages().catch(console.error);
