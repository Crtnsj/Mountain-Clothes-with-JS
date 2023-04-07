# Description du projet :

Ce projet a pour objectif de réaliser une application web afin de créer une boutique en ligne. Cette application va permettre l'intégration d'articles depuis une base de données, un panier fonctionnel et une page d'authentification avec la possibilité de créer un compte. Lors de la création d'un compte, des filtres de sécurité ont été ajoutés. Pour créer un compte, il faudra avoir une adresse mail "valide" (contenant un "@"), être majeur et avoir un mot de passe contenu entre 8 et 20 caractères. Les informations de l'utilisateur seront stockées dans la base de données avec le mot de passe sous forme de hash grâce à l'algorithme de "bcrypt". Après la connexion ou la création de compte, l'application devra reconnaître l'utilisateur en disant par exemple "Bonjour olivier !".

# Dépendances utilisées :

## SASS :

SASS est utilisé pour compiler le code "sass" en "css". L'utilisation de SASS sera plus pratique pour maintenir le code CSS. Ses avantages sont la possibilité de créer des variables, mixins, boucles et conditions.

## Express :

Express est utilisé afin de gérer les routes de l'application. Cette dépendance est capable de beaucoup de choses mais dans notre application, elle sera utilisée pour gérer les routes HTTP, appliquer des middleware. Voici quelques-unes des autres fonctionnalités d'Express :
  
-   L'utilisation de templates : Express peut utiliser des moteurs de templates pour générer du contenu dynamique sur les pages web.
    
-   La gestion des sessions : Express permet de gérer facilement les sessions utilisateur et de stocker des données de session sur le serveur.
    
-   La gestion des erreurs : Express offre des mécanismes pour gérer les erreurs et les exceptions dans les applications web.

## Nodemon :

Nodemon sera utile pour gagner du temps en redémarrant le serveur à chaque sauvegarde. Nodemon permet de surveiller les fichiers du projet et de redémarrer automatiquement le serveur lorsqu'il y a des changements dans le code. Cela évite de devoir redémarrer manuellement le serveur à chaque fois que l'on effectue une modification du code, ce qui peut être fastidieux et prendre du temps.

Avec Nodemon, nous pouvons simplement lancer le serveur une fois et il se redémarrera automatiquement chaque fois que l'on apporte des modifications au code. Cela nous permet de gagner du temps et d'améliorer notre productivité en nous concentrant sur le développement plutôt que sur la gestion du serveur.

## Concurrently :

Concurrently est utilisé afin de lancer en même temps Nodemon et SASS. Cette dépendance permet d'exécuter plusieurs commandes en parallèle dans un terminal unique. Cela sera utile car le projet nécessite l'exécution d'un serveur et d'un compilateur de code.

## Body-parser :

Body-parser sera utilisé afin de récupérer les données des différents formulaires de l'application. Lorsqu'un client envoie une requête POST, PUT ou DELETE au serveur, les données peuvent être incluses dans le corps de la requête au format JSON, XML, texte brut ou même des fichiers. Body-parser permet de récupérer ces données et de les transformer en objet JavaScript utilisable.

Body-parser fonctionne en analysant le corps de la requête HTTP et en extrayant les données qu'il contient. Il peut également traiter différents encodages de corps, tels que l'URL-encoded, le JSON et le texte brut. Une fois les données extraites, Body-parser les rend disponibles sous forme d'objet JavaScript dans la propriété "req.body" de la requête.

## Mysql2 :

Mysql2 sera la dépendance qui servira à la connexion à la base de données. Elle permet de se connecter et d'interagir avec une base de données MySQL. Elle permet à l'application de se connecter à la base de données MySQL, d'envoyer des requêtes SQL et de récupérer les résultats de ces requêtes.

## Bcrypt :

Bcrypt sera la dépendance qui gérera les hash de mots de passe. Bcrypt sera utilisé pour protéger les mots de passe des utilisateurs et réduire les risques de piratage.

# Utilisation:

Pour utiliser l'application, il faut dans un premier temps initialiser Node avec : 

```node
npm init
```

Ensuite, il faudra installer les dépendances citées dans la partie précédente.

Après avoir installé toutes les dépendances, nous pouvons démarrer le compilateur SASS et Nodemon avec Concurrently :

```node
npm run start // Cette commande lance le script "sass" et "dev" en même temps
```

# Maintenance / Modification / Ajouts :

### Modification CSS :

Pour modifier les différents styles CSS, il faut utiliser les différents fichiers SASS. La méthode d'organisation 7-1 est utilisée. Cette méthode consiste à créer un dossier par thématique. Les 7 dossiers à créer sont : 

- `base/` : contient les fichiers de base qui définissent les fondations de votre site, tels que la police de caractères et les normes que vous voulez appliquer sur tout votre site.
    
- `utils/` : contient les fichiers de variables, fonctions, mixins et %placeholders pour les extensions que vous utilisez dans tout votre code.
    
- `layouts/` : contient les blocs BEM qui définissent les mises en page réutilisables, telles qu'un header pour les mises en page de grande taille ou un footer.
    
- `components/` : contient les blocs BEM qui sont plus indépendants, tels que des boutons ou des formulaires.
    
- `pages/` : contient les blocs de code qui ne s'appliquent qu'à une seule page, tels que des sections spécifiques ou des mises en page personnalisées.
    
- `themes/` : contient le code spécifique à un thème, tel qu'un style personnalisé pour Noël ou pour l'été.
    
- `vendors/` : contient les fichiers CSS externes, tels que les frameworks tels que Bootstrap ou jQuery UI, que vous utilisez dans votre code.

Tous ces fichiers sont compilés par le biais des fichiers main.scss et les fichiers SCSS adjacents (un fichier correspond à une feuille de style). 

Si une nouvelle feuille de style veut être ajoutée, il faut modifier le script SASS en utilisant la logique déjà en place. 

### Modification HTML :

Les pages HTML sont créées avec les différents fichiers EJS. L'ajout de page se réalise donc en créant un fichier EJS et en utilisant la gestion de route proposée par Express. Les routes de l'application sont organisées en fonction de leurs utilités, les routes concernant le panier commencent par : "/cart/" et celles pour la partie utilisateur par : "/user/". 

//Logique de nommage des routes
![[Logique_de_route.png]]

### Ajout d'article :

Pour ajouter un article, il faut ajouter une ligne et renseigner les différentes informations (nom, prix, description...) dans la table "orders" de la base de données.

# Contributeurs :

L'unique contributeur de ce projet est Corentin SANJUAN

# Annexes :

//V1 du schéma pour les règles de sécurité lors de la création de compte (plus à jour) 
![[Regles_de_securite.png]]

//V1 du schéma pour la partie "user" de l'application (plus à jour)
![[Partie_user.png]]