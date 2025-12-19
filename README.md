# Crypto Market Reports - Site Astro

Site Astro statique qui référence et affiche les rapports crypto quotidiens.

## Fonctionnalités

- ✅ Génération statique de toutes les pages au build
- ✅ Page d'index qui redirige automatiquement vers le dernier rapport
- ✅ Navigation entre les rapports (précédent/suivant)
- ✅ Pages dynamiques pour chaque rapport basées sur la date
- ✅ CSS original préservé

## Structure

- `src/pages/index.astro` - Page d'accueil qui redirige vers le dernier rapport
- `src/pages/[date].astro` - Page dynamique pour chaque rapport (ex: `/2025-12-19`)
- `src/utils/reports.ts` - Utilitaires pour lire et gérer les rapports
- `src/utils/htmlParser.ts` - Parser pour extraire le contenu HTML
- `src/layouts/Layout.astro` - Layout de base avec le CSS
- `public/report-daily.css` - Styles CSS des rapports

## Configuration

Les rapports sont lus depuis :
```
C:\Users\Yann\Documents\sources\me\local-agent\crypto-market-report\
```

Format de fichier attendu : `crypto-daily-report-YYYY-MM-DD.html`

## Commandes

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## Comment ça fonctionne

1. Au build, Astro lit tous les fichiers HTML depuis le dossier externe
2. Pour chaque fichier, une page statique est générée à l'URL `/{date}`
3. La page d'index redirige vers le dernier rapport (le plus récent)
4. Chaque page de rapport inclut une navigation pour passer au rapport précédent/suivant

## Ajout de nouveaux rapports

Pour ajouter un nouveau rapport :
1. Placez le fichier HTML dans le dossier `crypto-market-report` avec le format `crypto-daily-report-YYYY-MM-DD.html`
2. Relancez le build : `npm run build`

Le nouveau rapport sera automatiquement détecté et une page sera générée pour lui.
