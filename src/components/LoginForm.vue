<script setup>
import { ref } from "vue";
import { mande, defaults } from "mande";

const instanceUrl = ref("https://mastodon.social");

async function login() {
  const BASE_URL = instanceUrl.value;
  localStorage.setItem("BASE_URL", BASE_URL);
  const appsApi = mande(`${BASE_URL}/api/v1/apps`);
  const client_name = "Mastodonte";
  const redirectUri = `${location.origin}/oauth2/callback`;
  const scopes = "read write follow push";
  const website = location.origin;

  const instanceInfo = await appsApi.post({
    client_name,
    redirect_uris: redirectUri,
    scopes,
    website,
  });

  localStorage.setItem("instanceInfo", JSON.stringify(instanceInfo));

  document.location.href = `${BASE_URL}/oauth/authorize?client_id=${encodeURIComponent(
    instanceInfo.client_id
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scopes=${encodeURIComponent(scopes)}`;
}
</script>

<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-50">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          action="#"
          method="POST"
          @submit.prevent="login()"
        >
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Instance address</label
            >
            <div class="mt-1">
              <input
                id="instance"
                name="instance"
                type="text"
                autocomplete="url"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                v-model="instanceUrl"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
