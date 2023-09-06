# 3D Cone Viewer

This is a simple client-server web application that allows you to view a 3D cone. It provides a user-friendly interface to input cone parameters and displays the cone in a 3D view.

Front-End Repository: [Front-End Repository](https://github.com/yulia463/3D-Cone)
Back-End Repository: [Back-End Repository](https://github.com/yulia463/3d-backend)

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)


## Features

- Single page application (SPA) with both front-end and back-end components.
- User-friendly interface for entering cone parameters, including height, radius, and the number of segments on a circle.
- Client-server architecture for transferring data to the server.
- Server-side computation of cone triangulation, i.e., the set of triangles used for display.
- Display of computed triangulation in a 3D view using WebGL, leveraging the three.js library.

## Technologies

- Front-End:
    - HTML, CSS
    - JavaScript
    - Three.js

- Back-End:
    - Nest.js

## Installation
<p>Clone this repository.</p>

<p>Install dependencies</p>

```bash
yarn
```

## Running the app

```bash
yarn start
```
Open the web-browser and go to
```bash
http://localhost:3000/
```


author Yulia Slatvitskaya [Linkedin](https://www.linkedin.com/in/yulia-slatvitskaya-312670240/).
