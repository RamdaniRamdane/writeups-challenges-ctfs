with open("ch12.txt", "r") as f:
    data = f.read()
splited = data.split()
plain = "decoded"
for i in splited:
    plain += chr(int(i, 16))
print(plain)
