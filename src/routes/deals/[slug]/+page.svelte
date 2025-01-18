
<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let deal = null;
  let loading = true;
  let error = null;

  // Format functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  onMount(async () => {
    try {
      const slug = $page.params.slug;
      const res = await fetch(`/api/deals/${slug}`);
      if (res.ok) {
        const data = await res.json();
        deal = data.deal;
      } else {
        error = 'Failed to fetch deal details';
      }
    } catch (err) {
      error = 'Error loading deal details';
    } finally {
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 py-8">
  {#if loading}
    <div class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  {:else if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  {:else if deal}
    <!-- Image Gallery -->
    {#if deal.images && deal.images.length > 0}
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={deal.images[0]}
            alt={deal.title}
            class="w-full h-[400px] object-cover rounded-lg"
          />
          <div class="grid grid-cols-2 gap-4">
            {#each deal.images.slice(1, 5) as image, index}
              <img
                src={image}
                alt={`${deal.title} - ${index + 2}`}
                class="w-full h-[190px] object-cover rounded-lg"
              />
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Deal Information -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="md:col-span-2">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start mb-4">
            <h1 class="text-3xl font-bold">{deal.title}</h1>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {deal.category}
            </span>
          </div>

          <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700">{deal.destination}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700">{deal.days} days</span>
            </div>
          </div>

          <div class="prose max-w-none">
            <h2 class="text-xl font-semibold mb-3">Description</h2>
            <p class="text-gray-700 mb-6">{deal.description}</p>
          </div>

          {#if deal.features && deal.features.length > 0}
            <div class="mb-6">
              <h2 class="text-xl font-semibold mb-3">Features</h2>
              <div class="grid grid-cols-2 gap-4">
                {#each deal.features as feature}
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Booking Section -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <div class="text-3xl font-bold text-blue-600 mb-4">
            {formatPrice(deal.price)}
          </div>

          {#if deal.category === 'Road Trips'}
            <div class="mb-4">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Date:</span>
                  <span class="font-medium">{formatDate(deal.date)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Available Seats:</span>
                  <span class="font-medium">{deal.seatsAvailable}</span>
                </div>
              </div>
            </div>
          {/if}

          <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Book Now
          </button>

          <div class="mt-6">
            <h3 class="font-semibold mb-2">Need Help?</h3>
            <p class="text-gray-600 text-sm">
              Contact our support team for assistance with booking or any questions.
            </p>
            <div class="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span class="text-blue-600">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
      Deal not found
    </div>
  {/if}
</div>