# Donna Cerimonial & Eventos · Bio Link

Página de bio link para o Instagram da **Donna Cerimonial & Eventos** (Glória, Vila Velha — ES).
O objetivo principal é levar o visitante ao WhatsApp para solicitar um orçamento.

**No ar:** https://donna-cerimonial.pages.dev/ (Cloudflare Pages)

É um site estático, sem etapa de build e sem dependências: HTML, CSS e um pequeno arquivo JavaScript.
Tudo o que vai ao ar fica na pasta `public/`.

## Estrutura

```
public/                                 tudo o que é publicado
  index.html                            página completa (seções, links, metadados, ícones SVG)
  _headers                              cabeçalhos de segurança e cache do Cloudflare Pages
  assets/css/styles.css                 estilos, cores, tipografia e animações
  assets/js/main.js                     revelação ao rolar + medição de cliques (opcional)
  assets/fonts/                         Bodoni Moda e Jost (SIL Open Font License), hospedadas localmente
  assets/img/logo-donna.webp            logo original (recorte do arquivo enviado, sem alterações)
  assets/img/logo-ornamento.webp        ornamento da própria logo, usado na chamada final
  assets/img/og-image.jpg               imagem de compartilhamento (1200 × 630)
  assets/img/eventos/                   fotografias reais de eventos da Donna
  favicon-32.png, icon-192.png,
  apple-touch-icon.png                  ícones feitos com o "D" da logo
tools/og-image.html                     modelo para regenerar a imagem de compartilhamento (não é publicado)
```

## Logo

A logo usada é exatamente o arquivo enviado pela Donna: apenas a área transparente vazia ao redor foi recortada.
Desenho, tipografia, cores e proporções estão intactos.

O arquivo original tem uma sombra preta atrás das letras douradas. Para que ela não apareça como um retângulo,
tudo o que fica atrás da logo usa preto absoluto (`--logo-backing: #000` em `styles.css`): a moldura da abertura,
a moldura da chamada final e o rodapé. Se mudar essas cores de fundo, mantenha o preto absoluto atrás da logo.

Para trocar a logo no futuro, substitua `public/assets/img/logo-donna.webp` mantendo o nome do arquivo
e ajuste `width`/`height` no `index.html` se as proporções mudarem.

## Fotografias

Fotos reais enviadas pela Donna, apenas recortadas para remover as bordas pretas e brancas:

| Arquivo (`public/assets/img/eventos/`) | Onde aparece |
| --- | --- |
| `casamento-convidados.jpg` | cartão **Casamentos** |
| `15-anos-decoracao.jpg` | cartão **Festas de 15 anos** |
| `15-anos-vestido-luzes.jpg`, `15-anos-pista.jpg`, `casamento-cerimonia.jpg` | galeria "Registros de celebrações Donna" |

As fotos recebidas têm 480 px de largura, o que fica um pouco suave em telas de alta densidade.
Os arquivos originais da câmera/fotógrafo (1600 px ou mais) deixariam tudo mais nítido: basta substituir
os arquivos mantendo os nomes e atualizar `width`/`height` no `index.html`.

**Para colocar foto em outro cartão** (Aniversários, Eventos sociais, Eventos personalizados):

1. salve a foto em `public/assets/img/eventos/` (JPG ou WebP, paisagem 3:2, idealmente 1600 × 1067 px, até ~250 KB);
2. no `index.html`, descomente o `<img>` do cartão, ajuste o nome do arquivo e escreva um `alt` que descreva a foto;
3. acrescente a classe `moment--photo` ao `<li>` do cartão.

Para incluir mais fotos na galeria, copie um `<li class="gallery__item">` e troque imagem, `alt` e legenda.
Use somente registros reais de eventos da Donna, com autorização de uso de imagem das pessoas fotografadas.

## Publicação (Cloudflare Pages)

O site está publicado no projeto **donna-cerimonial** do Cloudflare Pages: https://donna-cerimonial.pages.dev/

Para publicar uma nova versão depois de alterar arquivos em `public/`:

```bash
npx wrangler pages deploy public --project-name donna-cerimonial --branch main
```

(É preciso estar autenticado no Cloudflare: `npx wrangler login`, ou a variável `CLOUDFLARE_API_TOKEN`.)

**Domínio próprio:** no painel do Cloudflare, em Workers & Pages → donna-cerimonial → Custom domains,
adicione o domínio (ex.: `donnacerimonial.com.br`). Depois, troque `https://donna-cerimonial.pages.dev`
pelo novo endereço no `<head>` do `index.html` (canonical, og:url, og:image, twitter:image e JSON-LD) e publique novamente.

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

Para ativar, cole o snippet oficial no local indicado no `<head>` do `public/index.html`, de preferência com consentimento do visitante (LGPD).

## Testar localmente

```bash
npx serve public
# ou
python3 -m http.server 8080 --directory public
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
- **Desempenho:** sem frameworks; HTML + CSS + JS somam cerca de 14 KB comprimidos, mais ~125 KB de fontes
  e ~110 KB da logo (pré-carregada, pois é o primeiro elemento visto). As fotos (~155 KB no total) só carregam
  quando o visitante se aproxima da seção.
