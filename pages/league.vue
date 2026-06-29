<script setup lang="ts">
const { data: badges } = await useFetch('/api/badges')
const tab = ref('badges')

const badgeStatusStyles: Record<string, string> = {
  CONQUERED: 'bg-[rgba(16,185,129,0.12)] text-[#10b981]',
  IN_PROGRESS: 'bg-[rgba(245,158,11,0.12)] text-[#f59e0b]',
  LOCKED: 'bg-[rgba(255,255,255,0.04)] text-[#5a5e66]',
}
const badgeStatusLabels: Record<string, string> = {
  CONQUERED: '✅ Conquis',
  IN_PROGRESS: '⚔️ En cours',
  LOCKED: '🔒 Verrouillé',
}
</script>

<template>
  <div class="p-7 space-y-6">
    <h2 class="text-lg font-semibold tracking-tight">🏆 Ligue & Profil</h2>

    <!-- Profile Header -->
    <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-6 flex items-center gap-6">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#7170ff] to-[#22d3ee] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">A</div>
      <div>
        <h3 class="text-lg font-bold tracking-tight">NeoAksel · Neo Plasma</h3>
        <p class="text-xs text-[#767b85]">🏆 Membre d'élite · 6 Badges · Rang Portail B</p>
      </div>
      <div class="ml-auto flex gap-6 text-center">
        <div><div class="text-lg font-bold text-[#f59e0b]">6</div><div class="text-[10px] text-[#5a5e66] uppercase tracking-wide">Badges</div></div>
        <div><div class="text-lg font-bold text-[#7170ff]">B</div><div class="text-[10px] text-[#5a5e66] uppercase tracking-wide">Rang Portail</div></div>
        <div><div class="text-lg font-bold text-[#10b981]">142</div><div class="text-[10px] text-[#5a5e66] uppercase tracking-wide">Victoires</div></div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-1">
      <button v-for="t in [{id:'badges',label:'🎖️ Badges'},{id:'arenas',label:'🏟️ Arènes'},{id:'league',label:'👑 Ligue'},{id:'portals',label:'🌀 Portails'}]"
              :key="t.id" @click="tab = t.id"
              class="flex-1 py-2 text-xs font-medium rounded text-center transition-all"
              :class="tab === t.id ? 'bg-[rgba(113,112,255,0.12)] text-[#7170ff]' : 'text-[#5a5e66] hover:text-[#b0b5c0]'">
        {{ t.label }}
      </button>
    </div>

    <!-- Badges Tab -->
    <div v-if="tab === 'badges'" class="grid grid-cols-4 gap-4">
      <div v-for="b in badges" :key="b.id"
           class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-5 text-center"
           :class="b.userBadges?.[0] ? '' : 'opacity-40'">
        <div class="text-3xl mb-2">{{ b.icon }}</div>
        <h4 class="text-sm font-semibold">{{ b.name }}</h4>
        <p class="text-xs text-[#767b85] mt-1">Maître <strong class="text-[#7170ff]">{{ b.gymLeader }}</strong></p>
        <span v-if="b.userBadges?.[0]"
              class="text-[10px] font-semibold mt-2 px-2 py-0.5 rounded-full inline-block"
              :class="badgeStatusStyles['CONQUERED']">
          {{ badgeStatusLabels['CONQUERED'] }}
        </span>
        <span v-else class="text-[10px] font-semibold mt-2 px-2 py-0.5 rounded-full inline-block bg-[rgba(255,255,255,0.04)] text-[#5a5e66]">
          🔒 Verrouillé
        </span>
      </div>
    </div>

    <!-- Arenas Tab -->
    <div v-if="tab === 'arenas'" class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-6">
      <p class="text-xs text-[#767b85] leading-relaxed mb-4">Les Arènes d'Unys — reproduites à l'identique de Pokémon Noir &amp; Blanc. Labyrinthes, énigmes et parcours qui ont marqué toute une génération. À leur tête, les véritables Maîtres d'Arène d'Unys en personne.</p>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(arena,i) in ['💚 Arène de Maillard (Plante)','💙 Arène de Vrille (Poison)','🩶 Arène de Volucité (Insecte)','⚡ Arène de Riveneuve (Électrik)']" :key="i"
             class="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded-lg p-4 text-sm">
          {{ arena }}
        </div>
      </div>
    </div>

    <!-- League Tab -->
    <div v-if="tab === 'league'" class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-8 text-center">
      <div class="text-5xl mb-4">👑</div>
      <h3 class="text-lg font-bold mb-2">Trône de Champion</h3>
      <p class="text-xs text-[#767b85] max-w-md mx-auto leading-relaxed">Les 8 badges en poche, les portes de la Ligue s'ouvrent. L'élite du serveur s'affronte. <strong class="text-[#f0f1f3]">Le siège est vide. Pour l'instant.</strong></p>
      <div class="flex justify-center gap-2 mt-4">
        <span class="text-[10px] font-semibold px-2 py-1 rounded-full bg-[rgba(245,158,11,0.15)] text-[#f59e0b]">Saison 3</span>
        <span class="text-[10px] font-semibold px-2 py-1 rounded-full bg-[rgba(113,112,255,0.12)] text-[#7170ff]">6/8 Badges</span>
      </div>
    </div>

    <!-- Portals Tab -->
    <div v-if="tab === 'portals'" class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-6">
      <h3 class="text-sm font-semibold mb-2">🌀 Rang de Portails</h3>
      <p class="text-xs text-[#767b85] leading-relaxed mb-4">Le monde vient de se déchirer. Près des QG des factions, l'air se met à tourner. Une spirale. Un grondement... Un Portail. De l'autre côté: les dresseurs d'élite d'une organisation — Magma, Aqua, Rocket. Tu démarres au rang D. Chaque Portail nettoyé te fait grimper, jusqu'au redoutable rang S.</p>
      <div class="flex gap-2 mb-4">
        <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.3)]">D ✅</span>
        <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.3)]">C ✅</span>
        <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-[rgba(113,112,255,0.12)] text-[#7170ff] border border-[rgba(113,112,255,0.3)]">B ◉</span>
        <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-transparent text-[#5a5e66] border border-[rgba(255,255,255,0.07)]">A</span>
        <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-[rgba(244,63,94,0.12)] text-[#f43f5e] border border-[rgba(244,63,94,0.3)]">S</span>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <div class="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded p-3">
          <div class="text-[10px] text-[#5a5e66] uppercase font-semibold">Nettoyés</div>
          <div class="text-lg font-bold mt-1">23</div>
        </div>
        <div class="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded p-3">
          <div class="text-[10px] text-[#5a5e66] uppercase font-semibold">Meilleur Rang</div>
          <div class="text-lg font-bold mt-1 text-[#7170ff]">B</div>
        </div>
        <div class="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded p-3">
          <div class="text-[10px] text-[#5a5e66] uppercase font-semibold">Taux Réussite</div>
          <div class="text-lg font-bold mt-1 text-[#10b981]">78%</div>
        </div>
        <div class="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded p-3">
          <div class="text-[10px] text-[#5a5e66] uppercase font-semibold">Solo/Équipe</div>
          <div class="text-lg font-bold mt-1">14 / 9</div>
        </div>
      </div>
    </div>
  </div>
</template>
