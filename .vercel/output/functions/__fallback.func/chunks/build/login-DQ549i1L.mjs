import { _ as __nuxt_component_0 } from './nuxt-link-BJETLUGv.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRuntimeConfig } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const discordAuthUrl = computed(() => {
      const clientId = useRuntimeConfig().public.discordClientId;
      if (!clientId) return "#";
      const redirect = encodeURIComponent(`${(void 0).location.origin}/api/auth/callback`);
      return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=identify`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#07080a] flex items-center justify-center relative overflow-hidden" }, _attrs))}><div class="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none" style="${ssrRenderStyle({ "background": "radial-gradient(ellipse at 30% 40%, rgba(113,112,255,0.06) 0%, transparent 60%),\n                        radial-gradient(ellipse at 70% 60%, rgba(34,211,238,0.04) 0%, transparent 50%)" })}"></div><div class="relative z-10 w-full max-w-sm mx-4"><div class="text-center mb-8"><div class="flex items-center justify-center gap-3 mb-2"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7170ff] to-[#22d3ee] flex items-center justify-center text-white font-extrabold text-lg">P</div><span class="text-xl font-semibold tracking-tight">Pok\xE9Plasma</span></div><h1 class="text-2xl font-bold tracking-tight mt-6">Connexion Guilde</h1><p class="text-sm text-[#767b85] mt-2">Connecte-toi pour acc\xE9der au tableau de bord</p></div><div class="bg-[#141518] border border-[rgba(255,255,255,0.07)] rounded-xl p-8 shadow-xl"><a${ssrRenderAttr("href", unref(discordAuthUrl))} class="flex items-center justify-center gap-2.5 w-full py-3.5 px-5 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"></path></svg> Connexion avec Discord </a><div class="flex items-center gap-3 my-5"><div class="flex-1 h-px bg-[rgba(255,255,255,0.04)]"></div><span class="text-xs font-medium text-[#5a5e66]">ou</span><div class="flex-1 h-px bg-[rgba(255,255,255,0.04)]"></div></div><form class="space-y-3"><input type="text"${ssrRenderAttr("value", unref(username))} placeholder="Nom d&#39;utilisateur" class="w-full px-3.5 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded text-sm text-[#f0f1f3] placeholder-[#5a5e66] outline-none focus:border-[rgba(113,112,255,0.3)] transition-colors"><input type="password"${ssrRenderAttr("value", unref(password))} placeholder="Mot de passe" class="w-full px-3.5 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded text-sm text-[#f0f1f3] placeholder-[#5a5e66] outline-none focus:border-[rgba(113,112,255,0.3)] transition-colors"><button type="submit" class="w-full py-3 bg-[#7170ff] hover:bg-[#8b8aff] text-white rounded text-sm font-semibold transition-colors"> Se connecter </button></form></div><p class="text-center text-xs text-[#5a5e66] mt-6"> Membre de <span class="text-[#b0b5c0] font-medium">Team Plasma</span> \xB7 <span class="text-[#10b981]">\u25CF 142 en ligne</span></p><p class="text-center mt-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xs text-[#5a5e66] hover:text-[#b0b5c0] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 Retour au dashboard `);
          } else {
            return [
              createTextVNode(" \u2190 Retour au dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DQ549i1L.mjs.map
