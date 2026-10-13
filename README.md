# Donna Cerimonial & Eventos · Bio Link

Página de bio link para o Instagram da **Donna Cerimonial & Eventos** (Glória, Vila Velha — ES).
O objetivo principal é levar o visitante ao WhatsApp para solicitar um orçamento.

É um site estático, sem etapa de build e sem dependências: HTML, CSS e um pequeno arquivo JavaScript.
Pode ser publicado em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, Cloudflare Pages ou a hospedagem atual da empresa).

## Estrutura

```
index.html                       página completa (seções, links, metadados, ícones SVG)
assets/css/styles.css            estilos, cores, tipografia e animações
assets/js/main.js                revelação ao rolar + medição de cliques (opcional)
assets/fonts/                    Bodoni Moda e Jost (SIL Open Font License), hospedadas localmente
assets/img/logo-donna.webp       logo original (recorte do arquivo enviado, sem alterações)
assets/img/logo-ornamento.webp   ornamento da própria logo, usado na chamada final
assets/img/og-image.jpg          imagem de compartilhamento (1200 × 630)
assets/img/eventos/              fotografias dos cartões de experiências (a adicionar)
favicon-32.png, icon-192.png,
apple-touch-icon.png             ícones feitos com o "D" da logo
tools/og-image.html              modelo para regenerar a imagem de compartilhamento
```

## Logo

A logo usada é exatamente o arquivo enviado pela Donna: apenas a área transparente vazia ao redor foi recortada.
Desenho, tipografia, cores e proporções estão intactos.

O arquivo original tem uma sombra preta atrás das letras douradas. Para que ela não apareça como um retângulo,
tudo o que fica atrás da logo usa preto absoluto (`--logo-backing: #000` em `styles.css`): a moldura da abertura,
a moldura da chamada final e o rodapé. Se mudar essas cores de fundo, mantenha o preto absoluto atrás da logo.

Para trocar a logo no futuro, substitua `assets/img/logo-donna.webp` mantendo o nome do arquivo
e ajuste `width`/`height` no `index.html` se as proporções mudarem.

## Pendências antes de publicar

### 1. Fotografias reais

Os cartões de **Experiências Donna** já estão preparados para receber fotos. Para cada categoria:

1. salve a foto em `assets/img/eventos/` (WebP ou JPG, 1200 × 1500 px, retrato 4:5, até ~250 KB);
2. no `index.html`, descomente o `<img>` correspondente dentro de `.moment__media` e escreva um `alt` que descreva a foto.

Use somente registros reais de eventos da Donna, com autorização de uso de imagem.
Sem foto, o cartão mantém a composição com monograma.

### 2. Domínio definitivo

Redes sociais exigem URL absoluta na imagem de compartilhamento. Depois de definir o domínio,
troque no `<head>` do `index.html` os caminhos `assets/img/og-image.jpg` por
`https://seudominio.com.br/assets/img/og-image.jpg` e descomente a linha `canonical`.

## Links

| Botão | Destino |
| --- | --- |
| Solicitar orçamento (topo, chamada final e rodapé) | WhatsApp `+55 27 99788-0077` com mensagem pronta |
| Conheça nosso trabalho | https://www.instagram.com/donnacerimonial.eventos/ |
| Conheça nosso espaço | https://share.google/H26QlBT8dR2Lc7eBj |
| Como chegar | https://share.google/H26QlBT8dR2Lc7eBj |

Mensagem automática do WhatsApp:

> Olá! Conheci a Donna Cerimonial & Eventos pelo Instagram e gostaria de solicitar um orçamento para meu evento.

Ela já está codificada na URL (`text=Ol%C3%A1!%20Conheci...`). Para alterá-la, gere o novo trecho com
`encodeURIComponent("sua mensagem")` no console do navegador e substitua o valor de `text=` nos três links do WhatsApp.

**Como chegar:** se a empresa tiver o link direto da ficha no Google Maps (em Maps → Compartilhar → Copiar link),
ele pode substituir o link `share.google` no botão "Como chegar" e no rodapé.

## Medição (Google Analytics 4 / Meta Pixel)

Nenhum rastreamento é carregado. A estrutura já está pronta:

- cada link importante tem um atributo `data-track` (ex.: `whatsapp_orcamento_topo`);
- `assets/js/main.js` repassa esses cliques automaticamente para `gtag()` (evento `generate_lead` nos botões de WhatsApp),
  `window.dataLayer` (Google Tag Manager) e `fbq()` (evento `Contact` do Meta Pixel), **somente se** esses scripts existirem na página.

Para ativar, cole o snippet oficial no local indicado no `<head>` do `index.html`, de preferência com consentimento do visitante (LGPD).

## Testar localmente

```bash
npx serve .
# ou
python3 -m http.server 8080
```

Abra `http://localhost:8080`. Abrir o `index.html` direto do disco também funciona, mas as fontes podem não carregar por restrições do navegador.

## Decisões de design

- **Logo:** é o título principal da página (`<h1>` com texto alternativo "Donna Cerimonial & Eventos") e aparece também
  no rodapé e na imagem de compartilhamento; o ornamento da logo se repete na chamada final.
- **Conceito:** a página como um convite de casamento de luxo — moldura de borda dupla com losangos nos cantos,
  dourado aplicado como *hot stamping* (um único reflexo de luz percorre "realizamos sonhos." e, em seguida, o botão de orçamento).
- **Tipografia:** Bodoni Moda (títulos, com itálico para as palavras em dourado) e Jost (textos e botões).
- **Cores:** preto `#050505`, grafite `#151515`, dourado `#D4AF37`, dourado claro `#F5D778`, dourado escuro `#8F671C`, branco suave `#F5F2EA`.
- **Movimento:** entrada suave da abertura, revelação discreta ao rolar, brilho no botão principal ao passar o mouse.
  Tudo é desativado quando o sistema pede movimento reduzido.
- **Acessibilidade:** HTML semântico, contraste AA em todos os textos, áreas de toque de no mínimo 44 px, foco visível,
  rótulos para leitores de tela nos links externos.
- **Desempenho:** sem frameworks; HTML + CSS + JS somam cerca de 13 KB comprimidos, mais ~125 KB de fontes
  e ~110 KB da logo (pré-carregada, pois é o primeiro elemento visto).
