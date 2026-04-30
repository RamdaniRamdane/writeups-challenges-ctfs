import base64
import socket
import zlib


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


HOST = "challenge01.root-me.org"
PORT = 52022
try:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
        client.connect((HOST, PORT))
        print(bcolors.OKCYAN + "[ + ] Connected to server :")
        while True:
            data = client.recv(1024).decode()
            if not data:
                print(bcolors.FAIL + "[ - ] Disonnected")
                break
            elif data and "flag" in data:
                data = data.split(" ")
                print(
                    bcolors.OKGREEN
                    + "[ REY ] FLAG found :"
                    + data[data.index("flag:") + 1]
                )
                break
            print(data)
            data = data.split(" ")
            print(
                bcolors.UNDERLINE + "=> Cipher to decrypt : ",
                data[data.index("What") - 1],
            )
            decode = base64.b64decode(data[data.index("What") - 1])
            plain = zlib.decompress(decode) + b"\n"
            print(bcolors.BOLD + "=> Plain : ", plain)
            print("\n")
            client.sendall(plain)
except Exception as e:
    print(bcolors.FAIL + "[ x ] Problem : ", e)
