
// Update

`curl --location --request PUT 'localhost:3000/api/contacts' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data-raw '{
    "id": "1",
    "email": "wahyuakbar.work@gmail.com",
    "name": "Wahyu Akbar Wibowo",
    "message": "Pesan"
}'`

// Delete

`curl --location --request DELETE 'localhost:3000/api/contacts' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data '{
    "id": "1"
}'`