<script setup lang="ts">
const { data: events } = await useFetch('/api/events')
</script>

<template>
  <div class="p-7">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold tracking-tight">Événements</h2>
      <span class="text-xs text-[#5a5e66]">Saison 3 · Plasma Cup</span>
    </div>
    <p class="text-sm text-[#767b85] mb-6">Événements actifs et à venir sur le serveur</p>

    <div class="grid grid-cols-2 gap-4">
      <div v-for="e in events" :key="e.id"
           class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5 hover:border-[rgba(255,255,255,0.12)] transition-all hover:-translate-y-0.5 cursor-pointer">
        <div class="text-[10px] font-bold uppercase tracking-widest mb-2"
             :class="e.type === 'AIRDROP' ? 'text-[#22d3ee]' : e.type === 'RECOLTE' ? 'text-[#10b981]' : e.type === 'FISHING' ? 'text-[#60a5fa]' : e.type === 'TEAMHUNT' ? 'text-[#f43f5e]' : 'text-[#f59e0b]'">
          {{ e.type === 'AIRDROP' ? '🪂 Airdrop' : e.type === 'RECOLTE' ? '🌾 Récolte' : e.type === 'FISHING' ? '🎣 Fishing' : e.type === 'TEAMHUNT' ? '⚔️ TeamHunt' : '🔥 MegaRaid' }}
        </div>
        <h4 class="text-sm font-semibold tracking-tight mb-2">{{ e.title }}</h4>
        <p class="text-xs text-[#767b85] leading-relaxed mb-3">{{ e.description }}</p>
        <div class="flex items-center gap-4 text-[11px] text-[#5a5e66]">
          <span v-if="e.location">📍 {{ e.location }}</span>
          <span>⏱ {{ e.status === 'ACTIVE' ? 'En cours' : e.status === 'UPCOMING' ? 'À venir' : 'Terminé' }}</span>
          <span class="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                :class="e.status === 'ACTIVE' ? 'bg-[rgba(16,185,129,0.12)] text-[#10b981]' : e.status === 'UPCOMING' ? 'bg-[rgba(113,112,255,0.12)] text-[#7170ff]' : 'bg-[rgba(244,63,94,0.12)] text-[#f43f5e]'">
            {{ e.status === 'ACTIVE' ? '● En cours' : e.status === 'UPCOMING' ? 'À venir' : 'Terminé' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
