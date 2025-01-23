?<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    let deals = [];
    let loading = true;
    let error = null;
    
    // Function to filter deals based on search params
    function filterDeals(deals, searchParams) {
        return deals.filter(deal => {
            // Check destination
            if (searchParams.get('destination') && 
                !deal.destination.toLowerCase().includes(searchParams.get('destination').toLowerCase())) {
                return false;
            }

            // Check category
            if (searchParams.get('category') && 
                deal.category !== searchParams.get('category')) {
                return false;
            }

            // For Road Trips category, check additional filters
            if (deal.category === 'Road Trips') {
                // Check guests
                if (searchParams.get('guests')) {
                    const requestedGuests = parseInt(searchParams.get('guests'));
                    if (!deal.seatsAvailable || deal.seatsAvailable < requestedGuests) {
                        return false;
                    }
                }

                // Check date
                if (searchParams.get('date')) {
                    const searchDate = new Date(searchParams.get('date')).toDateString();
                    const dealDate = deal.date ? new Date(deal.date).toDateString() : null;
                    if (!dealDate || dealDate !== searchDate) {
                        return false;
                    }
                }
            }

            return true;
        });
    }

    // Subscribe to URL changes and fetch/filter deals
    $: {
        if ($page) {
            onMount(async () => {
                try {
                    loading = true;
                    const res = await fetch('/api/deals'); 
                    if (res.ok) {
                        const data = await res.json();
                        // Filter deals based on search parameters
                        deals = filterDeals(data.deals, $page.url.searchParams);
                        console.log('Filtered deals:', deals);
                    } else {
                        console.error('Failed to fetch deals:', res.statusText);
                        const errorData = await res.text();
                        console.error('Error response:', errorData);
                        error = 'Failed to load deals';
                    }
                } catch (error) {
                    console.error('Error fetching deals:', error);
                    error = 'Error loading deals';
                } finally {
                    loading = false;
                }
            });
        }
    }
  
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
</script>
  
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">
        {#if $page.url.searchParams.toString()}
            Search Results
        {:else}
            Available Deals
        {/if}
    </h1>
  
    {#if loading}
        <div class="flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
        </div>
    {:else if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
        </div>
    {:else if deals.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each deals as deal (deal._id)}
                <!-- Rest of your existing card code remains exactly the same -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <!-- Image -->
                    {#if deal.images && deal.images.length > 0}
                        <img
                            src={deal.images[0]}
                            alt={deal.title}
                            class="w-full h-48 object-cover"
                        />
                    {/if}
                    
                    <!-- Content -->
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h2 class="text-xl font-semibold">{deal.title}</h2>
                            <span class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                {deal.category}
                            </span>
                        </div>
                        
                        <p class="text-gray-600 mb-4 line-clamp-2">{deal.description}</p>
                        
                        <div class="flex items-center gap-4 mb-4">
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
                        
                        {#if deal.category === 'Road Trips'}
                            <div class="mb-4">
                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                    <span>Date: {formatDate(deal.date)}</span>
                                    <span>•</span>
                                    <span>Seats: {deal.seatsAvailable}</span>
                                </div>
                            </div>
                        {/if}
                        
                        {#if deal.features && deal.features.length > 0}
                            <div class="flex flex-wrap gap-2 mb-4">
                                {#each deal.features as feature}
                                    <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                        {feature}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                        
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-2xl font-bold text-blue-600">
                                {formatPrice(deal.price)}
                            </span>
                            <a
                                href={`/deals/${deal.slug}`}
                                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                View Details
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="text-center py-8">
            <h2 class="text-2xl font-semibold mb-2">No matching deals found</h2>
            <p class="text-gray-600">Try adjusting your search criteria</p>
        </div>
    {/if}
</div>