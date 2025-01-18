<script>
    import { onMount } from 'svelte';
    
    let currentImageIndex = 0;
    const images = [
        {
            url: "https://res.cloudinary.com/dhrybaucr/image/upload/v1723112465/cld-sample.jpg",
            title: "African Safari Tours",
            subtitle: "Experience the wild up close",
            position: "center"
        },
        {
            url: "https://res.cloudinary.com/dhrybaucr/image/upload/v1722082402/opxhxlqg0u2iglhnd6m2.jpg",
            title: "Wildlife Photography",
            subtitle: "Capture magnificent moments",
            position: "top"
        },
        {
            url: "https://res.cloudinary.com/dhrybaucr/image/upload/v1722065457/deykaryrgrzpnzw6hyxj.jpg",
            title: "Luxury Camping",
            subtitle: "Comfort in the wilderness",
            position: "center"
        }
    ];

    let autoplayInterval;
    let isPaused = false;

    onMount(() => {
        startAutoplay();
        return () => clearInterval(autoplayInterval);
    });

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (!isPaused) {
                nextImage();
            }
        }, 5000);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    function previousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    }

    function setImage(index) {
        currentImageIndex = index;
    }
</script>

<div 
    class="relative h-screen w-full overflow-hidden group"
    on:mouseenter={() => isPaused = true}
    on:mouseleave={() => isPaused = false}
    role="region"
    aria-label="Image carousel"
>
    <!-- Image slides with modern transitions -->
    {#each images as image, index}
        <div
            class="absolute inset-0 transition-all duration-700 ease-out"
            style="
                opacity: {currentImageIndex === index ? '1' : '0'}; 
                transform: scale({currentImageIndex === index ? '1' : '1.1'});
            "
        >
            <!-- Background image -->
            <div
                class="absolute inset-0 bg-cover bg-center"
                style="background-image: url({image.url}); background-position: {image.position}"
            ></div>
            
            <!-- Modern gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        </div>
    {/each}

    <!-- Modern Content Layout -->
    <div class="absolute inset-0 flex flex-col justify-center items-center text-white px-6 md:px-12">
        <div class="max-w-4xl mx-auto text-center" style="font-family: system-ui, -apple-system, sans-serif;">
            <h1 
                class="text-4xl md:text-7xl font-bold mb-6"
                style="letter-spacing: -0.02em; transform: translateY({currentImageIndex === 0 ? '0' : '20px'}); 
                       opacity: {currentImageIndex === 0 ? '1' : '0'}; transition: all 0.7s ease-out;"
            >
                {images[currentImageIndex].title}
            </h1>
            <p 
                class="text-xl md:text-2xl mb-8 font-light opacity-90"
                style="transform: translateY({currentImageIndex === 0 ? '0' : '20px'}); 
                       opacity: {currentImageIndex === 0 ? '1' : '0'}; transition: all 0.7s ease-out 0.1s;"
            >
                {images[currentImageIndex].subtitle}
            </p>
            <a 
                href="/expeditions" 
                class="inline-flex items-center px-8 py-4 text-lg bg-white text-black rounded-full 
                       transition-all duration-300 hover:bg-opacity-90 hover:scale-105"
            >
                Explore Now
                <svg 
                    class="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
            </a>
        </div>
    </div>

    <!-- Custom Navigation Arrows -->
    <button 
        class="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur 
               hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
        on:click={previousImage}
        aria-label="Previous image"
    >
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
    </button>

    <button 
        class="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur 
               hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
        on:click={nextImage}
        aria-label="Next image"
    >
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
    </button>

    <!-- Modern Progress Indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
        {#each images as _, index}
            <button
                class="h-1 rounded-full transition-all duration-300 {currentImageIndex === index ? 'w-16 bg-white' : 'w-12 bg-white/40 hover:bg-white/60'}"
                on:click={() => setImage(index)}
                aria-label="Go to slide {index + 1}"
            ></button>
        {/each}
    </div>
</div>

<style>
    /* Base transitions */
    .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Modern backdrop blur */
    .backdrop-blur {
        backdrop-filter: blur(8px);
    }

    /* Smooth scale transitions */
    .scale-105 {
        transform: scale(1.05);
    }

    /* Ensure smooth animations */
    .duration-300 {
        transition-duration: 300ms;
    }

    .duration-700 {
        transition-duration: 700ms;
    }

    /* Modern hover effects */
    .group:hover .group-hover\:opacity-100 {
        opacity: 1;
    }

    .group:hover .group-hover\:translate-x-1 {
        transform: translateX(0.25rem);
    }
</style>