# PROGRAMMAZIONE AVANZATA

## 1 - INSTALLAZIONE COMPONENTI

### 1.1 WSL
Windows Subsystem for Linux (WSL) consente agli sviluppatori di eseguire un ambiente GNU/Linux, compresa la maggior parte degli strumenti della riga di comando, delle utility e delle applicazioni, direttamente su Windows, senza modifiche e senza l'onere di una macchina virtuale (VM) tradizionale o di una configurazione dual-boot.

Installazione WSL con Ubuntu.
 ```bash
   wsl --install
   ```

Per installare una distribuzione in particolare si usa il comando  ```bash wsl --install <Distribution Name> ```; la lista delle distribuzioni si ottiene lanciando:  ```bash wsl --list --online   ```.
Se si ha una sola distribuzione Linux installata, basta eseguire il comando:
 ```bash
   wsl 
   ```
per lanciare la macchina. 

Se si hanno più distribuzioni installate e si desidera specificare quale avviare, si lancia il comando  ```bash wsl -d <Distribution Name> ```.
Alcuni comandi possono risultare utili: 
- controllare le distribuzioni installate: ```bash wsl -l -v  ```
- Status WSL: ```bash wsl --status ```
- Aggiornamento WSL: ```bash wsl --update ```
- Controllo versione WSL ```bash wsl --version ```
- Arresto della macchina Linux su WSL ```bash wsl --shutdown ```


### 1.2 VSCode WSL
Per configurare correttamente Visual Studio Code (VSCode) con WSL bisogna installare il Remote Development extension pack. Aprire VSCode e, facendo riferimento al seguente <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack">link</a> per installare le relative estensioni.

E' possibile verificare che le estensioni siano state installate correttamente tramite il comando su PowerShell:
 ```bash ls $HOME\.vscode\extensions\ ```

Successivamente avviare Ubuntu per aggiornare i repository e installare "wget" 
```bash 
sudo apt-get update
```

e la verifica dei certificati SSL
```bash 
sudo apt-get install wget ca-certificates
```

Per installre VSCode e aprire un progetto dalla distribuzione WSL, aprire la riga di comando della distribuzione ed immettere:
```bash 
 cd $HOME && mkdir pa2024 && code pa2024
```

Una volta aperto VSCode, nella shell, seguire la figura: il risultato dovrebbere essere analogo, con in basso a sx nella schermata VSCode la scritta WSL:Ubuntu:


![image](https://github.com/user-attachments/assets/54006e65-4236-4463-9fff-fb6eef4364b5)


N.B. Verificare che siano rispettati i System Requirements.


### 1.3 Git
Git è già installato con la maggior parte delle distribuzioni del sottosistema Windows per Linux, ma può essere necessario eseguire l'aggiornamento alla versione più recente. Sarà inoltre necessario impostare il file di configurazione Git.

```bash
sudo apt-get install git
```

Per installare il file di configurazione Git, aprire una riga di comando per la distribuzione in uso e impostare il nome con questo comando:
```bash
git config --global user.name "Your Name"
```
Impostare la propria email con questo comando:
```bash
git config --global user.email "youremail@domain.com"
```
. Se è necessario modificare la configurazione Git, è possibile usare un editor di testo integrato come Nano: ```bash nano ~/.gitconfig ```.


### 1.4 Docker
Docker Desktop per Windows offre un ambiente di sviluppo per la compilazione, la spedizione e l'esecuzione di app con docker. Abilitando il sistema basato su WSL 2, è possibile eseguire contenitori sia Linux che Windows in Docker Desktop nello stesso computer. Quindi, scaricare <a href="https://docs.docker.com/desktop/wsl/#turn-on-docker-desktop-wsl-2">Docker Desktop</a>, avviare docker (direttamente dallo Start menù di Windows) e assicurarsi che, nelle impostazioni, sia abilitato l'utilizzo con WSL2 (<i>Settings> General> Use the WSL 2 based engine</i>). Successivamente selezionare tra le distribuzioni di WSL 2 installate quella in cui si vuole abilitare l'integrazione di Docker andando su: <i>Settings> Resources>WSL Integration. </i>

Per verificare che Docker sia stato installato, aprire una distribuzione WSL e visualizzare la versione e il numero di build immettendo: 
```bash
docker --version
```

Verificare che l'installazione funzioni correttamente eseguendo una semplice immagine Docker incorporata usando: 
```bash
docker run hello-world
```

![image](https://github.com/user-attachments/assets/30b64f54-3da4-4d8d-9771-95293da2c7aa)


Infine, bisogna installare due estensioni in VSCode: 
- <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers">Dev Containers</a> (dovrebbe essere già installata dagli step precedenti)
- <a href="https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker">Docker</a>

N.B. Per lanciare i comandi Docker servono i privilegi da superUser (<i>sudo</i>), si consiglia quindi di controllare se l'utente corrente appartenga al gruppo "docker". 

![image](https://github.com/user-attachments/assets/b907f932-2199-470c-b9fa-9af84f899927)


### 1.5 Node.js
Si sconsiglia di installare Node.js direttamente dal gestore di pacchetti Linux perché la versione di Node che può essere installata con il comando apt-get di Ubuntu è attualmente <a href="https://learn.microsoft.com/it-it/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm">obsoleta</a>. Si fa riferimento alla <a href="https://nodejs.org/en/download/package-manager">guida ufficiale</a> per l'installazione di Node.js, su architettura Linux e utilizzando il Node Version Manager (nvm):
```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.1`
```

![image](https://github.com/user-attachments/assets/c89554fc-b673-4a83-ae80-1a7be071a0de)

### 1.6 Richieste web
#### 1.6.1 Postman 
Al fine di effettuare richieste web si fa uso di <a href="https://www.postman.com/">Postman</a>. Postman include un client API integrato che permette di creare e inviare richieste API, incluse richieste HTTP. Con Postman, si può inviare una richiesta a un endpoint, recuperare dati da una fonte dati, o testare la funzionalità di un'API, tramite interfaccia grafica. Per usufruire del servizio bisogna registrarsi o loggarsi con account Google.

#### 1.6.2 Newman
Newman è uno strumento a riga di comando che permette di eseguire le collezioni di Postman direttamente dal terminale. È particolarmente utile per l'automazione dei test delle API, integrando facilmente i test in pipeline di integrazione continua (CI/CD). Con Newman, si possono eseguire test, generare report e validare il comportamento delle API in modo programmato e ripetibile. Sulla Ubuntu WSL si <a href="https://learning.postman.com/docs/collections/using-newman-cli/installing-running-newman/">installa Newman</a> con il comando:
```bash
$ npm install -g newman
```
La versione di Node deve essere almeno la 16. Prerequisito soddisfatto se si sono seguiti correttamente i passaggi del paragrafo "1.5 Nodejs".

#### 1.6.3 Scaricare le collection
Una volta create le collection su Postman tramite browser del sitema host (Windows) si devono scaricare per essere utilizzate dalla WSL Ubuntu. Per farlo verrà utlizzata l'API di Postman tramite token di autenticazione; prima di tutto va creata la chiave API:
- Accedi a Postman con il tuo account.
- Clicca sulla tua foto profilo in alto a destra e seleziona Account Settings.
- Nel menù laterale, seleziona API Keys.
- Crea una nuova API Key cliccando su Generate API Key.
- Dai un nome alla chiave, quindi copia l'API Key generata.

Successivamente si vanno a recuperare tutte le collection del proprio account usando l'API di Postman:
```bash
curl -X GET "https://api.getpostman.com/collections?apikey=YOUR_API_KEY"
```
Questo comando restituirà un elenco di tutte le collection nel tuo account, ciascuna con il suo ID. Scelto l'ID della collection da scaricare la si può scaricare con il comando:
```bash
curl -X GET "https://api.getpostman.com/collections/YOUR_COLLECTION_ID?apikey=YOUR_API_KEY" -o collection.json
```

#### 1.6.4 Utilizzare le collection
Per lanciare l'esecuzione della collection:
```bash
newman run COLLECTION_NAME.json
```

NB: Nell'utilizzare Newman da terminale è necesario evitare l'uso di variabili d'ambiente su Postman nella definizione del JWT per non ricadere nell'errore: "Invalid character in header content ["Authorization"]".

#### Riferimenti
- Basic commands for WSL: https://learn.microsoft.com/en-us/windows/wsl/basic-commands
- VSCode WSL: https://learn.microsoft.com/it-it/windows/wsl/tutorials/wsl-vscode
- Remote Development Extension Pack: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
- WSL Git: https://learn.microsoft.com/it-it/windows/wsl/tutorials/wsl-git
- Docker in WSL: https://learn.microsoft.com/it-it/windows/wsl/tutorials/wsl-containers
- Node.js in WSL: https://learn.microsoft.com/it-it/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm
- Node.js Download: https://nodejs.org/en/download/package-manager

______________________________________________________________


## 2 - SETUP DELL'APPLICAZIONE
### 2.1 Javascript - Typescript - Express 
Per creare il progetto si parte dal classico comando di inizalizzazione per sviluppare un'applicazione in Javascript (JS):
```bash
npm init
```
Da qui si creerà il file package.json. Nella macchina WSL è gia installato Typescript globalmente, ma è buona norma aggiungerlo alle dipendenze di sviluppo:
```bash
 npm install typescript --save-dev
```
Il "compilatore" nativo di Typescript permettera la traduzione del codice con il comando ```tsc``` che, ad ogni modo, per coerenza nello sviluppo verrà integrato negli script del package.json.
![image](https://github.com/user-attachments/assets/dc25f6d9-39f7-4157-b9d1-a74ca470c295)

Adesso si può creare il file di configurazione di Typescript (TS): tsconfig.json. Si utilizza lo script appena settato:
```bash
 npm run tsc -- --init
```
Si ricorda che, per non dare errori, Typescript si aspetta almeno un file .ts nella propria cartella. La configurazione del file tsconfig.js avrà le seguenti caratteristiche:
![image](https://github.com/user-attachments/assets/55021a73-2300-4dc3-a5ca-5588ebe17392)

Il file JS che verrà realizzato andrà dunque salvato in un'apposita cartella (da creare) nella root del progetto, denominata "build". 
In seguito, dato che il progetto si occuperà dello sviluppo di un'applicazione backend in TS si utilizzerà la libreria Express e la sua tipizzazione:
```bash
npm install express
npm install --save-dev @types/express
```

Per facilitare lo sviluppo, verrà fatto uso di ts-node:
```bash
npm install --save-dev ts-node-dev
```
che verrà anche aggiunto tra gli script:
![image](https://github.com/user-attachments/assets/57884f37-0d1b-430a-8190-bf7b0227f56d)

Per lanciare l'applicazione in modalità sviluppatore si usa il comando:
```bash
npm run dev
```

### 2.2 ESlint e Production mode
Si utilizzerà anche ESlint per una maggior chiarezza e soldità nello sviluppo:
```bash
npm install --save-dev eslint @eslint/js typescript-eslint @stylistic/eslint-plugin  @types/eslint__js
```
Si aggiornano gli script per facilitarne l'utilizzo:
![image](https://github.com/user-attachments/assets/cde9df07-e1b4-4aa1-9ca9-cce15f961cb9)

Per abilitare le regole si crea un file, nella root del progetto, denominato: eslint.config.mjs. Il contenuto del file può essere consultato nella repository.


Si aggiunge anche uno script per lanciare il programma in production mode:
![image](https://github.com/user-attachments/assets/8e396939-fda5-4d5d-aaba-a8bbcca91f84)


### 2.3 Altri pacchetti
#### 2.3.1 Cors
```bash
npm install cors
npm install --save-dev @types/cors
```

#### 2.3.2 Sequelize
Si installano i pachetti relativi a Postgres, Sequelize e dotenv (per le variabili di ambiente)
```bash
npm install dotenv pg sequelize
npm install --save-dev @types/dotenv @types/pg @types/sequelize
```

#### 2.3.4 Async errors
Nelle promise si utilizzerà la programmazione asincrona quindi, al fine di evitare blocchi di codice "try-catch" si installa la libreria di express per la gestione automatica degli errori tramite middleware:
```bash
npm install express-async-errors
```
La libreria deve essere importata e deve essere predisposto un middleware di gestione degli errori successivo alle rotte.

#### 2.3.5 ZOD
Zod è una libreria di validazione di schema e verrà utilizzata per validare i dati inviati al server. Si installa con il comando:
```bash
npm install zod
```

#### 2.3.6 JWT
Si utilizza JSON Web Token per effettuare richieste autenticate. Inoltre, si userà la libreria bcrypt per fare l'hash delle password.
```bash
npm install jsonwebtoken
npm install bcrypt
npm install @types/bcrypt @types/jsonwebtoken --save-dev
```

#### 2.3.7 Morgan Middleware
Si farà uso anche del middleware Morgan per il log delle richieste. Installazione:
```bash
npm install morgan
npm install --save-dev @types/morgan
```
#### 2.3.8 Http status codes
Viene utilizzata una libreria per segnalare lo status code delle operazioni HTTP:
```bash
npm install http-status-codes
```

#### 2.3.9 Umzug
la libreria umzug verrà utilizzata per fare le migration di Postgres.
```bash
npm install umzug
```
Nel path della migrazione va specificato il path assoluto della cartella relativa alle migrazioni, NON quello relativo.
___________________________________________________________
nota1: la versione finale del package.json e del tsconfig.json possono essere consultati direttamente nella repository.

nota2: per scelte di autore, la repository sarà interamente in italiano, mentre il codice (ed i relativi commenti) in lingua inglese.

####  Riferimenti

- Full Stack Open - Typing an Express app: [https://fullstackopen.com/en/](https://fullstackopen.com/en/part9/typing_an_express_app)
- express-async-errors: https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch
- Zod: https://zod.dev/
- Morgan: https://github.com/expressjs/morgan
___________________________________________________________
  
## 3 - DOCKERIZZAZIONE
La scelta implementativa utilizzata prevede di dockerizzare sin da subito l'istanza del database Postgres; mentre lo sviluppo dell'applicazione TS viene effettuata direttamente sulla macchina host per poi, successivamente, essere dockerizzata anch'essa. Questa scelta è stata presa ai fini di semplificare lo sviluppo dell'applicazione.

### 3.1 PostgreSQL
### Configurazione Docker per il Servizio Database

Questo progetto utilizza Docker per eseguire un container PostgreSQL e uno strumento di gestione database basato su web, **Adminer**. Ecco come sono definiti i servizi nel file `docker-compose.yml`:

- **db**: Esegue PostgreSQL, espone la porta `5432` e utilizza il volume persistente `db-data` per salvare i dati.
  - Variabili d'ambiente: `POSTGRES_USER`, `POSTGRES_PASSWORD`, e `POSTGRES_DB`.
  - Limite di memoria condivisa impostato a `128mb`.

- **adminer**: Fornisce un'interfaccia web leggera per la gestione del database, accessibile sulla porta `8080`.

Il volume `db-data` consente di mantenere i dati persistenti anche dopo i riavvii del container.

```mermaid
graph TD;
    A[Docker Services] --> B[PostgreSQL Service: db];
    A --> C[Adminer: Web Management Tool];

    B -->|Port: 5432| D[PostgreSQL Container];
    C -->|Port: 8080| E[Adminer Container];

    B --> F[Environment Variables];
    F -->|POSTGRES_USER| D;
    F -->|POSTGRES_PASSWORD| D;
    F -->|POSTGRES_DB| D;

    D --> G[db-data Volume];
    G -->|Persistent Data| D;
```

Per lanciare i container si utilizza il comando:
```bash
docker compose up
```

Si possono visualizzare il containerID e le statische di docker con i comandi: ```docker ps``` e ```docker stats```. La connesione al db può essere effetuata sia tramite GUI (Adminer) all'indirizzo http://localhost:8080 della macchina host, oppure tramite il terminale con il comando: ```docker exec -it containerID psql -U user password```. Alcuni comandi utili una volta connessi da terminale sono:
- ```\l``` elenca i database
- ```\dt``` elenca le tabelle nel database
-  ```\d nome_tabella``` elenca gli attributi della tabella specificata
-  ```\q``` chiude la connessione al db
-  si possono effettuare query direttamente in SQL 


####  Riferimenti

- Full Stack Open - Containers: [https://fullstackopen.com/en/](https://fullstackopen.com/en/part12)
- Postgres: https://hub.docker.com/_/postgres



## 4 - STRUTTURA DEL PROGETTO
### 4.1 Disposizione delle diretory

#### 4.2 PostgreSQL
##### 4.2.1 Migration and Seed
Si è scelto di utilizzare le migrazioni per gestire le modifiche al database invece del metodo `sync()` per i seguenti motivi:
1. **Controllo Versione**: Le migrazioni permettono di tenere traccia delle modifiche al database nel tempo, facilitando il rollback a versioni precedenti.
3. **Automazione**: Possono essere automatizzate ed (eventualmente) integrate nei processi di CI/CD.
4. **Documentazione**: Ogni migrazione documenta una modifica specifica, rendendo più chiaro il motivo delle modifiche.

Inoltre, è stato creato un seed iniziale del database con dei valori di partenza per effettuare i test e controllarne il corretto funzionamento.

#### 4.3 JSON Web Token
Per semplificare l'implementazione si è utilizzata una generazione dei token basata su crittografia simmetrica, mediante la chiave (KEY) salvata nel file delle variabili di ambiente. Ad ogni modo, per implementare un'autenticazione basata su crittografia asimmetrica si può procedere secondo i seguenti passaggi:
1. Si genera la coppia chiave pubblica - chiave privata (RSA) direttamente da terminale tramite openssl (preinstallato su Ubuntu):
```bash
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```
2. Si sostituisce alla chiave simmetrica la chiave privata (jwtRS256.key) nella generazione (firma) del token con il metodo <i>.sign()</i>
3. Si sostituisce alla chiave simmetrica la chiave pubblica (jwtRS256.key.pub) nella verifica del token tramite il metodo <i>.verify()</i>


## 5 - DESIGN PATTERN UTILIZZATI
### 5.1 MVC (Model-View-Controller)
Il progetto utilizza il pattern MVC per organizzare il codice del backend. Questo approccio offre numerosi vantaggi:

- Manutenibilità: Separazione delle responsabilità tra modelli, controller e router, facilitando le modifiche e la gestione del codice.
- Testabilità: Ogni componente può essere testato separatamente, migliorando la qualità del software.
- Riutilizzabilità: Componenti come modelli e controller possono essere riutilizzati in diverse parti dell'applicazione.
- Scalabilità: La struttura facilita l'aggiunta di nuove funzionalità senza compromettere l'architettura esistente.
- Chiarezza e Organizzazione: Il codice è più leggibile e organizzato, rendendo più facile la documentazione e la comprensione del flusso dell'applicazione.

### 5.2 Singleton
Il progetto utilizza il pattern Singleton per gestire la connessione al database. Questo approccio offre numerosi vantaggi:

- Istanza Unica: Garantisce che ci sia una sola istanza di Sequelize in tutta l'applicazione, evitando problemi di concorrenza e migliorando l'efficienza.
- Punto di Accesso Globale: La costante sequelize è accessibile globalmente attraverso l'importazione nei modelli, facilitando la gestione della connessione al database.
- Manutenibilità: Centralizza la gestione della connessione al database, rendendo il codice più facile da mantenere e aggiornare.

####  Riferimenti
- Appunti personali <a href="https://guide.univpm.it/af.php?lang=lang-ita&af=248519
">corso</a>
- JS basics: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
- TS basics: https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-typescript/
- Full stack Open Part3-4-9-12-13: https://fullstackopen.com/en/
- Express: https://expressjs.com/
- Sequelize: https://sequelize.org/
- TS Declaration Merging: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript

## 6 - TEST
Durante lo sviluppo del progetto sono stati utilizzate diverse tipologie di test riportati di seguito.

### 6.1 VSCode Rest client
Un metodo molto semplice per effettuare richieste HTTP alle API direttamente da VSCode è quello di utilizzare l'estensione <a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">Rest client</a>. Nel progetto è stata creata una cartella "./requests" al cui interno vi sono i file .rest che effettuano le varie chiamate API, utilizzando i diversi verbi HTTP. Questo permette di visualizzare, in maniera dinamica e veloce, come risponde il server alle varie richieste. Questi test sono preliminari e dovuti agli istanti iniziali di sviluppo dell'applicazione, quindi non devono essere considerati assolutamente come dei test finali ed esaustivi dell'intero progetto.

### 6.2 Postman - Newman
### 6.3 Librerie node:test e supertest

####  Riferimenti
-  Full Stack Open - REST client: https://fullstackopen.com/en/part3/node_js_and_express#the-visual-studio-code-rest-client
-  Full Stack Open - Testing Node app: https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#testing-node-applications
-  Full Stack Open - Testing the backend: https://fullstackopen.com/en/part4/testing_the_backend

