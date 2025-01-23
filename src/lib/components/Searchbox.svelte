<script>
    import { goto } from '$app/navigation';
    
    let destination = '';
    let category = '';
    let guests = '';
    let dateRange = '';
    let isExpanded = false;
    
    let categories = [
        'International',
        'Safari',
        'Beach Holiday',
        'Adventure',
        'Honeymoon & Romantic Getaway',
        'Road Trips'
    ];

    function handleSearch() {
        const params = new URLSearchParams();
        if (destination) params.set('destination', destination);
        if (category) params.set('category', category);
        if (guests) params.set('guests', guests);
        if (dateRange) params.set('date', dateRange);
        
        goto(`/search?${params.toString()}`);
    }

    function toggleExpand() {
        isExpanded = !isExpanded;
    }
</script>

<div class="w-full max-w-6xl mx-auto px-3 sm:px-4">
    <div class="bg-white/10 backdrop-blur-md rounded-lg">
        <!-- Main Search Container -->
        <div class="p-3 sm:p-4 lg:p-6">
            <!-- Always Visible Search Bar -->
            <div class="flex items-stretch gap-2 sm:gap-3">
                <div class="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Where would you like to go?"
                        bind:value={destination}
                        class="w-full bg-white/10 text-white placeholder-white/70 outline-none p-3 sm:p-4 
                               rounded text-sm sm:text-base lg:text-lg min-h-[48px]"
                    />
                </div>
                
                <button
                    class="shrink-0 px-3 sm:px-4 bg-white text-black hover:bg-white/90 
                           transition-all duration-300 rounded flex items-center justify-center gap-2"
                    on:click={() => {
                        if (window.innerWidth < 640) {
                            toggleExpand();
                        } else {
                            handleSearch();
                        }
                    }}
                >
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <span class="hidden sm:inline">Search</span>
                </button>
            </div>

            <!-- Expandable Options (Mobile) -->
            <div class="sm:hidden">
                {#if isExpanded}
                    <div class="pt-3 space-y-3 border-t border-white/10 mt-3">
                        <select
                            bind:value={category}
                            class="w-full bg-white text-black p-3 rounded text-sm min-h-[48px]"
                        >
                            <option value="">Any Category</option>
                            {#each categories as cat}
                                <option value={cat}>{cat}</option>
                            {/each}
                        </select>
                        
                        {#if category === 'Road Trips'}
                            <div class="grid grid-cols-2 gap-3">
                                <input
                                    type="date"
                                    bind:value={dateRange}
                                    class="w-full bg-white text-black p-3 rounded text-sm min-h-[48px]"
                                />
                                <input
                                    type="number"
                                    min="1"
                                    bind:value={guests}
                                    placeholder="Guests"
                                    class="w-full bg-white text-black p-3 rounded text-sm min-h-[48px]"
                                />
                            </div>
                        {/if}
                        
                        <button
                            class="w-full p-3 bg-white text-black hover:bg-white/90 
                                   transition-all duration-300 rounded flex items-center 
                                   justify-center gap-2 min-h-[48px]"
                            on:click={handleSearch}
                        >
                            <span>Search</span>
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </button>
                    </div>
                {/if}
            </div>

            <!-- Desktop Additional Options -->
            <div class="hidden sm:flex sm:items-center sm:gap-3 sm:mt-3 lg:mt-4">
                <select
                    bind:value={category}
                    class="bg-white text-black p-3 sm:p-4 rounded text-sm sm:text-base lg:text-lg 
                           min-h-[48px] w-40 sm:w-48 lg:w-56"
                >
                    <option value="">Any Category</option>
                    {#each categories as cat}
                        <option value={cat}>{cat}</option>
                    {/each}
                </select>
                
                {#if category === 'Road Trips'}
                    <input
                        type="date"
                        bind:value={dateRange}
                        class="bg-white text-black p-3 sm:p-4 rounded text-sm sm:text-base lg:text-lg 
                               min-h-[48px] w-36 sm:w-40 lg:w-48"
                    />
                    <input
                        type="number"
                        min="1"
                        bind:value={guests}
                        placeholder="Guests"
                        class="bg-white text-black p-3 sm:p-4 rounded text-sm sm:text-base lg:text-lg 
                               min-h-[48px] w-24 sm:w-32 lg:w-36"
                    />
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    /* Improve mobile touch targets */
    input, select, button {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
    }

    /* Custom date input styling */
    input[type="date"]::-webkit-calendar-picker-indicator {
        background-color: white;
        padding: 4px;
        cursor: pointer;
        border-radius: 3px;
    }

    /* Remove number input spinners */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }

    /* Custom scrollbar */
    select {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
    }

    /* Focus states */
    input:focus, select:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: -2px;
    }

    /* Smooth transitions */
    .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
    }
</style>