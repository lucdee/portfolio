# Mapa de Código

​ Seja você um desenvolvedor novo ou mais experiente no projeto, este documento serve para te orientar sobre como você deve se portar na base de código.

## Regras da base de código

- KISS (Keep it simple, stupid). Procure manter os códigos simples e que você possa entender com um único olhar.
- Se não sabe explicar pra que serve, não use.
- Não deixe tarefas pequenas acumular, se demora menos de dez minutos para se fazer, faça agora!

## Declarações de funções e Componentes

- Utilizar sempre arrow function.
- Declarar funções com const.
- Aplicar regra "White Spacing", pular linhas entre tipagens e funções.

**Exemplo de um componente:**

```ts
  type ComponentProps {
    label: string;
  }

  export const Component: React.FC<ComponentProps> ({label}) => {
    const handleClick = () => {
      console.log('CLICK');
    };

    return (
      <div>
        <button onClick={handleClick}>{label}</button>
      </div>
    )
  }

```

## Diretórios Base

​ Todo código da aplicação se encontra dentro da pasta `src`. Dentro da pasta `src` temos as seguintes sub-pastas:

- `pages`: Pasta requerida pelo NextJS cuja estrutura é usada para determinar o roteamento da página. A regra para esta paste é que cada arquivo deverá conter o mínimo de código possível, muita da lógica das páginas é colocada dentro da pasta `views`. Enquanto que muito da lógica da API interna do NextJS é colocada dentro da pasta `routes`.
- `styles`: Esta pasta deve ser usada unicamente para se colocar arquivos de estilo de natureza global.
- `hooks`: Esta pasta contém hooks do React que são usados em mais de uma página.
- `components`: Esta pasta contém componentes do React que são usados em mais de uma página.
- `utils`: Arquivos typescript que não se encaixam nas categorias acima mas que possuem usos relevantes entre mais de uma página.
- `layouts`: São essencialmente tamplates React que podem ser usados para compor mais de uma página.
- `views`: A estrutura interna desta pasta deve espelhar a estrutura interna da pasta `src/pages` com exceção da presença da pasta `api`. É aqui que serão colocados os arquivos a serem importados pelos arquivos da pasta `src/pages`. Como a estrutura das pastas é espelhada, cada página de `src/pages` deve importar arquivos de sua pasta correspondente em `src/views`. Como uma mesma página pode precisar de mais de um tipo de arquivo as pastas alvo dentro de `views` podem conter a seguinte estrutura:
  - `index.tsx`: Esse arquivo serve para que a pasta possa ser tratada como um pacote, não é necessário colocar muito código real aqui, apenas re-exportar outras coisas que se encontram na pasta.
  - `hooks`: Hooks utilizados apenas na view em questão.
  - `components`: Componentes utilizados apenas na view em questão.
  - `utils`: Outros arquivos typescript que não se encaixam nas categorias de hooks ou componentes.
  - `layouts`: Algumas páginas podem precisar de mais de um template por causa de wildcards no roteamento do Next. Nestes casos estes templates que são exclusivos da rota devem ser colocados nesta pasta.
  - `style.module.scss`: Módulo de estilo SASS.
