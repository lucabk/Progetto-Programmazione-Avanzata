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

Per installre VSCode e aprire un progetto dalla distribuzione WSL, aprire la riga di comando della distribuzione e immettere:
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

Per installare il file di configurazione Git, aprire una riga di comando per la distribuzione in uso e impostare il nome con questo comando (sostituendo "Nome" con il proprio nome utente):
```bash
git config --global user.name "Your Name"
```
Impostare la propria email con questo comando (sostituendo "youremail@domain.com" con l'indirizzo di posta elettronica personale):
```bash
git config --global user.email "youremail@domain.com"
```
. Se è necessario modificare la configurazione Git, è possibile usare un editor di testo integrato come Nano: ```bash nano ~/.gitconfig ```.



### Bibliografia
Basic commands for WSL: https://learn.microsoft.com/en-us/windows/wsl/basic-commands

VSCode WSL: https://learn.microsoft.com/it-it/windows/wsl/tutorials/wsl-vscode

Remote Development Extension Pack: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack

WSL Git: https://learn.microsoft.com/it-it/windows/wsl/tutorials/wsl-git
