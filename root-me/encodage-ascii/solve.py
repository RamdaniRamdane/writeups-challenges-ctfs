f = open("ch8.txt", "r")
content = f.read()
print(bytearray.fromhex(content).decode())
f.close()
