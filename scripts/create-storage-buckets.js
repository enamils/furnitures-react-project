import { createClient } from '@supabase/supabase-js';

// Config Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  console.error('Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/create-storage-buckets.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createBuckets() {
  console.log('🚀 Creating Supabase Storage buckets...\n');

  const buckets = ['products', 'posts', 'teams'];

  for (const bucketName of buckets) {
    console.log(`📦 Creating bucket: ${bucketName}...`);
    
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`✅ Bucket ${bucketName} already exists`);
      } else {
        console.error(`❌ Failed to create bucket ${bucketName}:`, error.message);
      }
    } else {
      console.log(`✅ Bucket ${bucketName} created successfully`);
    }
  }

  console.log('\n✨ Buckets creation completed!\n');
}

createBuckets().catch(console.error);
