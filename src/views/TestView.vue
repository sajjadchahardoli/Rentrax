<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()

const items = [
  { route: '/test/pricing', label: 'Pricing', icon: 'money' },
  { route: '/test/tax', label: 'Tax Management', icon: 'percentage-circle' },
  { route: '/test/items', label: 'Items', icon: 'box' }
]

const activeTab = ref(route.path)

watch(() => route.path, (newPath) => {
  activeTab.value = newPath
})

const onTabChange = (newRoute) => {
  if (newRoute !== route.path) {
    router.push(newRoute)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justfy-center w-[356px] !bg-athenc-gray p-[6px] rounded-xl">
      <Tabs :value="activeTab" @update:value="onTabChange">
        <TabList
          :pt="{ root: '!bg-red-500', content: '!bg-red-500', tabList: '!bg-athenc-gray !border-none', activeBar: '!w-0 bg-red-500' }">
          <Tab v-for="tab in items" :key="tab.label" :value="tab.route"
            class="!text-sm !p-0 rounded-[6px] !border-none">
            <div class="flex items-center gap-2 px-3 py-2">
              <!-- <img :src="`/icons/${tab.icon}.svg`" /> -->
              <img :src="`/icons/${tab.icon}${activeTab === tab.route ? '-active' : ''}.svg`" />
              <span>{{ tab.label }}</span>
            </div>
          </Tab>
        </TabList>
      </Tabs>
    </div>

    <RouterView />
  </div>
</template>

<style>
.p-tab-active {
  background-color: #3d84e8 !important;
  color: white !important;
}
</style>
