import socket
import string

HOST = "challenge01.root-me.org"
PORT = 52021


def decrypte_ROT13(cypher):
    alphabet_maj = string.ascii_lowercase
    alphabet_min = string.ascii_uppercase
    plain = []
    text = ""
    for c in cypher:
        if c in alphabet_min:
            i = alphabet_min.index(c)
            plain.append(alphabet_min[(i - 13) % len(alphabet_min)])
        elif c in alphabet_maj:
            i = alphabet_maj.index(c)
            plain.append(alphabet_maj[(i - 13) % len(alphabet_maj)])
        else:
            plain.append(c)
    plain.append("\n")
    print(plain)
    text = "".join(plain)
    return text


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
    client.connect((HOST, PORT))
    print("connected to server")
    while True:
        data = client.recv(1024).decode()

        if not data:
            print("[ + ] FINISHED")
            break

        print(data)

        if len(data.split("'")) > 1:
            cypher = data.split("'")[1]
            print(cypher)
            plain = decrypte_ROT13(cypher)
            print(plain)
            client.sendall(plain.encode())
