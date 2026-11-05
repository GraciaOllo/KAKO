# KAKO frontend

Base frontend de l’équipe KAKO, construite avec React, TypeScript, Vite,
Tailwind CSS, React Router DOM et Lucide React.

## Démarrer

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

Le fichier `.env` est local et ne doit pas être partagé. `VITE_API_URL` indique
l’adresse de base prévue pour l’API backend.

## Structure

- `src/components` : composants réutilisables et mise en page
- `src/pages` : pages associées aux routes
- `src/services/api` : accès et configuration de l’API
- `src/hooks` : hooks partagés
- `src/contexts` : contextes React
- `src/types` : types TypeScript partagés
- `src/assets` : ressources statiques

Les dossiers encore vides sont des emplacements pour le travail de l’équipe.
