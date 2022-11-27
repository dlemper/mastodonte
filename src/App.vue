<script setup>
import { ref } from "vue";
import NewToot from "./components/NewToot.vue";
import SearchInput from "./components/SearchInput.vue";
import AvatarProfile from "./components/AvatarProfile.vue";
import NavSidebar from "./components/NavSidebar.vue";
import { PencilIcon as PencilIconOutline } from "@heroicons/vue/24/outline";
import TootDialog from "./components/TootDialog.vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

const tabs = [
  { name: "Home", href: "#", current: true },
  { name: "Local", href: "#", current: false },
  { name: "Federated", href: "#", current: false },
];

const isTootDialogOpen = ref(false);
</script>

<template>
  <div class="min-h-full bg-gray-100">
    <div class="py-4">
      <div
        class="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8"
      >
        <NavSidebar></NavSidebar>

        <main class="lg:col-span-9 xl:col-span-6">
          <div class="px-4 sm:px-0">
            <div class="flex gap-3 justify-between">
              <a
                href="#"
                class="group block flex-shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 lg:hidden"
              >
                <img
                  class="inline-block h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </a>

              <nav
                class="isolate flex divide-x divide-gray-200 rounded-lg shadow grow"
                aria-label="Tabs"
              >
                <a
                  v-for="(tab, tabIdx) in tabs"
                  :key="tab.name"
                  :href="tab.href"
                  :aria-current="tab.current ? 'page' : undefined"
                  :class="[
                    tab.current
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700',
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-2 sm:py-4 px-2 lg:px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
                  ]"
                >
                  <span>{{ tab.name }}</span>
                  <span
                    aria-hidden="true"
                    :class="[
                      tab.current ? 'bg-rose-500' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5',
                    ]"
                  />
                </a>
              </nav>

              <Popover as="template" v-slot="{ open }">
                <PopoverButton
                  class="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 lg:hidden"
                >
                  <span class="sr-only">Open menu</span>
                  <Bars3Icon
                    v-if="!open"
                    class="block h-6 w-6"
                    aria-hidden="true"
                  />
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </Popover>
            </div>
          </div>

          <Suspense>
            <RouterView></RouterView>

            <template #fallback> Loading... </template>
          </Suspense>

          <button
            type="button"
            class="fixed bottom-0 right-0 lg:hidden m-6 inline-flex items-center rounded-full border border-transparent bg-rose-600 p-3 text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            @click="isTootDialogOpen = true"
          >
            <PencilIconOutline class="h-6 w-6" aria-hidden="true" />
          </button>
        </main>

        <aside class="hidden xl:col-span-4 xl:block">
          <div class="sticky top-4 space-y-4">
            <SearchInput></SearchInput>

            <AvatarProfile></AvatarProfile>

            <NewToot></NewToot>
          </div>
        </aside>

        <TootDialog v-model:open="isTootDialogOpen"></TootDialog>
      </div>
    </div>
  </div>
</template>
