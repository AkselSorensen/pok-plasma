<script setup lang="ts">
const { data } = await useFetch('/api/leaderboard')
</script>

<template>
  <div class="p-7 space-y-6">
    <h2 class="text-lg font-semibold tracking-tight">👥 Membres</h2>
    <p class="text-sm text-[#767b85]">{{ data?.total || 0 }} membres dans la guilde</p>

    <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
      <div v-for="m in data?.users" :key="m.id"
           class="flex items-center gap-4 px-5 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
        <span class="w-6 text-sm font-bold text-center"
              :class="m.rank === 1 ? 'text-[#f59e0b]' : m.rank === 2 ? 'text-gray-400' : m.rank === 3 ? 'text-[#d97706]' : 'text-[#5a5e66]'">
          {{ m.rank }}
        </span>
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#7170ff] to-[#22d3ee] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {{ m.username.charAt(0) }}
        </div>
        <div class="flex-1">
          <div class="text-sm font-medium">{{ m.username }}</div>
          <div class="text-[11px] text-[#5a5e66]">{{ m.guildRank || 'Membre' }} · Rang {{ m.portalRank }} · {{ m.badgeCount }}/8 Badges</div>
        </div>
        <span class="text-xs text-[#b0b5c0] font-semibold">{{ m.totalPoints.toLocaleString('fr-FR') }} pts</span>
        <span v-if="m.portalRank === 'S'" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(244,63,94,0.12)] text-[#f43f5e]">S</span>
      </div>
    </div>
  </div>
</template>
