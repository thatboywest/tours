<script>
    import "../app.css";
    import Navbar from "../lib/components/Navbar.svelte";
    export let data;
  </script>
  <Navbar {data}/>

  <div class="content-container pb-16">
    <slot />
</div>
 

 
  