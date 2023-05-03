# StoryDots-challenge

El proyecto comienza por la parte de Backend, desarrollada en NodeJS.
Se utiliza una API para la comunicacion con el frontend.
Los endpoints disponibles son:
 - /login : para el inicio de sesión del administrador (usuario: admin, password: admin), esto retorna un token creado con jwt que se almacena en localstorage para luego usarlo en las rutas de acceso restringido
 - /products : método GET retorna el listado de todos los productos y POST permite crear un nuevo producto
 - /products/id : metodo GET retorna un producto en detalle y GET y DELETE permiten modificarlo y eliminarlo respectivamente
 - /products/brands : retorna el listado de todas las marcas disponibles para agregar al producto

Los datos se almacenan en una base de datos SQL (el dump de la db local se encuentra en la carpeta sql para hacer un test local) y el servidor utiliza sequelize para obtener los datos de manera mas eficiente.

El frontend esta desarrollado en React, compilado con Webpack.

La interfaz consta de una navbar con acceso al inicio de la pagina y un boton de login.
Al iniciar sesion el boton de login cambia para permitir crear un producto o cerrar la sesión
En la pantalla principal se observa el listado de productos y al clickear uno se accede al detalle.
Si el administrador se encuentra logueado se visibilizan los botones para editar o eliminar el producto.
