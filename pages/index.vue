<script setup lang="ts">
const dashboard = ref<{
  guild?: { level: number; treasury: number; globalRank: number }
  memberCount: number
  activeEvents: number
  topMembers: Array<{ id: string; username: string; guildRank: string | null; totalPoints: number; rank: number }>
  recentActivities: Array<{ id: string; type: string; message: string }>
} | null>(null)

const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await $fetch('/api/dashboard')
    dashboard.value = res as any
  } catch (e: any) {
    console.error('API error:', e)
    error.value = 'Impossible de charger les données'
  } finally {
    loading.value = false
  }
})

// Fallback data for instant render
const fallbackStats = [
  { label: '💰 Bourse de Guilde', value: '₽ 1,842,500', accent: '#7170ff', change: '↑ +124,800', up: true },
  { label: '⭐ Niveau Guilde', value: '42', accent: '#22d3ee', sub: 'Prochain palier : 47 · 68%' },
  { label: '👥 Membres', value: '128', accent: '#10b981', change: '↑ +12 ce mois', up: true },
  { label: '🏅 Classement Global', value: '#3', accent: '#f59e0b', sub: 'Top 1% · 3ème région' },
]
</script>

<template>
  <div class="min-h-screen bg-[#08090a]">
    <header class="flex items-center justify-between px-7 py-4 border-b border-[rgba(255,255,255,0.04)]">
      <h2 class="text-lg font-semibold tracking-tight">Dashboard</h2>
      <div class="flex items-center gap-3">
        <NuxtLink to="/login" class="text-sm text-[#767b85] hover:text-[#f0f1f3] transition-colors">Connexion</NuxtLink>
      </div>
    </header>

    <main class="p-7 space-y-6">
      <!-- Stats Grid -->
      <div class="grid grid-cols-4 gap-4">
        <div v-for="stat in fallbackStats" :key="stat.label"
             class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <div class="text-xs font-medium text-[#767b85] uppercase tracking-wide mb-2">{{ stat.label }}</div>
          <div class="text-2xl font-bold tracking-tight" :style="{ color: stat.accent }">{{ stat.value }}</div>
          <div v-if="stat.change" class="text-xs mt-1" :class="stat.up ? 'text-[#10b981]' : 'text-[#f43f5e]'">{{ stat.change }}</div>
          <div v-if="stat.sub" class="text-xs text-[#767b85] mt-1">{{ stat.sub }}</div>
        </div>
      </div>

      <!-- Loading / Error -->
      <div v-if="loading" class="text-sm text-[#767b85] text-center py-4">Chargement...</div>
      <div v-else-if="error" class="text-sm text-[#f43f5e] text-center py-4">{{ error }}</div>

      <!-- Ranking & Activity -->
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <h3 class="text-sm font-semibold mb-4">🏆 Classement des Membres</h3>
          <div v-if="dashboard?.topMembers?.length" class="space-y-2">
            <div v-for="m in dashboard.topMembers" :key="m.id"
                 class="flex items-center gap-3 px-3 py-2 rounded bg-[rgba(255,255,255,0.02)]">
              <span class="w-6 text-sm font-bold text-center"
                    :class="m.rank === 1 ? 'text-[#f59e0b]' : m.rank === 2 ? 'text-gray-400' : m.rank === 3 ? 'text-[#d97706]' : 'text-[#5a5e66]'">{{ m.rank }}</span>
              <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#7170ff] to-[#22d3ee] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                {{ m.username.charAt(0) }}
              </div>
              <span class="text-sm font-medium flex-1">{{ m.username }}</span>
              <span v-if="m.guildRank"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    :class="m.guildRank === 'Champion' ? 'bg-[rgba(245,158,11,0.15)] text-[#f59e0b]' : 'bg-[rgba(113,112,255,0.12)] text-[#7170ff]'">
                {{ m.guildRank }}
              </span>
              <span class="text-xs font-semibold text-[#b0b5c0]">{{ m.totalPoints.toLocaleString('fr-FR') }} pts</span>
            </div>
          </div>
          <div v-else class="text-sm text-[#767b85] py-8 text-center">
            <p v-if="loading">Chargement...</p>
            <p v-else>Aucun membre pour le moment</p>
          </div>
        </div>

        <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <h3 class="text-sm font-semibold mb-4">📡 Activité Récente</h3>
          <div v-if="dashboard?.recentActivities?.length" class="space-y-3">
            <div v-for="a in dashboard.recentActivities" :key="a.id"
                 class="flex items-start gap-2.5 text-sm text-[#b0b5c0]">
              <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    :class="a.type === 'event' ? 'bg-[#7170ff]' : a.type === 'raid' ? 'bg-[#f43f5e]' : 'bg-[#22d3ee]'"></span>
              <span class="flex-1">{{ a.message }}</span>
            </div>
          </div>
          <div v-else class="text-sm text-[#767b85] py-8 text-center">
            <p v-if="loading">Chargement...</p>
            <p v-else>Aucune activité récente</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
