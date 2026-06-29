<script setup lang="ts">
const { data: deposits, refresh } = await useFetch('/api/deposit')
const { data: session } = await useFetch('/api/auth/session')
const user = computed(() => session.value?.user)

const amount = ref(0)
const proof = ref('')
const submitting = ref(false)
const success = ref('')
const error = ref('')

async function submitDeposit() {
  if (amount.value <= 0) { error.value = 'Montant invalide'; return }
  submitting.value = true
  error.value = ''
  success.value = ''
  try {
    await $fetch('/api/deposit/create', {
      method: 'POST',
      body: { amount: amount.value, proof: proof.value },
    })
    success.value = 'Dépôt soumis ! En attente de validation par un modérateur.'
    amount.value = 0
    proof.value = ''
    refresh()
  } catch (e: any) {
    error.value = e.data?.message || 'Erreur lors du dépôt'
  }
  submitting.value = false
}
</script>

<template>
  <div class="p-7 space-y-6">
    <h2 class="text-lg font-semibold tracking-tight">💰 Dépôt Argent</h2>
    <p class="text-sm text-[#767b85]">Dépose ton argent IG pour faire monter la bourse de guilde et ton classement.</p>

    <!-- Formulaire -->
    <div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-lg p-6 max-w-lg">
      <h3 class="text-sm font-semibold mb-4">Nouveau dépôt</h3>
      <div v-if="success" class="text-sm text-[#10b981] bg-[rgba(16,185,129,0.1)] p-3 rounded mb-4">{{ success }}</div>
      <div v-if="error" class="text-sm text-[#f43f5e] bg-[rgba(244,63,94,0.1)] p-3 rounded mb-4">{{ error }}</div>
      <form @submit.prevent="submitDeposit" class="space-y-4">
        <div>
          <label class="text-xs text-[#767b85] font-medium block mb-1.5">Montant (₽)</label>
          <input type="number" v-model.number="amount" min="1"
                 class="w-full px-3.5 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded text-sm text-[#f0f1f3] placeholder-[#5a5e66] outline-none focus:border-[rgba(113,112,255,0.3)] transition-colors"
                 placeholder="Ex: 50000">
        </div>
        <div>
          <label class="text-xs text-[#767b85] font-medium block mb-1.5">Preuve (URL screenshot)</label>
          <input type="url" v-model="proof"
                 class="w-full px-3.5 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded text-sm text-[#f0f1f3] placeholder-[#5a5e66] outline-none focus:border-[rgba(113,112,255,0.3)] transition-colors"
                 placeholder="https://imgur.com/...">
        </div>
        <button type="submit" :disabled="submitting"
                class="px-5 py-2.5 bg-[#7170ff] hover:bg-[#8b8aff] disabled:opacity-50 text-white rounded text-sm font-semibold transition-colors">
          {{ submitting ? 'Soumission...' : 'Soumettre le dépôt' }}
        </button>
      </form>
      <p class="text-xs text-[#5a5e66] mt-3">Un modérateur doit valider ton dépôt avant qu'il soit ajouté à la bourse.</p>
    </div>

    <!-- Historique -->
    <div>
      <h3 class="text-sm font-semibold mb-4">📜 Mon historique</h3>
      <div v-if="deposits?.length" class="space-y-2">
        <div v-for="d in deposits" :key="d.id"
             class="flex items-center gap-4 px-4 py-3 bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded text-sm">
          <span class="font-semibold text-[#b0b5c0]">₽{{ Number(d.amount).toLocaleString('fr-FR') }}</span>
          <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                :class="d.status === 'APPROVED' ? 'bg-[rgba(16,185,129,0.12)] text-[#10b981]' : d.status === 'REJECTED' ? 'bg-[rgba(244,63,94,0.12)] text-[#f43f5e]' : 'bg-[rgba(245,158,11,0.12)] text-[#f59e0b]'">
            {{ d.status === 'APPROVED' ? '✅ Approuvé' : d.status === 'REJECTED' ? '❌ Refusé' : '⏳ En attente' }}
          </span>
          <span class="ml-auto text-xs text-[#5a5e66]">{{ new Date(d.createdAt).toLocaleDateString('fr-FR') }}</span>
        </div>
      </div>
      <p v-else class="text-sm text-[#5a5e66]">Aucun dépôt pour le moment</p>
    </div>
  </div>
</template>
