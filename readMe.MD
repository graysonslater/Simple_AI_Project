# Simple AI Project


the goal of this project is to test implimenting a simple AI interface into a web browser

## Installation

1. clone repository

2. run
    ```pip install pipenv```

3. run 
    ```pipenv --python 3.9```

4. run 
    ```pipenv shell```
    and verify that the file was created sucessfully

5. install all depencies listed in requirement.txt file using the command

    ```WSL
   pipenv install -r requirements.txt
   ```
6. Create a __.env__ file and include 

    ```SECRET_KEY=(set your own secret key) ```
    
    ```DATABASE_URL=sqlite:///dev.db```
    
    ```SCHEMA=flask_schema (or whatever schema name you want)```
    
    ```DEEPSEEK_API_KEY=sk-8d59f937022948ba94960876a0511848```

7. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
   
## React FrontEnd Installation



## requirement.txt (25 Total)

    -i https://pypi.org/simple 

used with pip to instruct it to use the specified URL as the base for finding and downloading Python packages.

ensures that pip looks for packages on the official PyPI repository

    alembic==1.9.2; python_version >= '3.7' 

database migration tool for SQLAlchemy 

    click==8.1.3; python_version >= '3.7' 

package for creating command line interfaces

    flask==2.2.2; python_version >= '3.7' 

web application frame work

    flask-cors==3.0.10 
    
extension for  CORS sharing in FLask apps

    flask-login==0.6.2; python_version >= '3.7' 

Provides user session management for Flask, verifies that user is logged in

    flask-migrate==4.0.2; python_version >= '3.6'

extension that handles SQLAlchemy database migrations for Flask applications.

    flask-sqlalchemy==3.0.2; python_version = '3.7'

Adds SQLAlchemy support to Flask applications, so allowing Web app framework to interact with DB

    flask-wtf==1.1.1; python_version = '3.7'

Simple integration of Flask and WTForms, including CSRF protection.

    greenlet==3.0.1; python_version = '3.7'

A lightweight concurrent programming library, collection of tools and functions that enable programs that can execute multiple tasks simultaneously or manage concurrent processes efficiently. 

enables cooperative multitasking within a single thread. It provides a way to create and manage lightweight coroutines, also known as "greenlets,"

Greenlets are often used in conjunction with other frameworks to provide higher-level abstractions and asynchronous I/O capabilities

    gunicorn==20.1.0; python_version = '3.5'

Web Server Gateway Interface (WSGI). Gunicorn is a robust and efficient solution for deploying Python web applications

A master process manages multiple worker processes,The master process handles worker lifecycle and client connections, Worker processes handle all request processing

USED FOR DEPLOYING WEB APPLICATIONS (not to be confused with Werkzeug)

    importlib-metadata==6.9.0; python_version < '3.10'

A library to access the metadata for Python packages.

Offers a standardized way to retrieve information about packages, such as their version, author, and dependencies. Get details about installed distributions

    itsdangerous==2.1.2; python_version = '3.7'

Various helpers to pass data to untrusted environments securely.

    jinja2==3.1.2; python_version = '3.7'

A template engine for Python, provides a flexible and expressive syntax for creating dynamic content in various formats

Allows creation of base templates that can be extended by child templates, promoting code reuse and maintainability

Supports control structures like loops and conditionals, allowing for complex logic within templates

Helps prevent cross-site scripting (XSS) attacks

Integration with web frameworks: Commonly used with Flask

    mako==1.2.4; python_version = '3.7'

templating language for Python, allows developers to generate dynamic content by combining static templates with data.

contains special syntax for inserting dynamic content, often using curly braces or other delimiters

support for conditional statements, loops, and other programming constructs within the template

provides a familiar syntax that borrows from other templating languages while maintaining close ties to Python's semantics

    markupsafe==2.1.2; python_version = '3.7'

designed to safely handle untrusted strings when generating HTML or XML content.

Provides a mechanism to escape special characters, preventing potential security vulnerabilities such as cross-site scripting (XSS) attacks.

MarkupSafe replaces characters that have special meanings in HTML/XML with their corresponding entity references.

implements a special text object called Markup that wraps escaped strings and prevents double-escaping

 essential to handle user-generated content or dynamic data in HTML/XML output, ensuring that the resulting markup is safe from injection attacks

    python-dateutil==2.8.2; python_version = '2.7' and python_version not in '3.0, 3.1, 3.2'

Extensions to the standard Python datetime module

    python-dotenv==0.21.0; python_version = '3.7'

Reads key-value pairs from a .env file and sets them as environment variables.

    python-editor==1.0.4

Programmatically open an editor, capture the result.

    setuptools==69.0.2; python_version = '3.8'

Easily download, build, install, upgrade, and uninstall Python packages.

    six==1.16.0; python_version = '2.7' and python_version not in '3.0, 3.1, 3.2'

library designed to facilitate compatibility between Python 2 and Python 3. It provides a set of utilities to smooth over the differences between these two major versions of Python

    sqlalchemy==1.4.46; python_version = '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3, 3.4, 3.5'

SQL toolkit and Object-Relational Mapping (ORM) library

    werkzeug==2.2.2; python_version = '3.7'

Web Server Gateway Interface (WSGI) web application library for Python.

offers powerful objects for handling HTTP requests and responses, simplifying the process of working with headers, query arguments, form data, files, and cookies

comes with a built-in threaded WSGI server for local development

FOR BUILDING WEB APPLICATIONS (do not confuse with gunicorn)

    wtforms==3.0.1; python_version = '3.7'

A flexible forms validation and rendering library for Python

    zipp==3.17.0; python_version = '3.8'

allows users to interact with ZIP files

It provides backward compatibility for newer features in older Python versions

supports iterating through ZIP contents, including nested directories

## React-Vite dependencies

    js-cookie

JavaScript API for handling browser cookies

    react

JavaScript library for building user interfaces, known for its component-based architecture 

    react-dom

serves as the bridge between React and the Document Object Model

rendering React components to the DOM and managing updates efficiently

    react-icons

library offering popular icon sets as React components

    react-redux

React bindings for Redux, allowing React components to interact with a Redux store

    react-router-dom

routing for React applications, enabling navigation and URL management

    redux

used for managing application state

   redux-thunk

Middleware for Redux that allows writing action creators that return functions instead of actions,
    
    @types/react and @types/react-dom

TypeScript type definitions

    @vitejs/plugin-react

Vite plugin that provides React refresh support

    eslint

A tool for identifying and reporting on patterns in JavaScript.

    eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh

ESLint plugins for React-specific linting rules

    redux-logger

middleware for Redux that logs actions and state changes

    vite

build tool for deployment 

    vite-plugin-eslint

Vite plugin to integrate ESLint into the build process    