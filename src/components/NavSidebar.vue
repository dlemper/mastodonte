<script setup>
import {
  AtSymbolIcon,
  BellIcon,
  BookmarkIcon,
  CogIcon,
  HashtagIcon,
  HomeIcon,
  ListBulletIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Explore', href: '#', icon: HashtagIcon, current: false },
  { name: 'Conversations', href: '#', icon: AtSymbolIcon, current: false },
  { name: 'Favorites', href: '#', icon: StarIcon, current: false },
  { name: 'Bookmarks', href: '#', icon: BookmarkIcon, current: false },
  { name: 'Lists', href: '#', icon: ListBulletIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
  { name: 'Relationships', href: '#', icon: UserGroupIcon, current: false },
]

const communities = [
  { name: 'Movies', href: '#' },
  { name: 'Food', href: '#' },
  { name: 'Sports', href: '#' },
  { name: 'Animals', href: '#' },
  { name: 'Science', href: '#' },
  { name: 'Dinosaurs', href: '#' },
  { name: 'Talents', href: '#' },
  { name: 'Gaming', href: '#' },
]
</script>

<template>
  <div class="hidden lg:col-span-3 lg:block xl:col-span-2">
    <nav aria-label="Sidebar" class="sticky top-4 divide-y divide-gray-300">
      <div class="space-y-1 pb-8">
        <a v-for="item in navigation" :key="item.name" :href="item.href"
          :class="[item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50', 'group flex items-center px-3 py-2 text-sm font-medium rounded-md']"
          :aria-current="item.current ? 'page' : undefined">
          <component :is="item.icon"
            :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']"
            aria-hidden="true" />
          <span class="truncate">{{ item.name }}</span>
        </a>
      </div>
      <div class="pt-10">
        <p class="px-3 text-sm font-medium text-gray-500" id="communities-headline">Trends</p>
        <div class="mt-3 space-y-2" aria-labelledby="communities-headline">
          <a v-for="community in communities" :key="community.name" :href="community.href"
            class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
            <span class="truncate">{{ community.name }}</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>