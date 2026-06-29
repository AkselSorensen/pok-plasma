<script setup lang="ts">
const { data: session } = await useFetch('/api/auth/session')
const user = computed(() => session.value?.user)

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/' },
  { label: 'Evenements', icon: 'zap', to: '/events' },
  { label: 'Ligue & Profil', icon: 'trophy', to: '/league' },
  { label: 'Membres', icon: 'users', to: '/members' },
  { label: 'Depot Argent', icon: 'dollar', to: '/depot' },
]

const isAdminOrMod = computed(() =>
  user.value?.role === 'ADMIN' || user.value?.role === 'MODERATOR'
)
</script>

<template>
  <div class="flex min-h-screen bg-[#08090a]">
    <!-- Sidebar -->
    <aside class="w-[260px] min-w-[260px] bg-[#0d0e10] border-r border-[rgba(255,255,255,0.04)] flex flex-col">
      <!-- Guild Header -->
      <div class="p-4 border-b border-[rgba(255,255,255,0.04)]">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7170ff] to-[#22d3ee] flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">P</div>
          <div>
            <h3 class="text-sm font-semibold tracking-tight">Team Plasma</h3>
            <span class="text-[11px] text-[#5a5e66] font-medium">Pokoplasma · Nv.42</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-3 space-y-0.5">
        <div v-for="item in navItems" :key="item.to">
          <NuxtLink :to="item.to"
                    class="flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium transition-all duration-150"
                    :class="$route.path === item.to ? 'bg-[rgba(113,112,255,0.12)] text-[#7170ff] border border-[rgba(113,112,255,0.15)]' : 'text-[#5a5e66] hover:text-[#b0b5c0] hover:bg-[rgba(255,255,255,0.02)]'">
            <Icon :name="item.icon" :size="16" class="flex-shrink-0" />
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Admin Panel (mod+ only) -->
        <NuxtLink v-if="isAdminOrMod" to="/admin"
                  class="flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium transition-all duration-150"
                  :class="$route.path === '/admin' ? 'bg-[rgba(113,112,255,0.12)] text-[#7170ff] border border-[rgba(113,112,255,0.15)]' : 'text-[#5a5e66] hover:text-[#b0b5c0] hover:bg-[rgba(255,255,255,0.02)]'">
          <Icon name="settings" :size="16" class="flex-shrink-0" />
          Administration
        </NuxtLink>
      </nav>

      <!-- User Footer -->
      <div class="p-4 border-t border-[rgba(255,255,255,0.04)]">
        <template v-if="user">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#7170ff] to-[#22d3ee] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
              {{ user.username?.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-[#b0b5c0] truncate">{{ user.username }}</div>
              <div class="text-[10px] text-[#5a5e66]">
                {{ user.guildRank || 'Membre' }}
                <span v-if="user.role === 'ADMIN'" class="text-[#f59e0b] ml-1">· Admin</span>
                <span v-else-if="user.role === 'MODERATOR'" class="text-[#22d3ee] ml-1">· Mod</span>
              </div>
            </div>
            <a href="/api/auth/logout" class="text-xs text-[#5a5e66] hover:text-[#f43f5e] transition-colors" title="Deconnexion">
              <Icon name="logout" :size="16" />
            </a>
          </div>
        </template>
        <NuxtLink v-else to="/login" class="flex items-center gap-2 text-xs text-[#7170ff] hover:text-[#8b8aff] transition-colors">
          <Icon name="login" :size="14" />
          Connexion
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
