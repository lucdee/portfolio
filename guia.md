# Guia básico

Este guia apresenta alguns conceitos e dicas básicas para melhorar suas habilidades.

## Regras importantes a seguir

- KISS (Keep it simple, stupid). Procure manter os códigos simples e que você possa entender com um único olhar.
- Se não sabe explicar pra que serve, não use.

## Boas práticas no HTML

Procure escrever seu código html o mais simples possível, mas mantendo uma semântica entre as tags, nem tudo são apenas divs e mais divs.

Segue abaixo dois links para estudo sobre o html semântico:
https://blog.geekhunter.com.br/voce-conhece-html-semantico/
https://www.devmedia.com.br/html-semantico-conheca-os-elementos-semanticos-da-html5/38065

## Boas práticas no CSS

A regra é a mesma, procure escrever seu CSS o mais simples possível, mas que entregue o resultado esperado!

Algumas dicas importantes:

- Sempre utilizar **rem** como únidade de medida. (Exceto em box-shadow, border de 1px, caso contrário utilize rem). Por que? O rem vai se adaptar conforme o font-size definido no html no css global, **TODA** a aplicação irá se adaptar.
- Pense de fora para dentro, estilize o "container" primeiro, depois os elementos internos.
- **NUNCA** utilizar mais de 100% em **width** e **height**, passou de 100% tem algo errado.

margin e padding:

- **margin** sempre aplicado **FORA** do elemento.
- **padding** sempre aplicado **DENTRO** do elemento.

Dicas para aplicar margin ou padding em uma única linha:

```css
.class {
  margin-top: 1rem;
  margin-right: 0.7rem;
  margin-bottom: 2rem;
  margin-left: 0.5rem;
  /* Mesmo código de cima (sentido horário) */
  margin: 1rem 0.7rem 2rem 0.5rem;
}

.center {
  /* 0 aplicado no top e bottom, e margin automatica nas laterais */
  margin: 0 auto;

  /* "auto" não existe no padding */
}
```

## Comandos basicos do git

```bash
# BRANCHES

# Quando uma branch é criada ela fica apenas localmente na sua máquina.
# Branchs são criadas para adicionar novas funcionalidas, corrigir bugs,
# e Refatoração de código.

# Criar nova branch
git checkout -B nome-da-branch
# Deletar branch
git checkout -D nome-da-branch
# Navegar entre branches
git checkout nome-da-branch
# Verificar todas as branches
git branch -a
# ou
git branch --all
# Subir branch para o git
git push --set-upstream origin nome-da-branch

# COMMITS

# Pegar arquivos alterados do GIT da branch atual
git pull
# Pegar arquivos alterados de outra branch para a atual
git pull origin nome-da-outra-branch
# Verificar status dos arquivos alterados
git status
# Adicionar os arquivos alterados para staging
git add .
# ou
git add -A
# Commitar atualizações dos arquivos
git commit -m "alguma descrição"
# Enviar arquivos alterados para o GIT
git push

# MERGE

# Após finalizar a implementação em uma branch
# é realizado o merge das atualizações de uma branch para outra

# REGRA

# Estar na branch que irá receber o merge.

# Fazer merge entre branches
git merge --no-ff nome-da-branch

# EXEMPLO:

# Temos a branch dev e a branch main.
# Quero fazer merge da branch dev para a branch main

# 1º: Fazer os devidos commits na branch dev.
# 2º: Navegar para branch main.
# 3º: Dar pull na branch main.
# 4º: Executar o comando para fazer o merge.

# No caso deste exemplo, seria o seguinte comando:
git merge --no-ff dev

# Após o merge realizado, basta dar push.
git push
```
