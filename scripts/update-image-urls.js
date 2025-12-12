import { createClient } from '@supabase/supabase-js';

// Config Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateImageUrls() {
  console.log('🚀 Updating image URLs to Supabase Storage...\n');

  // 1. Update Products
  console.log('📦 Updating products images...');
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, image');
  
  if (productsError) {
    console.error('❌ Failed to fetch products:', productsError);
  } else {
    for (const product of products) {
      const fileName = product.image.replace('images/', '');
      const newUrl = `${supabaseUrl}/storage/v1/object/public/products/${fileName}`;
      
      const { error } = await supabase
        .from('products')
        .update({ image: newUrl })
        .eq('id', product.id);
      
      if (error) {
        console.error(`❌ Failed to update product ${product.id}:`, error);
      } else {
        console.log(`✅ Updated product ${product.id}`);
      }
    }
  }

  // 2. Update Teams
  console.log('\n👥 Updating teams images...');
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select('id, image');
  
  if (teamsError) {
    console.error('❌ Failed to fetch teams:', teamsError);
  } else {
    for (const team of teams) {
      const fileName = team.image.replace('images/', '');
      const newUrl = `${supabaseUrl}/storage/v1/object/public/teams/${fileName}`;
      
      const { error } = await supabase
        .from('teams')
        .update({ image: newUrl })
        .eq('id', team.id);
      
      if (error) {
        console.error(`❌ Failed to update team ${team.id}:`, error);
      } else {
        console.log(`✅ Updated team ${team.id}`);
      }
    }
  }

  // 3. Update Posts
  console.log('\n📝 Updating posts images...');
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('id, image');
  
  if (postsError) {
    console.error('❌ Failed to fetch posts:', postsError);
  } else {
    for (const post of posts) {
      const fileName = post.image.replace('images/', '');
      const newUrl = `${supabaseUrl}/storage/v1/object/public/posts/${fileName}`;
      
      const { error } = await supabase
        .from('posts')
        .update({ image: newUrl })
        .eq('id', post.id);
      
      if (error) {
        console.error(`❌ Failed to update post ${post.id}:`, error);
      } else {
        console.log(`✅ Updated post ${post.id}`);
      }
    }
  }

  // 4. Update Images table
  console.log('\n🖼️  Updating images table...');
  const { data: images, error: imagesError } = await supabase
    .from('images')
    .select('id, path');
  
  if (imagesError) {
    console.error('❌ Failed to fetch images:', imagesError);
  } else {
    for (const image of images) {
      const fileName = image.path.replace('images/', '');
      const newUrl = `${supabaseUrl}/storage/v1/object/public/posts/${fileName}`;
      
      const { error } = await supabase
        .from('images')
        .update({ path: newUrl })
        .eq('id', image.id);
      
      if (error) {
        console.error(`❌ Failed to update image ${image.id}:`, error);
      } else {
        console.log(`✅ Updated image ${image.id}`);
      }
    }
  }

  console.log('\n✨ Image URLs update completed!\n');
}

updateImageUrls().catch(console.error);
