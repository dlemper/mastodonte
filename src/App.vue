<script setup>
import NewToot from './components/NewToot.vue';
import SearchInput from "./components/SearchInput.vue"
import AvatarProfile from "./components/AvatarProfile.vue"
import NavSidebar from "./components/NavSidebar.vue"
import HomeFeed from "./components/HomeFeed.vue"

const tabs = [
  { name: 'Home', href: '#', current: true },
  { name: 'Local', href: '#', current: false },
  { name: 'Federated', href: '#', current: false },
]
</script>

<template>
  <div class="min-h-full bg-gray-100">
  
    <div class="py-10">
      <div class="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <NavSidebar></NavSidebar>
        
        <main class="lg:col-span-9 xl:col-span-6">
          <div class="px-4 sm:px-0">
            <div class="sm:hidden">
              <label for="question-tabs" class="sr-only">Select a tab</label>
              <select id="question-tabs"
                class="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500">
                <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
              </select>
            </div>
            <div class="hidden sm:block">
              <nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                <a v-for="(tab, tabIdx) in tabs" :key="tab.name" :href="tab.href"
                  :aria-current="tab.current ? 'page' : undefined"
                  :class="[tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10']">
                  <span>{{ tab.name }}</span>
                  <span aria-hidden="true"
                    :class="[tab.current ? 'bg-rose-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
                </a>
              </nav>
            </div>
          </div>

          <Suspense>
            <HomeFeed></HomeFeed>

            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </main>

        <aside class="hidden xl:col-span-4 xl:block">
          <div class="sticky top-4 space-y-4">
            <SearchInput></SearchInput>

            <AvatarProfile></AvatarProfile>

            <NewToot></NewToot>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
