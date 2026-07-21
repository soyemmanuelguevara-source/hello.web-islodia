# Ilsoldia — Informe de Marca y Requerimientos de Proyecto

Este documento es el brief de referencia para la construcción del sitio web de **Ilsoldia**. Complementa (no reemplaza) el prompt inicial ya entregado para adaptar la plantilla base al negocio. Aquí se documenta la información del negocio extraída del material disponible, la identidad de marca a aplicar y los requerimientos visuales y de interacción obligatorios.

El desarrollador trabajará sobre una **plantilla base de HTML ya existente**. Este informe no define ni sugiere la estructura de secciones de la página — esa estructura ya la define la plantilla base.

---

## 1. Información del negocio

Toda la información fue extraída directamente del logo proporcionado en `imagenes/` (única fuente disponible).

| Dato | Valor |
|---|---|
| Nombre del negocio | **Ilsoldia** |
| Rubro | Laboratorio Clínico |
| Eslogan | "Precisión que transforma resultados" |
| Correo | ilsoldia0@gmail.com |
| Teléfono | 55 6695 9724 |
| Facebook | Ilsoldia clínico |
| Instagram | Ilsoldia clínico |
| Dirección | No disponible en el material proporcionado |
| Horarios de atención | No disponible en el material proporcionado |
| Listado detallado de servicios | No disponible en el material proporcionado |

**Nota sobre servicios:** el logo no enumera servicios específicos, pero su iconografía (microscopio, tubos de ensayo, matraz, gota de sangre, doble hélice de ADN, célula/placa de análisis) confirma que el negocio se dedica a **análisis y estudios de laboratorio clínico**. Usar esto solo como orientación general de contenido, no como listado confirmado de servicios.

**Pendientes a solicitar al cliente:** dirección física, horarios de atención y listado exacto de estudios/servicios que ofrece el laboratorio. Mientras no se cuente con esa información, dejar esos espacios con placeholders claramente editables.

---

## 2. Identidad de marca (Branding)

### 2.1 Paleta de colores

Colores extraídos directamente del logo (muestreo de píxeles), listos para usar como variables de diseño:

| Uso sugerido | Color | HEX |
|---|---|---|
| Primario (marca / textos fuertes) | Púrpura oscuro | `#3C0C54` |
| Secundario | Púrpura medio | `#5C2D80` |
| Acento | Lila claro | `#9B7CAE` |
| Fondo suave / detalles | Lila pálido | `#EDE1F5` |
| Fondo principal | Blanco / off-white | `#FCFBFE` |
| Texto sobre fondo claro | Gris casi negro con matiz púrpura | `#1A1425` |

El logo usa **degradados** entre el púrpura oscuro y el lila claro (visibles en los tubos de ensayo y la hélice de ADN). Se recomienda reutilizar este degradado en elementos destacados del sitio (botones, fondos de sección, hover states) para mantener consistencia con la marca.

### 2.2 Tipografía sugerida

El logotipo combina dos familias tipográficas claramente diferenciadas:

- **"Ilsoldia" (wordmark):** serif elegante de alto contraste (trazos gruesos/finos). Para el sitio, usar una serif de carácter similar en títulos y hero, por ejemplo **Playfair Display** o **DM Serif Display**.
- **"LABORATORIO CLÍNICO" y textos de contacto:** sans-serif geométrica limpia. Para el sitio, usar una sans-serif similar en cuerpo de texto, menús y UI, por ejemplo **Poppins** o **Montserrat**.

Esta combinación serif (títulos) + sans-serif (cuerpo) debe mantenerse en todo el sitio para conservar la identidad del logo.

### 2.3 Identidad visual

- Iconografía asociada a la marca: microscopio, tubos de ensayo, matraz, gota de sangre, hélice de ADN, célula/placa de análisis. Si se usan íconos o ilustraciones adicionales en el sitio, deben mantener este lenguaje visual científico/clínico.
- Estética general del logo: limpia, con degradados suaves en tonos púrpura sobre fondo claro. El sitio debe sentirse como una extensión directa del logo, no como un diseño genérico al que se le "pegó" el logo.

---

## 3. Estilo visual obligatorio

El sitio debe transmitir:

- **Estilo premium, enterprise y corporativo de marca.**
- **Nivel big tech:** elegante y a la vez minimalista.

Todo elemento de diseño (tipografía, espaciados, colores, componentes) debe reforzar esta percepción de solidez y profesionalismo, evitando recursos genéricos o "de plantilla gratuita".

---

## 4. Efectos y animaciones requeridos

El sitio debe incluir:

- **Efectos visuales y animaciones de scroll** (elementos que aparecen/se transforman al hacer scroll).
- **Pantalla de carga (preloader)** con spinner + logo del negocio.
- **Animaciones en el título del hero:** efecto de máquina de escribir, cambio de color en las letras, u otros efectos tipográficos equivalentes.

---

## 5. Instrucciones sobre assets

- El logo se encuentra en `imagenes/` pero **viene con fondo**. Es obligatorio removerle el fondo antes de usarlo en el sitio (exportar en PNG con transparencia; si es posible, generar también una versión vectorial/SVG).
- Generar, a partir del logo sin fondo, una **versión alterna en blanco o monocromática** para usarla sobre fondos oscuros (por ejemplo, footer o secciones con fondo púrpura oscuro), ya que el logo original está pensado para fondo claro.
- No se proporcionaron fotografías del local, personal ni de servicios. Hasta que el cliente entregue material propio, usar imaginería genérica de laboratorio clínico/científica coherente con la paleta e identidad visual definidas en este documento, dejando claramente marcado qué imágenes son temporales y deben reemplazarse.

---

## 6. Nota para el desarrollador

Este proyecto está pensado para construirse de forma iterativa con **Claude Code**. El desarrollador puede darle instrucciones a Claude las veces que sea necesario —ajustando estilos, animaciones, textos o componentes— hasta lograr el resultado deseado. No es necesario llegar a la versión final en un solo intento.

---

## 7. Checklist para el desarrollador

- [ ] Remover el fondo del logo y exportar en PNG transparente (y SVG si es posible)
- [ ] Generar versión en blanco/monocromática del logo para fondos oscuros
- [ ] Aplicar la paleta de colores definida (sección 2.1) como variables de diseño
- [ ] Implementar la tipografía sugerida (serif en títulos/hero, sans-serif en cuerpo y UI)
- [ ] Incorporar los datos de contacto reales (correo, teléfono, Facebook, Instagram)
- [ ] Marcar como pendiente/placeholder la dirección, horarios y listado de servicios hasta recibir esa información del cliente
- [ ] Implementar pantalla de carga (preloader) con spinner + logo
- [ ] Implementar animaciones/efectos de scroll en el sitio
- [ ] Implementar animación tipográfica en el título del hero (máquina de escribir, cambio de color u otro efecto equivalente)
- [ ] Validar que el resultado final se perciba premium, enterprise y minimalista (nivel big tech)
- [ ] Iterar con Claude Code las veces que sea necesario hasta lograr el resultado deseado
