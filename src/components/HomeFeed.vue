<script setup>
import { ref } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  ShareIcon,
  StarIcon,
} from '@heroicons/vue/20/solid'
import {mande, defaults } from "mande";

const BASE_URL = 'https://norden.social';
const appsApi = mande(`${BASE_URL}/api/v1/apps`);
const oauthApi = mande(`${BASE_URL}/oauth`);

const timelinesApi = mande(`${BASE_URL}/api/v1/timelines`);

/*const client_name = "Mastodonte";
const redirectUri = `${location.origin}/settings/instances/add`
const scopes = 'read write follow push'
//const website = "";

const instanceInfo = await appsApi.post({
  client_name,
  redirect_uris: redirectUri,
  scopes,
  //website
});
setTimeout(() => {
  document.location.href = `${BASE_URL}/oauth/authorize?client_id=${encodeURIComponent(instanceInfo.client_id)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scopes=${encodeURIComponent(scopes)}`
}, 200);

const { access_token } = await oauthApi.post({
  client_id: instanceInfo.client_id,
  client_secret: instanceInfo.client_secret,
  redirect_uri: redirectUri,
  grant_type: 'authorization_code',
  code: route.params.code
});

defaults.headers.Authorization = `Bearer ${access_token}`;*/

const timeline = ref();
console.log("mande timeline")
timeline.value = await timelinesApi.get("public");
console.log(timeline);
</script>

<template>
  <div class="mt-4">
    <h1 class="sr-only">Recent Toots</h1>

    <ul role="list" class="space-y-4">
      <li v-for="entry in timeline" :key="entry.id" class="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
        <article :aria-labelledby="'entry-title-' + entry.id">
          <div>
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="entry.account.avatar" alt="" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  <a :href="entry.account.url" class="hover:underline">{{ entry.account.display_name }}</a>
                </p>

                <p class="text-sm text-gray-500">
                  <a :href="entry.url" class="hover:underline">
                    <time :datetime="entry.created_at">{{ entry.created_at }}</time>
                  </a>
                </p>
              </div>

              <div class="flex flex-shrink-0 self-center">
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                      <span class="sr-only">Open options</span>
                      <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                  </div>
  
                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a href="#"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm']">
                            <StarIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Add to favorites</span>
                          </a>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <a href="#"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm']">
                            <CodeBracketIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Embed</span>
                          </a>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <a href="#"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm']">
                            <FlagIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Report content</span>
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <!--<h2 :id="'question-title-' + question.id" class="mt-4 text-base font-medium text-gray-900">{{
            question.title }}</h2>-->
          </div>

          <div class="mt-2 space-y-4 text-sm text-gray-700 prose overflow-hidden" v-html="entry.content" />

          <div class="mt-6 flex justify-between space-x-8">
            <div class="flex space-x-6">
              <span class="inline-flex items-center text-sm">
                <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <HandThumbUpIcon class="h-5 w-5" aria-hidden="true" />
                  <span class="font-medium text-gray-900">{{ entry.favourites_count }}</span>
                  <span class="sr-only">likes</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <ChatBubbleLeftEllipsisIcon class="h-5 w-5" aria-hidden="true" />
                  <span class="font-medium text-gray-900">{{ entry.replies_count }}</span>
                  <span class="sr-only">replies</span>
                </button>
              </span>
              <span class="inline-flex items-center text-sm">
                <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <EyeIcon class="h-5 w-5" aria-hidden="true" />
                  <span class="font-medium text-gray-900">{{ entry.reblogs_count }}</span>
                  <span class="sr-only">reblogs</span>
                </button>
              </span>
            </div>
            <div class="flex text-sm">
              <span class="inline-flex items-center text-sm">
                <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <ShareIcon class="h-5 w-5" aria-hidden="true" />
                  <span class="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>