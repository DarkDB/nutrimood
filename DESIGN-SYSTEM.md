# NutriMood — Design System

## Brand Identity

**Marca:** NutriMood  
**Producto:** MoodCalm  
**Posicionamiento:** Suplemento natural para el control del estrés. Science-backed, honesto, accesible.  
**Tono de marca:** Cercano, honesto, científico sin ser frío. Como un amigo que entiende de nutrición.

---

## Colores

### Paleta principal

| Token | Nombre | Hex | Uso |
|---|---|---|---|
| `primary` | Verde Bosque | `#2D4A3E` | Títulos, navbar, elementos de confianza |
| `primary-light` | Verde Medio | `#3D6B5A` | Hover states, variante clara del primario |
| `secondary` | Verde Sage | `#5C7A6E` | Texto secundario con color, badges |
| `accent` | Terracota | `#D4845A` | CTAs, botones de compra, highlights |
| `accent-hover` | Terracota oscuro | `#C07048` | Hover del botón CTA |
| `success` | Verde éxito | `#166534` | Confirmaciones, "Compra verificada", stock OK |
| `destructive` | Rojo error | `#DC2626` | Errores, stock bajo, alertas |

### Paleta de fondo y superficie

| Token | Nombre | Hex | Uso |
|---|---|---|---|
| `background` | Blanco cálido | `#FAFAF9` | Fondo general de la página |
| `card` | Blanco puro | `#FFFFFF` | Tarjetas, modales, superficies elevadas |
| `muted` | Gris cálido | `#F0EDEB` | Secciones alternadas, fondo de inputs |
| `border` | Gris borde | `#D6D3D1` | Bordes de tarjetas, separadores |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `foreground` | `#1C1917` | Texto principal |
| `muted-foreground` | `#78716C` | Texto secundario, subtítulos, descripciones |
| `primary-foreground` | `#FAFAF9` | Texto sobre fondo primario (verde) |
| `accent-foreground` | `#FFFFFF` | Texto sobre botones terracota |

### Admin / Sidebar

| Token | Hex |
|---|---|
| `sidebar` | `#2D4A3E` |
| `sidebar-foreground` | `#F0EDEB` |
| `sidebar-accent` | `#3D6B5A` |
| `sidebar-primary` | `#D4845A` |

---

## Tipografía

### Fuentes

| Rol | Familia | Variable CSS | Uso |
|---|---|---|---|
| **Heading** | Lora (Google Fonts) | `--font-heading` | H1–H6, nombres de producto, títulos de sección |
| **Body** | Raleway (Google Fonts) | `--font-body` | Todo el texto de cuerpo, UI |
| **Mono** | Geist Mono | `--font-geist-mono` | Código, datos técnicos |

### Escala tipográfica (uso en web)

| Elemento | Tamaño | Peso | Fuente |
|---|---|---|---|
| H1 hero | `text-4xl` / `text-6xl` | 700 | Lora |
| H1 página | `text-2xl` / `text-3xl` | 700 | Lora |
| H2 sección | `text-3xl` / `text-4xl` | 700 | Lora |
| H3 tarjeta | `text-lg` | 600 | Lora |
| Body large | `text-lg` | 400 | Raleway |
| Body base | `text-sm` / `text-base` | 400 | Raleway |
| Caption | `text-xs` | 400–600 | Raleway |
| Eyebrow | `text-xs` uppercase tracking-widest | 600 | Raleway |

### Convenciones tipográficas

- Los **eyebrows** (etiquetas sobre títulos) van en `uppercase tracking-widest` color `secondary`
- Los **precios** usan Lora bold para mayor impacto visual
- Las **citas** (pull quotes) van en Lora italic

---

## Espaciado y Layout

### Contenedor máximo
```
max-w-[1280px] mx-auto px-4 sm:px-6
```

### Secciones
- Padding vertical: `py-16 sm:py-24`
- Secciones alternadas usan `bg-muted` y `bg-background`

### Border radius
| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | `0.375rem` | Badges, tags pequeños |
| `radius-md` | `0.5rem` | Inputs, botones |
| `radius-lg` | `0.75rem` | Tarjetas, modales |
| Manual `rounded-xl` | `0.75rem` | Pack selector, cards producto |
| Manual `rounded-2xl` | `1rem` | Imagen producto, popup |
| Manual `rounded-full` | `9999px` | Avatares, badges pill |

---

## Componentes

### Botón primario (CTA principal)
```
bg-accent hover:bg-accent-hover text-white font-semibold
rounded-lg / rounded-xl px-6–8 py-3–3.5
```
Color: Terracota `#D4845A`  
Texto: Blanco, Raleway semibold  
Hover: `#C07048`

### Botón secundario (outline)
```
border border-primary text-primary hover:bg-muted
font-semibold rounded-lg px-6 py-3
```

### Badge / Pill
```
text-xs font-semibold px-2.5 py-1 rounded-full
```
- Verde: `bg-success/10 text-success` — verificaciones, stock OK
- Terracota: `bg-accent text-white` — "Más popular"
- Verde oscuro: `bg-primary text-white` — "Mejor precio"

### Tarjeta
```
bg-card border border-border rounded-xl p-5
shadow-[0_1px_4px_rgba(0,0,0,0.06)]
```

### Input
```
border border-border rounded-lg bg-background
px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent
```

### Eyebrow (etiqueta sobre título)
```
text-xs font-semibold text-secondary uppercase tracking-widest mb-3
```

---

## Iconografía

**Librería:** Lucide React  
**Stroke width estándar:** `1.5`  
**Tamaños:**
- Navegación / UI: `size={18}`
- Inline en texto: `size={14}` / `size={16}`
- Features / beneficios: `size={24}`
- Hero / destacado: `size={32}`+

---

## Voz y Tono

### Principios

1. **Honesto antes que vendedor** — "No es magia ni le cambiará la vida de un día para otro"
2. **Científico sin ser frío** — mencionar estudios pero en lenguaje humano
3. **Cercano, de tú a tú** — el fundador habla directamente al cliente
4. **Sin superlativosinnecesarios** — no "el mejor", sino "el más estudiado"

### Fórmulas de copy que funcionan

| Situación | Fórmula |
|---|---|
| Headline | Problema → Solución emocional |
| CTA | Acción + beneficio + precio |
| Garantía | Condición honesta + promesa clara |
| Social proof | Número concreto + contexto |
| Ingredientes | Nombre científico + dosis + qué hace |

### Ejemplos de tono

✅ *"Tómalo 3 semanas. Si no notas nada, te devolvemos el dinero."*  
✅ *"No es un milagro. Es química que funciona semana a semana."*  
✅ *"300 mg de KSM-66® — la dosis exacta de los estudios clínicos."*  
❌ *"¡El suplemento número 1 para el estrés!"*  
❌ *"Resultados garantizados en 24 horas."*

---

## Imágenes y Fotografía

### Estilo
- Tonos cálidos, naturales — paleta tierra (verdes, terracota, beige)
- Fotografía lifestyle: mujeres 28-45, entornos domésticos o de trabajo
- Sin stock genérico — preferir imágenes con contexto emocional real

### Imagen de producto
- Fondo neutro claro o `#F0EDEB`
- Objeto centrado con padding generoso
- Sin sombras artificiales exageradas

---

## Social Proof — Números oficiales

Fuente única: `src/lib/social-proof.ts`

```typescript
export const SP = {
  totalCustomers: "500+",
  reviewCount: 127,
  reviewScore: "4.9",
  weeklyBuyers: 47,
}
```

**Regla:** nunca usar números de social proof fuera de este archivo. Cambiar aquí actualiza toda la web.

---

## Estructura de URLs

| Sección | URL |
|---|---|
| Home | `/` |
| Producto | `/productos/moodcalm` |
| Carrito | `/carrito` |
| Confirmación | `/confirmacion` |
| Admin | `/admin` |
| Legal — Privacidad | `/legal/privacidad` |
| Legal — Términos | `/legal/terminos` |
| Legal — Cookies | `/legal/cookies` |

---

## Email Design

**Fuente:** Georgia, serif (body) + sans-serif (UI elements)  
**Ancho máximo:** 580px  
**Fondo:** `#FAFAF9`  
**Color texto principal:** `#57534E`  
**Color títulos:** `#1C1917`  
**Color marca:** `#2D4A3E`  
**CTA button:** `#D4845A` texto blanco  
**Pull quote:** border-left `3px solid #D4845A`

---

## Checklist de consistencia

Antes de publicar cualquier página o componente nuevo:

- [ ] ¿Usa colores del design system? (no hardcoded fuera de globals.css)
- [ ] ¿Títulos en Lora, cuerpo en Raleway?
- [ ] ¿El CTA principal es terracota `#D4845A`?
- [ ] ¿Los números de social proof vienen de `SP`?
- [ ] ¿El copy cumple los principios de voz (honesto, directo, sin superlativos)?
- [ ] ¿Es responsive — probado en 375px y 768px?
- [ ] ¿El precio tiene el formato `XX €` (no `€XX`)?
