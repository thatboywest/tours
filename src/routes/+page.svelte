

<script>
    import Hero from "$lib/components/Hero.svelte";
    import Deals from "$lib/components/Deals.svelte";
    export let deals = [];
</script>

<Hero />
<Deals {deals} />
