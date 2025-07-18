# Xarala Frontend - Plateforme de Bootcamps

Une application React moderne et responsive pour la plateforme d'inscription aux bootcamps Xarala. L'interface est intuitive, performante et reflète l'identité visuelle de Xarala.

## 🚀 Technologies Utilisées

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios avec interceptors
- **UI Components**: Headless UI + custom components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts

## 🎨 Charte Graphique

### Couleurs Principales
```css
--primary-orange: #ff7f2a;
--primary-pink: #db4061;
--gradient-primary: linear-gradient(135deg, #ff7f2a 0%, #db4061 100%);
--text-dark: #1a1a1a;
--text-gray: #6b7280;
--bg-light: #f9fafb;
--white: #ffffff;
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
```

### Typographie
- **Famille**: Inter
- **Base**: 16px
- **Échelle modulaire**: 1.25
- **Poids**: Regular (400), Medium (500), Semibold (600), Bold (700)

## 📁 Structure du Projet

```
src/
├── components/
│   ├── ui/           # Composants réutilisables
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Card/
│   │   └── Table/
│   ├── layout/       # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── Layout/
│   ├── forms/        # Formulaires spécialisés
│   │   ├── LeadForm/
│   │   ├── LoginForm/
│   │   └── BootcampForm/
│   └── features/     # Composants métier
│       ├── BootcampCard/
│       ├── LeadTable/
│       └── StatsCard/
├── pages/
│   ├── public/
│   │   ├── HomePage/
│   │   ├── BootcampsPage/
│   │   └── BootcampDetailPage/
│   └── admin/
│       ├── LoginPage/
│       ├── DashboardPage/
│       ├── LeadsPage/
│       └── BootcampsPage/
├── hooks/            # Custom hooks
├── services/         # API calls
├── stores/           # State management
├── utils/            # Utilities
├── types/            # TypeScript types
└── constants/        # Constants
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd XaralaFront
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 📋 Scripts Disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build

# Qualité du code
npm run lint         # Linter ESLint
npm run format       # Formatter Prettier

# Tests
npm run test         # Tests unitaires
npm run test:e2e     # Tests E2E
```

## 🎯 Fonctionnalités

### Pages Publiques
- **Page d'Accueil** (`/`) : Hero section, bootcamps en vedette, statistiques
- **Liste des Bootcamps** (`/bootcamps`) : Grille responsive avec filtres et recherche
- **Détail Bootcamp** (`/bootcamps/:id`) : Informations détaillées, programme, instructeur

### Pages Admin (Protégées)
- **Connexion Admin** (`/admin/login`) : Authentification sécurisée
- **Dashboard** (`/admin/dashboard`) : Statistiques et aperçu
- **Gestion des Leads** (`/admin/leads`) : Tableau avec tri et filtres
- **Gestion des Bootcamps** (`/admin/bootcamps`) : CRUD complet

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Xarala Bootcamps
VITE_ENABLE_MOCK=true
```

### Identifiants de Démo
Pour tester l'application :
- **Email**: admin@xarala.com
- **Mot de passe**: password123

## 🎨 Composants UI

### Button
```tsx
<Button variant="primary" size="lg" gradient>
  Mon bouton
</Button>
```

### Input
```tsx
<Input
  type="email"
  label="Email"
  placeholder="votre@email.com"
  required
/>
```

### Modal
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Mon modal">
  Contenu du modal
</Modal>
```

## 📊 State Management

### Stores Zustand
- **AuthStore** : Gestion de l'authentification
- **BootcampStore** : Gestion des bootcamps
- **LeadStore** : Gestion des leads

### Exemple d'utilisation
```tsx
import { useAuthStore } from '../stores/authStore';

const { user, login, logout } = useAuthStore();
```

## 🌐 API Services

### Configuration Axios
- Interceptors automatiques pour les tokens
- Gestion des erreurs centralisée
- Refresh token automatique

### Services disponibles
- `authService` : Authentification
- `bootcampService` : Gestion des bootcamps
- `leadService` : Gestion des leads

## 🎭 Animations

### Framer Motion
- Transitions de page fluides
- Animations d'entrée pour les composants
- Micro-interactions sur les boutons

## 📱 Responsive Design

### Breakpoints Tailwind
- `sm`: 640px (Mobile large)
- `md`: 768px (Tablette)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Large desktop)

## 🧪 Tests

### Tests Unitaires
```bash
npm run test
```

### Tests E2E
```bash
npm run test:e2e
```

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Prévisualisation
```bash
npm run preview
```

## 📈 Performance

### Optimisations
- Code splitting avec React.lazy()
- Images optimisées avec lazy loading
- Mise en cache avec React Query
- Bundle analysis disponible

### Lighthouse Score
- Performance : > 90
- Accessibilité : > 95
- SEO : > 90
- Best Practices : > 90

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeur Frontend** : [Votre nom]
- **Designer** : [Nom du designer]
- **Product Owner** : [Nom du PO]

## 📞 Support

Pour toute question ou support :
- **Email** : contact@xarala.com
- **Site web** : https://xarala.com

---

**Xarala Frontend** - Transformez votre carrière avec nos bootcamps intensifs ! 🚀
