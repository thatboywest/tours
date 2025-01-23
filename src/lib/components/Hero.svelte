<script>
    import { onMount } from 'svelte';
    import Searchbox from './Searchbox.svelte';
    
    const heroImage = {
        url: "https://res.cloudinary.com/dhrybaucr/image/upload/v1723112465/cld-sample.jpg",
        title: "Discover Wilderness",
        subtitle: "Your journey into the extraordinary begins here"
    };
    
    let isZoomed = false;
    
    onMount(() => {
        setTimeout(() => {
            isZoomed = true;
        }, 100);
    });
</script>

<div
    class="relative min-h-[100svh] w-full overflow-hidden"
    role="region"
    aria-label="Hero section"
>
    <!-- Background Image with Zoom Effect -->
    <div
        class="absolute inset-0 transition-transform duration-[20s] ease-out"
        style="transform: scale({isZoomed ? '1.1' : '1'})"
    >
        <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style="background-image: url({heroImage.url})"
        />
        <div 
            class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"
        />
    </div>
    
    <!-- Content Container -->
    <div class="relative min-h-[100svh] flex flex-col justify-center items-center text-white px-4 md:px-6">
        <div class="w-full max-w-[90%] md:max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <!-- Hero Text -->
            <h1
                class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight"
                style="font-family: system-ui, -apple-system, sans-serif;"
            >
                {heroImage.title}
            </h1>
            
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl font-light opacity-90 max-w-lg md:max-w-2xl mx-auto leading-relaxed">
                {heroImage.subtitle}
            </p>
            
            <!-- Search Component -->
            <div class="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-6 md:mt-8">
                <Searchbox />
            </div>
            
            <!-- CTA Button -->
            <div class="mt-8 md:mt-10">
                <a
                    href="/explore"
                    class="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-4 
                           text-base md:text-lg bg-white/10 backdrop-blur-sm text-white 
                           border border-white/20 rounded-full transition-all duration-300 
                           hover:bg-white/20 hover:scale-105 active:scale-95
                           touch-manipulation"
                >
                    <span>Begin Experience</span>
                    <svg
                        class="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    /* Transitions */
    .transition-transform {
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Glass Effect */
    .backdrop-blur-sm {
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    }

    /* Prevent text selection on button */
    .touch-manipulation {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
    }

    /* Optimize performance */
    .bg-cover {
        will-change: transform;
    }

    @media (max-width: 640px) {
        /* Improve touch targets on mobile */
        a {
            min-height: 44px;
        }
    }
</style>