## Variant: Plasma Dark - Guild Dashboard

### Design stance
Dashboard gaming dark premium inspiré de Linear (design system) avec des accents violets Plasma et des touches cyan Pokémon. Dark natif, surfaces semi-transparentes, ombres portées comme unique séparation visuelle.

### Pages incluses
| Page | Contenu |
|------|---------|
| **Login** | Connexion Discord (bouton officiel) + formulaire classique + statut serveur |
| **Dashboard** | 4 stats (Bourse, Niveau, Membres, Classement) + Top 5 classement + Activité récente |
| **Événements** | 5 events (Airdrop, Récolte, Fishing, TeamHunt, MegaRaid) + placeholder prochain |
| **Ligue & Profil** | Header profil + 4 tabs (Badges/Arènes/Ligue/Portails) |
| Membres | Placeholder |
| Boutique | Placeholder |

### Architecture de navigation
- Sidebar fixe 260px avec navigation complète
- Topbar avec titre dynamique + actions (notif, logout)
- Routing JS côté client (`switchPage`)

### Palette (Linear-inspired dark)
- Fond profond: `#07080a`
- Panels: `#0d0e10` → `#141518` → `#1c1d22`
- Accent: `#7170ff` (violet Plasma)
- Cyan: `#22d3ee` (secondaire Pokémon)
- Textes: `#f0f1f3` → `#b0b5c0` → `#767b85`
- Bordures: `rgba(255,255,255,0.04-0.10)`

### Interaction
- Connexion Discord simulée → révèle le bouton "Accéder au Dashboard"
- Navigation sidebar complète avec highlight actif
- Tabs Ligue (Badges/Arènes/Ligue/Portails) avec contenu distinct
- Hover cards, badges, statuts events

### Fichiers
- `index.html` — Maquette complète standalone (pas de dépendances)
- `README.md` — Ce fichier

### Ouverture
Ouvre `index.html` dans n'importe quel navigateur.
