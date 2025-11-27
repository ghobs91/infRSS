#!/usr/bin/env node

/**
 * Test script for the suggest API
 */

const API_URL = 'http://localhost:3000/api/suggest';

async function testSuggest(topic) {
  console.log(`\n🔍 Testing topic: "${topic}"`);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      console.log(`   ❌ Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log(`   ✓ Found ${data.length} feeds`);
    console.log(`   Top 3 feeds:`);
    data.slice(0, 3).forEach((feed, i) => {
      console.log(`     ${i + 1}. ${feed.title} (${feed.score})`);
    });
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
}

async function testGetCategories() {
  console.log(`\n📋 Testing GET endpoint (categories list):`);
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      console.log(`   ❌ Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log(`   ✓ Found ${data.categories.length} categories`);
    console.log(`   ✓ Found ${data.countries.length} countries`);
    console.log(`   Sample categories: ${data.categories.slice(0, 5).map(c => c.name).join(', ')}...`);
    console.log(`   Sample countries: ${data.countries.slice(0, 5).map(c => c.name).join(', ')}...`);
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Testing Suggest API');
  console.log('Make sure your dev server is running on http://localhost:3000\n');

  // Test GET endpoint
  await testGetCategories();

  // Test various topics
  const testTopics = [
    'tech',
    'programming',
    'cooking',
    'travel',
    'sports',
    'gaming',
    'android development',
    'ui design',
    'india',
    'canada',
    'australia',
    'science',
    'random topic that should fallback'
  ];

  for (const topic of testTopics) {
    await testSuggest(topic);
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
  }

  console.log('\n✨ Testing complete!');
}

main().catch(console.error);
