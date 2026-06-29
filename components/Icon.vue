<template>
  <svg class="icon" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- Dashboard -->
    <template v-if="name === 'dashboard'"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></template>
    <!-- Events / Zap -->
    <template v-else-if="name === 'zap'"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></template>
    <!-- Trophy -->
    <template v-else-if="name === 'trophy'"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></template>
    <!-- Users -->
    <template v-else-if="name === 'users'"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></template>
    <!-- Dollar / Deposit -->
    <template v-else-if="name === 'dollar'"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></template>
    <!-- Settings / Admin -->
    <template v-else-if="name === 'settings'"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></template>
    <!-- Logout -->
    <template v-else-if="name === 'logout'"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></template>
    <!-- Login -->
    <template v-else-if="name === 'login'"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></template>
    <!-- Shield / Badge -->
    <template v-else-if="name === 'shield'"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></template>
    <!-- Sword / League -->
    <template v-else-if="name === 'sword'"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></template>
    <!-- Activity -->
    <template v-else-if="name === 'activity'"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></template>
    <!-- Coin / Treasury -->
    <template v-else-if="name === 'coin'"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></template>
    <!-- Star / Level -->
    <template v-else-if="name === 'star'"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></template>
    <!-- MapPin / Location -->
    <template v-else-if="name === 'map-pin'"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></template>
    <!-- Clock -->
    <template v-else-if="name === 'clock'"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></template>
    <!-- Check -->
    <template v-else-if="name === 'check'"><polyline points="20 6 9 17 4 12"/></template>
    <!-- X -->
    <template v-else-if="name === 'x'"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></template>
    <!-- ChevronRight -->
    <template v-else-if="name === 'chevron-right'"><polyline points="9 18 15 12 9 6"/></template>
    <!-- ArrowUp -->
    <template v-else-if="name === 'arrow-up'"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></template>
    <!-- Filter -->
    <template v-else-if="name === 'filter'"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></template>
    <!-- Menu -->
    <template v-else-if="name === 'menu'"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></template>
    <!-- Portal (circle with ring) -->
    <template v-else-if="name === 'portal'"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></template>
    <!-- Crown -->
    <template v-else-if="name === 'crown'"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></template>
    <!-- Guild -->
    <template v-else-if="name === 'guild'"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></template>
    <!-- Discord -->
    <template v-else-if="name === 'discord'"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></template>
    <!-- Eye -->
    <template v-else-if="name === 'eye'"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></template>
    <!-- Trash -->
    <template v-else-if="name === 'trash'"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  size?: number
}>()
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
