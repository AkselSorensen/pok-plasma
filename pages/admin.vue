<script setup lang="ts">
const { data: session } = await useFetch('/api/auth/session')
const pendingDeposits = ref<any[]>([])
const reviewedDeposits = ref<any[]>([])

const isAdminOrMod = computed(() =>
  session.value?.user?.role === 'ADMIN' || session.value?.user?.role === 'MODERATOR'
)

onMounted(async () => {
  if (!isAdminOrMod.value) return
  const res = await $fetch('/api/deposit/pending')
  pendingDeposits.value = res.pending || []
  reviewedDeposits.value = res.reviewed || []
})

async function review(id: string, action: 'approve' | 'reject') {
  await $fetch('/api/deposit/review', {
    method: 'POST',
    body: { depositId: id, action },
  })
  pendingDeposits.value = pendingDeposits.value.filter(d => d.id !== id)
}
</script>

<template>
  <div class="p-7 space-y-6">
    <div v-if="!isAdminOrMod">
      <p class="text-sm text-[#f43f5e]">Acces reserve aux administrateurs et moderateurs.</p>
    </div>
    <template v-else>
      <h2 class="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Icon name="settings" :size="20" /> Administration
      </h2>

      <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-6">
        <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
          <Icon name="clock" :size="16" class="text-[#f59e0b]" /> Depots en attente
        </h3>
        <div v-if="pendingDeposits.length" class="space-y-2">
          <div v-for="d in pendingDeposits" :key="d.id"
               class="flex items-center gap-4 px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded">
            <div class="flex-1">
              <div class="text-sm font-medium">{{ d.user?.username || 'Inconnu' }}</div>
              <div class="text-xs text-[#f59e0b] font-semibold">₽{{ Number(d.amount).toLocaleString('fr-FR') }}</div>
            </div>
            <a v-if="d.proof" :href="d.proof" target="_blank" class="text-xs text-[#7170ff] hover:underline">Voir preuve</a>
            <div class="flex gap-2">
              <button @click="review(d.id, 'approve')"
                      class="px-3 py-1.5 bg-[rgba(16,185,129,0.12)] text-[#10b981] rounded text-xs font-semibold hover:bg-[rgba(16,185,129,0.2)] flex items-center gap-1"><Icon name="check" :size="12" /> Approuver</button>
              <button @click="review(d.id, 'reject')"
                      class="px-3 py-1.5 bg-[rgba(244,63,94,0.12)] text-[#f43f5e] rounded text-xs font-semibold hover:bg-[rgba(244,63,94,0.2)] flex items-center gap-1"><Icon name="x" :size="12" /> Refuser</button>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-[#5a5e66]">Aucun dépôt en attente</p>
      </div>

      <!-- Commandes admin -->
      <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-6">
        <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
          <Icon name="settings" :size="16" /> Gestion des membres
        </h3>
        <p class="text-xs text-[#767b85]">Les admins peuvent modifier les rôles et rangs des membres.</p>
      </div>
    </template>
  </div>
</template>
