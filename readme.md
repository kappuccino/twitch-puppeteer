# Puppeteer (twitch stream)

Exemples utilisés pendant le stream https://www.twitch.tv/videos/318660327

### Exemple
* **Cantine**: Récupérer une URL sur une page web, et télécharge le fichier
* **LeBonCoin**: Depuis une URL de recherche sur le bon coin, récupérer le titre, l'image et le prix
* **Instagram**: Pour un profil donné, retourne les url des 3 dernières images


Si vous voulez lancer Puppeteer depuis un serveur, il vous faudra passer par Docker (https://hub.docker.com/r/alekzonder/puppeteer/) La version de node n'est pas tout à fait à jour (v8.0 en date du 2018-10-05) et ne permet pas de faire des `for await` par exemple, mais fonctionne très bien pour le reste (async await supporté)