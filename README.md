# Acalento Gestão — Landing page

Landing page institucional da Acalento Gestão. Site estático (HTML + CSS + JS puro), sem build.

## Rodar localmente

Abra `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Estrutura

```
index.html   # conteúdo e seções
styles.css   # paleta (azuis da marca + branco), layout responsivo
script.js    # menu do celular, animações de entrada, formulário de contato
assets/      # logo, favicon, ícone de app e imagem de compartilhamento
```

## Configuração

- **E-mail do formulário:** `CONTATO_EMAIL` no topo de `script.js` (atual: acalentohomecare@gmail.com). O formulário abre o
  programa de e-mail do visitante com a mensagem preenchida.

## Publicação

Por ser estático, pode ser publicado em GitHub Pages, Netlify, Vercel ou Cloudflare Pages sem
configuração extra (diretório raiz, sem comando de build).

## Paleta

| Token | Cor | Uso |
|---|---|---|
| `--blue-600` | `#0050E0` | azul profundo da marca |
| `--blue-500` | `#017BFA` | azul vivo da marca, ações |
| `--blue-100` | `#DDEDFC` | azul-gelo da marca, fundos suaves |
| `--ink` | `#0B1E3F` | texto |

Os três azuis foram amostrados do logo oficial (`docs/Logo/Logo 4.png` do repositório do MVP).
