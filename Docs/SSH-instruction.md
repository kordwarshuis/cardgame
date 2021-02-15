# General SSH access install and config of local client and Direct Admin

[10:29, 06/02/2021] Kor Dwarshuis serves as an example

## SSH KEY generation
---
```
command: ssh-keygen -t rsa
```

Generating public/private rsa key pair.
Enter file in which to save the key (/Users/kor/.ssh/id_rsa): 
Click ENTER for default

Choose a strong passphrase

==> passphrase: ***

Your identification has been saved in /Users/kor/.ssh/id_rsa.
Your public key has been saved in /Users/kor/.ssh/id_rsa.pub.
The key fingerprint is:
***
The key's randomart image is:

here you get a qr code
[10:30, 06/02/2021] Kor Dwarshuis: 1:
permanent store SSH keys
zie https://apple.stackexchange.com/a/250572

```
$ssh-add -K id_rsa_github
```
de 'K' takes care of storage of your passphrase in the Keychain.

## SSH KEY configuration
//create config file: ~/.ssh/config
with content:
```
Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa
  IdentityFile ~/.ssh/id_rsa_github
```

# Direct Admin approach
- Create a keypair locally as mentioned above
- Follow guidelines https://www.antagonist.nl/help/nl/webhosting/ssh
- Paste the local public key into 
```
cat ~/.ssh/blockcbird-ssh.pub                 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDgDuMS43FULpK26INbq+PcSiLNSZjz3H8U2JJD1JJX
jmC/9QoK8jl54IfKpL8L5vLkqef6fVGWESuAWsJOZB/GfZy28PO9fli+YgxzU5hJIlzBLt9M
9+MC4REpgxOnyjv3iyhaCW20vVHtwuHV4s9vpqXTfT4MUGT4oMQZzk8sUtVa7NeLTLf6aLA0
SJS6z6G/mjdFP69vCTji1EjoXgaTo+KmXltt0pRs4/tJfkJcZTPakjUiMW4iGZHWL9OgMm2S
5lWsfTUBzENMqhzzXz6Z3d00NUOvSBCEBqwgg3ol0NX7IJUDq6J4nxGKsV9mfh20vG0h7fXG
JrggsqlHkO87DGn3mpdLTVGjKyQs3MpFqUhUe9stdtLVmk13ZL+o0ov6ERC69zfrGVskzNl8
hUYK8HTp5659xfviMEirc7Lw/kKr/drSCs3LSWdUJq063c0WjKFw+Db8Ex3OLM9bBad2TCWS
JvvSFd71gdfdA5PxUhMAR/02L7gEES1spLIGioxwU+GbU8LorZriQrZSNySNgAQe3SaUQ8wW
fm8WE11gEbsxQRfrSowykj1pGAYc/JkRVFmC/tMZKkduRLoefh6VnB3bjP3CORoEb7RXmL+a
a6N0qy0udmxfDDLgnHbQq97IsD6wBORfI3Bnwa/WsZ7Ih3sW/2t3tqz1Bf61wQ== 
hwe@Heresomething.local
```

| Direct Admin| SSH paste key| 
| -------- | -------- |
|![](https://i.imgur.com/bjtXTlc.png)|![](https://i.imgur.com/lXZq7BJ.png)
|



