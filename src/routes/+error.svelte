<!-- src/routes/+error.svelte -->
<script>
    import { page } from '$app/stores';
    
    $: statusCode = $page.status;
    $: errorMessage = $page.error?.message || getDefaultMessage(statusCode);
    
    function getDefaultMessage(status) {
        switch (status) {
            case 404:
                return "We can't seem to find the page you're looking for";
            case 500:
                return "Something went wrong on our end";
            default:
                return "An unexpected error occurred";
        }
    }

    function goBack() {
        window.history.back();
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="text-center">
        <!-- Safari Image -->
        <div class="relative w-64 h-64 mx-auto mb-8">
            {#if statusCode === 404}
                <!-- Lost Safari Jeep illustration -->
                <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M7,14l5-5l5,5" class="text-black animate-bounce"/>
                    <path d="M3,18h18" class="text-gray-400"/>
                    <rect x="5" y="3" width="14" height="14" rx="2" class="text-gray-300"/>
                </svg>
            {:else}
                <!-- Technical Difficulty Safari Sign -->
                <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12,9v2m0,4h.01" class="text-black"/>
                    <path d="M5,8h14" class="text-gray-400"/>
                    <circle cx="12" cy="12" r="9" class="text-gray-300"/>
                </svg>
            {/if}
        </div>

        <!-- Error Status -->
        <h1 class="text-9xl font-bold text-black mb-4">
            {statusCode}
        </h1>

        <!-- Error Message -->
        <p class="text-xl text-gray-600 mb-8">
            {errorMessage}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                on:click={goBack}
                class="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 
                       transition-colors duration-300 flex items-center justify-center"
            >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Go Back
            </button>

            <a 
                href="/"
                class="px-8 py-3 bg-white text-black border-2 border-black rounded-full
                       hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Return Home
            </a>
        </div>

        <!-- Additional Help Text -->
        <p class="mt-12 text-gray-500">
            Need help? <a href="/contact" class="text-black underline hover:no-underline">Contact our support team</a>
        </p>
    </div>
</div>

<style>
    /* Smooth animation for the SVG elements */
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-25%);
        }
    }

    .animate-bounce {
        animation: bounce 2s infinite;
    }

    /* Ensure buttons have consistent height */
    button, a {
        min-height: 48px;
    }

    /* Gradient background variation - uncomment if you want a gradient background instead of solid
    .bg-gradient {
        background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);
    }
    */
</style>