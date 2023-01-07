# Imagehost-API
RESTful express API backend built to host images, its titles, and descriptions.

Uses multer as middleware to save and filter images that are received through the API, and uses SQLite to store extra data associated with an image.

# API commands
`GET /photos/all` returns array of all uploaded files

`POST /photos/upload` receives form data for {image, title, description} and uploads image to server

`PUT /photos` receives form data for {filename, title, description} and modifies the title and description for the file that matches filename

`DELETE /photos` receives form data for {filename} and deletes file from server
