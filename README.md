# PROGRAMMAZIONE AVANZATA

## 1 - INSTALLAZIONE COMPONENTI

### 1.1 WSL

Installazione WSL con Ubuntu.
 ```bash
   wsl --install
   ```
![image](https://github.com/user-attachments/assets/0aad71a9-9819-4086-9845-c5391797305c)


Per installare una distribuzione in particolare si usa il comando  ```bash wsl --install <Distribution Name> ```; la lista delle distribuzioni si ottiene lanciando:  ```bash wsl --list --online   ```.
Se si ha una sola distribuzione Linux installata, basta eseguire il comando:
 ```bash
   wsl 
   ```
per lanciare la macchina. Se si hanno più distribuzioni installate e si desidera specificare quale avviare, si lancia il comando  ```bash wsl -d <Distribution Name> ```.
Alcuni comandi possono risultare utili: controllare le distribuzioni installate: ```bash wsl -l -v  ```; Status WSL: ```bash wsl --status ```; Aggiornamento WSL: ```bash wsl --update ```: Controllo versione WSL ```bash wsl --version ```; Arresto della macchina Linux su WSL ```bash wsl --shutdown ```.


Basic commands for WSL: https://learn.microsoft.com/en-us/windows/wsl/basic-commands

### Visual Studio Code con WSL



Riferimento: https://learn.microsoft.com/it-it/windows/wsl/tutorials/wsl-vscode
