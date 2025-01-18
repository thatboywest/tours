<script>
    import { page } from '$app/stores';
    export let data;
    
    let logo = "SafariQuest";
    const { session } = data;
    const user = session?.user;
    
    $: path = $page.url.pathname;
    
    let isProfileMenuOpen = false;
    
    function toggleProfileMenu() {
        isProfileMenuOpen = !isProfileMenuOpen;
    }
    
    function closeProfileMenu() {
        isProfileMenuOpen = false;
    }
</script>

<nav class="bg-gradient-to-b from-blue-50 to-sky-50 border-b-2 border-blue-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main Navigation -->
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <a href="/" class="flex items-center space-x-3">
                    <span class="text-2xl font-bold text-blue-800 font-serif">{logo}</span>
                    <img src="/safari-logo.svg" alt="Safari" class="h-8 w-8" />
                </a>
            </div>
            
            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center space-x-4">
                <a
                    href="/"
                    class="flex items-center px-4 py-2 rounded-full text-blue-700 hover:bg-blue-100 transition-colors duration-200 {path === '/' ? 'bg-blue-100' : ''}"
                >
                    <span class="text-lg font-medium">Base Camp</span>
                </a>
                
                <a
                    href="/expeditions"
                    class="flex items-center px-4 py-2 rounded-full text-blue-700 hover:bg-blue-100 transition-colors duration-200 {path === '/expeditions' ? 'bg-blue-100' : ''}"
                >
                    <span class="text-lg font-medium">Expeditions</span>
                </a>
                
                <a
                    href="/wildlife"
                    class="flex items-center px-4 py-2 rounded-full text-blue-700 hover:bg-blue-100 transition-colors duration-200 {path === '/wildlife' ? 'bg-blue-100' : ''}"
                >
                    <span class="text-lg font-medium">Wildlife</span>
                </a>
                
                <!-- Profile Menu -->
                <div class="relative ml-4">
                    <button
                        on:click={toggleProfileMenu}
                        class="flex items-center p-2 rounded-full text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                    >
                        {#if user?.image}
                            <img src={user.image} alt="Profile" class="w-8 h-8 rounded-full border-2 border-blue-300" />
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        {/if}
                    </button>
                    
                    {#if isProfileMenuOpen}
                        <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-blue-200 overflow-hidden">
                            {#if user}
                                <a href="/profile" class="block px-4 py-2 text-blue-700 hover:bg-blue-50">Profile</a>
                                <form action="/auth/signout" method="POST">
                                    <button type="submit" class="w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-50">
                                        Sign out
                                    </button>
                                </form>
                            {:else}
                                <a href="/auth/signin" class="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                                    Sign in
                                </a>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-b from-blue-50 to-sky-50 border-t-2 border-blue-200">
        <div class="grid grid-cols-4 h-16">
            <a 
                href="/" 
                class="flex flex-col items-center justify-center text-blue-700 hover:bg-blue-100 {path === '/' ? 'bg-blue-100' : ''} rounded-t-3xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class="text-xs font-medium">Base</span>
            </a>
            
            <a 
                href="/expeditions" 
                class="flex flex-col items-center justify-center text-blue-700 hover:bg-blue-100 {path === '/expeditions' ? 'bg-blue-100' : ''} rounded-t-3xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span class="text-xs font-medium">Expeditions</span>
            </a>
            
            <a 
                href="/wildlife" 
                class="flex flex-col items-center justify-center text-blue-700 hover:bg-blue-100 {path === '/wildlife' ? 'bg-blue-100' : ''} rounded-t-3xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-xs font-medium">Wildlife</span>
            </a>
            
            <button
                on:click={toggleProfileMenu}
                class="flex flex-col items-center justify-center text-blue-700 hover:bg-blue-100 rounded-t-3xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-xs font-medium">Profile</span>
            </button>
        </div>
        
        {#if isProfileMenuOpen}
            <div class="absolute bottom-16 right-0 w-48 bg-white rounded-lg shadow-lg border-2 border-blue-200 overflow-hidden">
                {#if user}
                    <a href="/profile" class="block px-4 py-2 text-blue-700 hover:bg-blue-50">Profile</a>
                    <form action="/auth/signout" method="POST">
                        <button type="submit" class="w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-50">
                            Sign out
                        </button>
                    </form>
                {:else}
                    <a href="/auth/signin" class="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                        Sign in
                    </a>
                {/if}
            </div>
        {/if}
    </div>
</nav>

{#if isProfileMenuOpen}
    <div class="fixed inset-0 z-40" on:click={closeProfileMenu}></div>
{/if}