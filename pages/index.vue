<script setup lang="ts">
const { data: dashboard } = await useFetch('/api/dashboard')
const { data: session } = await useFetch('/api/auth/session')
const user = computed(() => session.value?.user)
</script>

<template>
  <div class="min-h-screen bg-[#08090a]">
    <header class="flex items-center justify-between px-7 py-4 border-b border-[rgba(255,255,255,0.04)]">
      <div class="flex items-center gap-4">
        <h2 class="text-lg font-semibold tracking-tight">Dashboard</h2>
      </div>
      <div class="flex items-center gap-3">
        <!-- User info si connecté -->
        <template v-if="user">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#7170ff] to-[#22d3ee] flex items-center justify-center text-[10px] font-bold text-white">
              {{ user.username.charAt(0).toUpperCase() }}
            </div>
            <span class="text-sm font-medium text-[#b0b5c0]">{{ user.username }}</span>
            <span v-if="user.guildRank" class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[rgba(113,112,255,0.12)] text-[#7170ff]">
              {{ user.guildRank }}
            </span>
          </div>
          <a href="/api/auth/logout" class="text-xs text-[#f43f5e] hover:text-[#ff6b81] transition-colors ml-2">
            Déconnexion
          </a>
        </template>
        <NuxtLink v-else to="/login" class="text-sm text-[#767b85] hover:text-[#f0f1f3] transition-colors">
          Connexion
        </NuxtLink>
      </div>
    </header>

    <main v-if="dashboard" class="p-7 space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <div class="text-xs font-medium text-[#767b85] uppercase tracking-wide mb-2">💰 Bourse de Guilde</div>
          <div class="text-2xl font-bold tracking-tight text-[#7170ff]">
            ₽ {{ Number(dashboard.guild?.treasury || 0).toLocaleString('fr-FR') }}
          </div>
          <div class="text-xs text-[#10b981] mt-1">↑ +124,800 cette semaine</div>
        </div>
        <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <div class="text-xs font-medium text-[#767b85] uppercase tracking-wide mb-2">⭐ Niveau Guilde</div>
          <div class="text-2xl font-bold tracking-tight text-[#22d3ee]">{{ dashboard.guild?.level || '—' }}</div>
          <div class="text-xs text-[#767b85] mt-1">Prochain palier : 47 · 68%</div>
        </div>
        <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <div class="text-xs font-medium text-[#767b85] uppercase tracking-wide mb-2">👥 Membres</div>
          <div class="text-2xl font-bold tracking-tight text-[#10b981]">{{ dashboard.memberCount }}</div>
          <div class="text-xs text-[#10b981] mt-1">↑ Actifs</div>
        </div>
        <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <div class="text-xs font-medium text-[#767b85] uppercase tracking-wide mb-2">🏅 Classement Global</div>
          <div class="text-2xl font-bold tracking-tight text-[#f59e0b]">#{{ dashboard.guild?.globalRank || '—' }}</div>
          <div class="text-xs text-[#767b85] mt-1">Top 1% · 3ème région</div>
        </div>
      </div>

      <!-- Ranking & Activity -->
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <h3 class="text-sm font-semibold mb-4">🏆 Classement des Membres</h3>
          <div class="space-y-2">
            <div v-for="m in dashboard.topMembers" :key="m.id"
                 class="flex items-center gap-3 px-3 py-2 rounded"
                 :class="user?.id === m.id ? 'bg-[rgba(113,112,255,0.08)] border border-[rgba(113,112,255,0.15)]' : 'bg-[rgba(255,255,255,0.02)]'">
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
        </div>

        <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5">
          <h3 class="text-sm font-semibold mb-4">📡 Activité Récente</h3>
          <div class="space-y-3">
            <div v-for="a in dashboard.recentActivities" :key="a.id"
                 class="flex items-start gap-2.5 text-sm text-[#b0b5c0]">
              <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    :class="a.type === 'event' ? 'bg-[#7170ff]' : a.type === 'raid' ? 'bg-[#f43f5e]' : 'bg-[#22d3ee]'"></span>
              <span class="flex-1">{{ a.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <main v-else class="p-7">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5 animate-pulse">
          <div class="h-3 w-20 bg-[#1c1d22] rounded mb-3"></div>
          <div class="h-7 w-24 bg-[#1c1d22] rounded"></div>
        </div>
      </div>
    </main>
  </div>
</template>
