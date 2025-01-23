<script>
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let images = [];
  let features = "";
  let previewUrls = [];
  let category = "";
  let title = "";
  let destination = "";
  let date = "";
  let guests = "";
  let seatsAvailable = "";
  let days = "";
  let price = "";
  let description = "";
  let isLoading = writable(false);
  let isSubmitting = writable(false);
  let notification = writable("");

  let categories = [
    "International",
    "Safari",
    "Beach Holiday",
    "Adventure",
    "Honeymoon & Romantic Getaway",
    "Road Trips",
  ];

  function handleImageChange(event) {
    const files = Array.from(event.target.files);
    images = [...images, ...files];

    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      previewUrls = [...previewUrls, url];
    });
  }

  function removeImage(index) {
    URL.revokeObjectURL(previewUrls[index]);
    images = images.filter((_, i) => i !== index);
    previewUrls = previewUrls.filter((_, i) => i !== index);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    isLoading.set(true);
    isSubmitting.set(true);
    notification.set("");

    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/deals", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        notification.set("Deal created successfully");
        clearInputs();
      } else {
        const errorData = await response.json();
        notification.set(`Error: ${errorData.error}`);
      }
    } catch (error) {
      notification.set(`Error: ${error.message}`);
    } finally {
      isLoading.set(false);
      isSubmitting.set(false);
    }
  }

  function clearInputs() {
    title = "";
    destination = "";
    date = "";
    guests = "";
    seatsAvailable = "";
    days = "";
    price = "";
    description = "";
    features = "";
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    images = [];
    previewUrls = [];
    category = "";
  }
</script>

<div class="min-h-screen bg-white p-6 md:p-12">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-black mb-8">Create New Travel Deal</h1>

    {#if $isLoading}
      <div class="loader">Loading...</div>
    {/if}

    {#if $notification}
      <div class="notification">{$notification}</div>
    {/if}

    <form
      on:submit={handleSubmit}
      enctype="multipart/form-data"
      class="space-y-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="col-span-2">
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Deal Title</label>
          <input
            type="text"
            name="title"
            id="title"
            bind:value={title}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            for="destination"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Destination</label>
          <input
            type="text"
            name="destination"
            id="destination"
            bind:value={destination}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            for="category"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Category</label>
          <select
            name="category"
            id="category"
            bind:value={category}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {#each categories as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </select>
        </div>

        {#if category === "Road Trips"}
          <div>
            <label
              for="date"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Travel Date</label>
            <input
              type="date"
              name="date"
              id="date"
              bind:value={date}
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              for="guests"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Number of Guests</label>
            <input
              type="number"
              name="guests"
              id="guests"
              bind:value={guests}
              min="1"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              for="seatsAvailable"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Number of Seats Available</label>
            <input
              type="number"
              name="seatsAvailable"
              id="seatsAvailable"
              bind:value={seatsAvailable}
              min="1"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        {/if}

        <div>
          <label
            for="days"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Duration (Days)</label>
          <input
            type="number"
            name="days"
            id="days"
            bind:value={days}
            min="1"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            for="price"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Price</label>
          <input
            type="number"
            name="price"
            id="price"
            bind:value={price}
            min="0"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div class="col-span-2">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Description</label>
          <textarea
            name="description"
            id="description"
            bind:value={description}
            rows="4"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          ></textarea>
        </div>

        <div class="col-span-2">
          <label
            for="features"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Features (comma-separated)</label>
          <input
            type="text"
            name="features"
            id="features"
            bind:value={features}
            placeholder="WiFi, Pool, Breakfast included"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div class="col-span-2">
          <label
            for="images"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Images</label>
          <div
            class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors"
          >
            <div class="space-y-2 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="images"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
                >
                  <span>Upload images</span>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    class="sr-only"
                    on:change={handleImageChange}
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {#if previewUrls.length > 0}
            <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {#each previewUrls as url, i}
                <div class="relative">
                  <img
                    src={url}
                    alt="Preview"
                    class="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    on:click={() => removeImage(i)}
                    aria-label="Remove image"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <div class="flex justify-end mt-8">
        <button
          type="submit"
          disabled={$isSubmitting}
          class="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg transition-colors relative disabled:opacity-70 disabled:cursor-not-allowed hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {#if $isSubmitting}
            <span class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          {:else}
            Create Deal
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>