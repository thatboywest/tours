<script>
  import { onMount } from 'svelte';

  let deals = [];
  let loading = true;
  let error = null;

  // Get all unique categories from actual deals
  $: availableCategories = [...new Set(deals.map(deal => deal.category))];

  // Get count of deals for a specific category
  function getDealsCount(category) {
    return deals.filter(deal => deal.category === category).length;
  }

  // Get a random image from deals of a specific category
  function getCategoryImage(category) {
    const categoryDeals = deals.filter(deal => deal.category === category);
    if (categoryDeals.length === 0) return '/images/default.jpg';
    
    // Get all available images for this category
    const allImages = categoryDeals.flatMap(deal => deal.images || []);
    if (allImages.length === 0) return '/images/default.jpg';
    
    // Return first available image
    return allImages[0];
  }

  onMount(async () => {
    try {
      console.log('Starting to fetch deals...');
      const response = await fetch('/api/deals');
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch deals: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle the case where data might be nested or in a specific property
      let processedDeals;
      if (Array.isArray(data)) {
        processedDeals = data;
      } else if (data && typeof data === 'object') {
        // Look for an array property in the response
        const arrayProperty = Object.values(data).find(value => Array.isArray(value));
        processedDeals = arrayProperty || [];
      } else {
        processedDeals = [];
      }

      // Validate the deals data structure
      deals = processedDeals.filter(deal => 
        deal && 
        typeof deal === 'object' && 
        deal.category && 
        typeof deal.category === 'string'
      );

      console.log('Processed deals:', deals);
      console.log('Available categories:', availableCategories);
      
      if (deals.length === 0) {
        console.warn('No valid deals found in the response');
      }
      
    } catch (e) {
      console.error('Detailed error:', {
        message: e.message,
        stack: e.stack,
        response: e.response
      });
      error = `Failed to load deals: ${e.message}`;
      deals = [];
    } finally {
      loading = false;
    }
  });

  // Predefined category order (for display purposes)
  const categoryOrder = [
    'International',
    'Safari',
    'Beach Holiday',
    'Adventure',
    'Honeymoon & Romantic Getaway',
    'Road Trips'
  ];

  // Filter categories that actually have deals
  $: displayCategories = categoryOrder.filter(category => 
    availableCategories.includes(category)
  );
</script>

<div class="min-h-screen bg-gray-50 py-16">
  <div class="container mx-auto px-4">
    <!-- Header Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        <span class="text-gray-800">Popular</span>
        <span class="text-orange-500">Categories</span>
      </h1>
      <p class="text-gray-600 max-w-3xl mx-auto">
        Explore our curated selection of travel experiences. From thrilling safaris to romantic getaways, 
        discover the perfect journey that matches your travel style.
      </p>
    </div>

    {#if loading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    {:else if error}
      <div class="text-center text-red-600 py-8">{error}</div>
    {:else if displayCategories.length === 0}
      <div class="text-center text-gray-600 py-8">No travel packages available at the moment.</div>
    {:else}
      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Featured Category (First Available Category - Large) -->
        {#if displayCategories[0]}
          <div class="md:col-span-2 lg:col-span-2 relative h-[400px] group overflow-hidden rounded-2xl">
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10"></div>
            <img
              src={getCategoryImage(displayCategories[0])}
              alt={displayCategories[0]}
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-300">
              <h3 class="text-3xl font-bold text-white mb-2">{displayCategories[0]}</h3>
              <p class="text-white/80 mb-4">
                {getDealsCount(displayCategories[0])} {getDealsCount(displayCategories[0]) === 1 ? 'Package' : 'Packages'}
              </p>
              <a 
                href={`/category/${displayCategories[0].toLowerCase().replace(/\s+/g, '-')}`}
                class="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full 
                       hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Explore Packages
              </a>
            </div>
          </div>
        {/if}

        <!-- Other Available Categories -->
        {#each displayCategories.slice(1) as category}
          <div class="relative h-[300px] group overflow-hidden rounded-2xl">
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10"></div>
            <img
              src={getCategoryImage(category)}
              alt={category}
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300">
              <h3 class="text-2xl font-bold text-white mb-2">{category}</h3>
              <p class="text-white/80 mb-4">
                {getDealsCount(category)} {getDealsCount(category) === 1 ? 'Package' : 'Packages'}
              </p>
              <a 
                href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                class="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full 
                       hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Explore Packages
              </a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>