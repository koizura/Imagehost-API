# Imagehost-API 2

RESTful express API backend built to host images, its titles, and descriptions.

Uses multer as middleware to save and filter images that are received through the API, and uses SQLite to store extra data associated with an image.

Frontend is built with React.

# API requests

`GET /photos/all` returns array of all uploaded file data (filename, title, description, timestamp). Note that minimized versions of images exist in the format of "min.filename.png" for faster loading thumbnails.

`POST /photos/upload` receives form data for {image, title, description} and uploads image to server

`PUT /photos/:filename` receives form data for {title, description} and modifies the title and description for the file that matches filename

`DELETE /photos/:filename` deletes file from server

# How can I use this on my computer?

1. Run `git clone https://github.com/koizura/Imagehost-API-2` in your terminal.
2. Run `cd Imagehost-API-2` to move into the directory.
3. open a second terminal at the same location. One for the backend, and another for the frontend.
4. Run `cd api` and then run `npm i` to install all the dependencies used for the backend.
5. Run `node server.js` to start the server
6. Go to your second terminal. Run `cd frontend` to move into the frontend folder, then run `npm i` to install all frontend dependencies.
7. Run `npm start` to start the react website server. This should take a moment to load on your browser.
