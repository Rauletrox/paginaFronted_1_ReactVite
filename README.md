# Una U pa Delante - React + Vite

Proyecto desarrollado con React y Vite para una tienda gamer. La aplicacion muestra productos, ofertas, categorias, carrito de compra, formulario de contacto y paginas internas para combos especiales.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- Bootstrap
- CSS
- Fetch API
- LocalStorage
- GitHub Pages

## Instalacion del proyecto

Primero instala las dependencias:

```bash
npm install
```

Luego ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrara una URL local parecida a esta:

```text
http://localhost:5173/paginaFronted_1_ReactVite/
```

## Scripts disponibles

```bash
npm run dev
```

Inicia el proyecto en modo desarrollo.

```bash
npm run build
```

Genera la version final de produccion dentro de la carpeta `dist`.

```bash
npm run preview
```

Permite revisar localmente la version generada por `npm run build`.

```bash
npm run deploy
```

Construye el proyecto y lo sube a GitHub Pages usando la carpeta `dist`.

## Estructura principal del proyecto

```text
src/
  App.jsx
  App.css
  main.jsx
  components/
    Navbar.jsx
    Hero.jsx
    Carousel.jsx
    Presentacion.jsx
    Catalogo.jsx
    ProductoCard.jsx
    Carrito.jsx
    Categorias.jsx
    Destacados.jsx
    OfertaDetalle.jsx
    Footer.jsx
  data/
    siteData.js
  utils/
    paths.js
    price.js
    products.js

public/
  data/
    ofertas.json
  assets/
    img/
      logos_tienda/
      combo_familia_gaming/
      combo_gamer_cumpleanos/
      mundo_pc/
      Nintendo_essentials/
      Pack_Arcade/
      proximos_lanzamientos/
```

## Explicacion del codigo

### `src/main.jsx`

Es el punto de entrada de React. Renderiza el componente principal `App` dentro del elemento `root` del archivo `index.html`.

### `src/App.jsx`

Es el componente principal de la aplicacion. Maneja los estados mas importantes:

- `mensajeHero`: texto principal que aparece en el hero.
- `alertaHero`: mensaje que aparece al actualizar el hero.
- `productos`: lista de productos cargados desde JSON.
- `busqueda`: texto del buscador.
- `estadoProductos`: mensaje sobre la carga o busqueda de productos.
- `carrito`: productos agregados al carrito.
- `mensajeFormulario`: respuesta del formulario de contacto.
- `tarjetaActiva`: tarjeta destacada activa al pasar el mouse.
- `rutaActual`: ruta interna basada en el hash del navegador.

Tambien contiene funciones importantes:

- `cargarProductos()`: carga los productos desde `public/data/ofertas.json` usando Fetch API.
- `buscarProductos()`: filtra productos segun el texto ingresado.
- `agregarAlCarrito()`: agrega productos al carrito o aumenta su cantidad.
- `eliminarDelCarrito()`: elimina productos del carrito.
- `enviarContacto()`: valida el formulario de contacto.
- `cambiarMensajeHero()`: actualiza el mensaje del hero usando estado de React.

El carrito se guarda en `localStorage`, por eso la informacion no se pierde al recargar la pagina.

### `src/components/Navbar.jsx`

Muestra la barra de navegacion superior. Incluye enlaces a secciones de la pagina y un icono de carrito con la cantidad total de productos agregados.

### `src/components/Hero.jsx`

Muestra la seccion principal de bienvenida. Usa props para recibir el mensaje, la alerta y la funcion que actualiza el texto.

### `src/components/Carousel.jsx`

Muestra un carrusel con productos destacados. La informacion se obtiene desde `destacados`, definido en `src/data/siteData.js`.

### `src/components/Presentacion.jsx`

Muestra informacion general de la tienda y un resumen de servicios.

### `src/components/Catalogo.jsx`

Muestra el catalogo de productos, el buscador, el mensaje de estado y el boton para recargar productos. Recorre la lista de productos y crea una tarjeta `ProductoCard` para cada uno.

### `src/components/ProductoCard.jsx`

Representa cada producto del catalogo. Muestra imagen, categoria, descripcion, precio, descuento y boton para agregar al carrito.

Algunas tarjetas tambien tienen enlace a una pagina de ofertas:

- Combo Familia Gaming
- Combo Gamer Cumpleaños
- Mundo PC
- Nintendo Essentials
- Pack Arcade
- Proximos Lanzamientos

Estas paginas se abren usando rutas con hash, por ejemplo:

```text
#/ofertas/combo-familia-gaming
```

### `src/components/OfertaDetalle.jsx`

Muestra una pagina interna con las ofertas de cada combo. Recibe una oferta desde `App.jsx` y renderiza sus imagenes, titulo y descripcion.

Si la ruta no existe, muestra un mensaje de "Oferta no encontrada".

### `src/components/Carrito.jsx`

Muestra los productos agregados al carrito, el total de productos y el precio total. Tambien permite eliminar productos.

### `src/components/Categorias.jsx`

Muestra secciones informativas de categorias como Nintendo y PC Gaming.

### `src/components/Destacados.jsx`

Muestra tarjetas de videojuegos destacados. Cambia el estilo de la tarjeta cuando el usuario pasa el mouse.

### `src/components/Footer.jsx`

Contiene el formulario de contacto y la informacion final de la tienda.

## Archivos de datos

### `public/data/ofertas.json`

Contiene los productos principales del catalogo. Cada producto tiene:

- `id`
- `titulo`
- `categoria`
- `oferta`
- `descripcion`
- `precioNormal`
- `precioOferta`
- `imagen`

### `src/data/siteData.js`

Contiene datos usados por la interfaz:

- `destacados`: videojuegos destacados del carrusel y seccion de destacados.
- `resumenServicios`: servicios mostrados en la presentacion.
- `paginasOfertas`: paginas internas de cada combo con sus imagenes.
- `rutasOfertasPorTitulo`: relacion entre el titulo del producto y la ruta de su pagina de ofertas.

## Utilidades

### `src/utils/paths.js`

Contiene la funcion `publicPath()`. Sirve para crear rutas correctas hacia archivos publicos, considerando el `base` configurado en Vite.

Esto es importante para que las imagenes funcionen tanto en desarrollo como en GitHub Pages.

### `src/utils/price.js`

Contiene funciones para trabajar con precios:

- Formatear precios.
- Calcular descuento.
- Calcular ahorro.
- Calcular total del carrito.
- Calcular cantidad total de productos.

### `src/utils/products.js`

Contiene la funcion para filtrar productos segun el texto escrito en el buscador.

## Configuracion para GitHub Pages

En `vite.config.js` esta configurada la base del proyecto:

```js
export default defineConfig({
  plugins: [react()],
  base: '/paginaFronted_1_ReactVite/',
});
```

El valor de `base` debe coincidir con el nombre del repositorio en GitHub. En este caso, el repositorio deberia llamarse:

```text
paginaFronted_1_ReactVite
```

En `package.json` tambien esta configurado:

```json
"homepage": "https://Rauletrox.github.io/paginaFronted_1_ReactVite/",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

## Como subir el proyecto a GitHub

1. Crea un repositorio en GitHub llamado `paginaFronted_1_ReactVite`.

2. Inicializa Git en el proyecto si aun no esta inicializado:

```bash
git init
```

3. Agrega los archivos:

```bash
git add .
```

4. Crea el primer commit:

```bash
git commit -m "Proyecto React Vite tienda gamer"
```

5. Conecta el repositorio local con GitHub:

```bash
git remote add origin https://github.com/Rauletrox/paginaFronted_1_ReactVite.git
```

6. Sube el codigo a GitHub:

```bash
git branch -M main
git push -u origin main
```

## Como publicar en GitHub Pages

Primero asegurate de tener instalado el paquete `gh-pages`. Este proyecto ya lo tiene en `devDependencies`, pero si fuera necesario se puede instalar con:

```bash
npm install gh-pages --save-dev
```

Luego publica la pagina:

```bash
npm run deploy
```

Este comando ejecuta primero:

```bash
npm run build
```

Despues sube la carpeta `dist` a una rama llamada `gh-pages`.

## Activar GitHub Pages en el repositorio

Despues de ejecutar `npm run deploy`:

1. Entra al repositorio en GitHub.
2. Ve a `Settings`.
3. Entra a `Pages`.
4. En `Build and deployment`, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/root`
5. Guarda los cambios.

La pagina quedara publicada en:

```text
https://Rauletrox.github.io/paginaFronted_1_ReactVite/
```

## Recomendaciones importantes

- Si cambias el nombre del repositorio, tambien debes cambiar el valor de `base` en `vite.config.js`.
- Si cambias el usuario de GitHub, debes actualizar `homepage` en `package.json`.
- Las imagenes deben estar dentro de `public/assets/img`.
- Para enlazar imagenes se usa `publicPath()` y rutas como `assets/img/carpeta/imagen.png`.
- Antes de publicar, conviene ejecutar:

```bash
npm run build
```

Asi se verifica que el proyecto compile correctamente.
