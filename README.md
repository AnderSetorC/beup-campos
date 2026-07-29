# BE UP Residencial — Landing Page

Landing page de alta conversão do **Be Up Residencial** (Campos dos Goytacazes/RJ).
Todo o tráfego é direcionado para o WhatsApp **(22) 99794-4778** com mensagem pré-pronta.

---

## 🚀 Testar local

Basta abrir o `index.html` no navegador (clique duplo). Não precisa de build, npm, nada.

```bash
# ou via servidor local (Python)
cd C:\Work\projetos\beup-campos
python -m http.server 8000
# abre http://localhost:8000
```

---

## 📁 Estrutura

```
beup-campos/
├── index.html              ← arquivo principal (entrada)
├── README.md               ← este
├── assets/
│   ├── css/style.css       ← design system completo
│   ├── js/app.js           ← simulador, carrossel, FAQ, reveal
│   └── img/
│       ├── ebook/          ← 11 imagens perspectivas do e-book ABMAIS
│       ├── campanha/       ← 8 criativos da campanha oficial
│       ├── lotes/          ← mapas oficiais de lotes
│       └── corretor/       ← foto do Cleber (cleber.jpg)
└── docs/                   ← originais só pra referência
    ├── INFO.txt
    └── Meu Book digital Be Up.pdf
```

---

## 🎯 Fluxo de conversão

Todas as ações convergem para o WhatsApp. Cada botão tem uma `data-whats` com mensagem contextual:

| Botão | Mensagem enviada |
|---|---|
| Header CTA | "Quero falar com um corretor sobre as 76 últimas unidades" |
| Hero "Quero meu lote" | "Quero garantir meu lote" |
| Hero "Falar com corretor" | "Quero falar com um corretor" |
| Corretor (foto) | "Vi o site do Be Up e gostaria de falar com você" |
| Vídeo (CTA) | "Acabei de ver o vídeo do Be Up" |
| Simulador | Envia a simulação (lote, plano, entrada, parcela) |
| FAQ / Ver mapa | "Conheça as áreas de lazer" / "Ver mapa de lotes" |
| FAB flutuante | Mensagem-padrão de entrada |
| CTA final | "Quero garantir um lote, pode me ligar" |

Todas caem no **(22) 99794-4778** — Cleber Maciel · CRECI 92622.

---

## 🎨 Paleta

- Verde principal: `#0E5C3A` / `#1F8A5C`
- Amarelo acento: `#FFC928` / `#E8B417`
- Roxo escuro: `#251543` / `#3E2665`
- WhatsApp: `#25D366`
- Creme/Papel: `#FAF6EC` / `#F2EDDF`

---

## 📤 Deploy na Vercel

1. **Suba pro GitHub:**
   ```bash
   cd C:\Work\projetos\beup-campos
   git init
   git add .
   git commit -m "feat: landing page Be Up Residencial"
   git branch -M main
   git remote add origin https://github.com/AnderSetorC/beup-campos.git
   git push -u origin main
   ```

2. **Conecte na Vercel:**
   - Acesse https://vercel.com/new
   - Importe o repositório
   - Framework preset: "Other"
   - Build command: *(vazio)*
   - Output directory: *(vazio — Vercel serve o index.html automaticamente)*
   - Deploy

3. **Domínio custom** (opcional): adicione `beup.com.br` em Settings → Domains.

---

## ✏️ Onde editar o quê

| Preciso mudar... | Arquivo |
|---|---|
| Textos / headlines | `index.html` |
| Cores / espaçamentos | `assets/css/style.css` (no `:root`) |
| Regras do simulador | `assets/js/app.js` (função `calcularSimulacao`) |
| Velocidade do carrossel | `assets/js/app.js` (`autoplay = setInterval(..., 5500)`) |
| Mapa / endereço | `index.html` (seção Localização) |

---

## 🧪 Checklist antes de subir pra produção

- [ ] Salvar a foto do corretor em `assets/img/corretor/cleber.jpg`
- [ ] Substituir placeholder do Google Maps (atualmente busca pelo endereço)
- [ ] Confirmar que o domínio está vinculado ao WhatsApp correto
- [ ] Testar simulador em desktop e mobile
- [ ] Conferir carrossel no celular (swipe)
- [ ] Verificar se todos os botões WhatsApp abrem conversa (sem "spam")
- [ ] Confirmar se o embed do YouTube carrega com som muted no mobile
- [ ] Adicionar analytics (Meta Pixel / Google Analytics) — opcional
- [ ] Adicionar Meta tags Open Graph (já tem básico — pode expandir)

---

## 📱 Redes sociais

Os links oficiais ficam no **header** (desktop) e no **rodapé**:

| Plataforma | URL |
|---|---|
| Instagram | https://www.instagram.com/loteamento_beup/ |
| Facebook | https://www.facebook.com/share/r/19ZHPjTAP7/ |
| WhatsApp | https://wa.me/5522997944778 |

Para atualizar, edite os atributos `href` em:
- `index.html` (bloco `.header-actions` — header fixo)
- `index.html` (bloco `.footer-social` — rodapé)
- `index.html` (bloco `.corretor-redes` — seção do corretor)

---

## 🎬 Vídeo do YouTube

A landing exibe um embed 16:9 responsivo entre a seção do corretor e a de localização. O ID do vídeo fica em `index.html`, na seção `.video`:

```html
<iframe src="https://www.youtube.com/embed/uRKntltZbQ4?..."></iframe>
```

Para trocar o vídeo, basta substituir `uRKntltZbQ4` pelo ID do novo YouTube.
