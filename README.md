# 🚀 Xarala Bootcamps Frontend

Application React moderne pour la plateforme de bootcamps Xarala, développée avec TypeScript, Tailwind CSS et les meilleures pratiques.

## ✨ Fonctionnalités

### 🏠 Pages Publiques
- **Accueil** (`/`) - Page d'accueil avec présentation et bootcamps en vedette
- **Bootcamps** (`/bootcamps`) - Liste complète des bootcamps disponibles
- **Détail Bootcamp** (`/bootcamps/:id`) - Page détaillée d'un bootcamp
- **À propos** (`/about`) - Informations sur Xarala
- **Contact** (`/contact`) - Formulaire de contact

### 🔐 Pages Admin (Protégées)
- **Connexion Admin** (`/admin/login`) - Authentification administrateur
- **Tableau de bord** (`/admin/dashboard`) - Vue d'ensemble et statistiques
- **Gestion des Leads** (`/admin/leads`) - Gestion des prospects
- **Gestion des Bootcamps** (`/admin/bootcamps`) - CRUD des bootcamps

## 🛠️ Technologies Utilisées

- **React 18** + **TypeScript**
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router v6** - Navigation SPA
- **Zustand** - Gestion d'état
- **React Hook Form** + **Zod** - Gestion des formulaires
- **Axios** - Client HTTP
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **Headless UI** - Composants UI accessibles

## 🚀 Déploiement

### Production
L'application est déployée sur **Netlify** : 
[https://bootcampsxaralafront.netlify.app](https://bootcampsxaralafront.netlify.app)

### Développement Local
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Tests
npm run test
```

## 🔑 Identifiants de Démonstration

En mode démo (quand l'API backend n'est pas accessible), vous pouvez utiliser :

### Connexion Admin
- **Email** : `admin@xarala.sn`
- **Mot de passe** : `admin123`

### Données de Démonstration

#### Bootcamps Disponibles
1. **Développement Web Full-Stack** (12 semaines, 150k FCFA)
2. **Développement Mobile** (10 semaines, 120k FCFA)
3. **Data Science & IA** (14 semaines, 180k FCFA)

#### Leads de Démonstration
- **Fatou Diop** (Nouveau) - Intéressée par le Full-Stack
- **Mamadou Diallo** (Intéressé) - Intéressé par Data Science
- **Aissatou Ba** (Contacté) - Intéressée par le Mobile

## 🔧 Configuration

### Variables d'Environnement
```env
VITE_API_BASE_URL=https://bootcamps-xarala-back-production.up.railway.app/api/v1
```

### Gestion des Erreurs CORS
L'application utilise un système de **fallback intelligent** :
- Tentative de connexion à l'API backend
- En cas d'erreur CORS, utilisation automatique des données mockées
- Expérience utilisateur préservée même sans API

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── auth/           # Composants d'authentification
│   ├── features/       # Composants métier
│   ├── layout/         # Layout et navigation
│   └── ui/             # Composants UI de base
├── pages/              # Pages de l'application
│   ├── admin/          # Pages administrateur
│   └── public/         # Pages publiques
├── services/           # Services API et données
├── stores/             # Gestion d'état Zustand
└── types/              # Types TypeScript
```

## 🎨 Design System

### Couleurs Xarala
- **Orange Principal** : `#ff7f2a`
- **Rose Principal** : `#db4061`
- **Texte Sombre** : `#1a1a1a`
- **Texte Gris** : `#6b7280`

### Composants UI
- **Button** - Boutons avec variantes (primary, secondary, outline)
- **Card** - Cartes pour afficher le contenu
- **Input** - Champs de saisie
- **Modal** - Modales pour les actions importantes

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests E2E (Playwright)
npm run test:e2e

# Formatage du code
npm run format

# Linting
npm run lint
```

## 📱 Responsive Design

L'application est entièrement responsive avec :
- **Mobile First** - Optimisé pour les petits écrans
- **Tablette** - Adaptation pour les écrans moyens
- **Desktop** - Interface complète pour les grands écrans

## 🔒 Sécurité

- **Routes protégées** pour les pages admin
- **Gestion des tokens** avec refresh automatique
- **Validation des formulaires** avec Zod
- **Headers de sécurité** configurés

## 🚀 Performance

- **Code splitting** automatique avec React Router
- **Lazy loading** des composants
- **Optimisation des images** avec Vite
- **Bundle size optimisé** (~300KB gzippé)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est développé pour Xarala Bootcamps.

---

**Développé avec ❤️ pour Xarala Bootcamps**
