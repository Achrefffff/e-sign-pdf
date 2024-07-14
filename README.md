E-sign
E-sign est une application web qui permet aux utilisateurs de télécharger un PDF, d'y dessiner leur signature, et de sauvegarder le PDF signé. 
Cette application est particulièrement utile pour signer électroniquement des documents de manière sécurisée et efficace.

Fonctionnalités

*Téléchargement de PDF : Les utilisateurs peuvent télécharger un document PDF dans l'application.  
*Dessin de signature : Les utilisateurs peuvent dessiner leur signature sur le PDF à l'aide d'un canvas.  
*Ajustement de la couleur et de l'épaisseur : Les utilisateurs peuvent sélectionner la couleur et l'épaisseur de la signature.  
*Effacement de la signature : Option pour effacer la signature et recommencer.  
*Téléchargement du PDF signé : Les utilisateurs peuvent télécharger le document PDF signé.  
*Design responsive : L'application est conçue pour être responsive et fonctionne bien sur divers appareils.  

Prérequis
Un navigateur web supportant HTML5, JavaScript et le canvas.

Installation
Clonez le dépôt :

git clone https://github.com/Achrefffff/e-sign-pdf

Naviguez dans le répertoire du projet :
cd e-sign

Utilisation

*Ouvrez le fichier index.html dans votre navigateur web.  
*Téléchargez un document PDF en utilisant le champ de téléchargement de fichier.  
*Ajustez la couleur et l'épaisseur de la signature selon vos préférences.  
*Dessinez votre signature sur le canvas du PDF.  
*Cliquez sur le bouton "Soumettre" pour sauvegarder et télécharger le PDF signé.  

Structure du Projet

e-sign/  
├── index.html  
├── app.css  
├── app.js  
├── README.md  

-index.html : Le fichier HTML principal contenant la structure de l'application web.  
-app.css : Le fichier CSS contenant les styles de l'application web.  
-app.js : Le fichier JavaScript contenant les fonctionnalités pour gérer les téléchargements de PDF, le dessin des signatures et la sauvegarde du PDF signé.  
-README.md : Ce fichier que vous êtes en train de lire, fournissant des informations sur l'application.  

Dépendances
*pdf-lib - Une bibliothèque JavaScript pour créer et modifier des documents PDF.  
*pdf.js - Une bibliothèque Portable Document Format (PDF) utilisée pour rendre les PDFs dans un élément <canvas>.  
  

Remerciements  
Merci aux développeurs de pdf-lib et pdf.js pour leurs bibliothèques 
