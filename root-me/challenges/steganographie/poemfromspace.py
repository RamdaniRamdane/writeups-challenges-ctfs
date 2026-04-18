with open("ch19.txt") as f:
    file = f.read()
    binary = ""
    print(file)
    for i in file:
        if i == " ":
            binary += "0"
        if i == "\t":
            binary += "1"

    print(binary)
    extra = len(binary) % 8
    if extra != 0:
        print(f"\nWarning: binary length not multiple of 8, trimming last {extra} bits")
        binary = binary[:-extra]

    decoded_text = ""
    for i in range(0, len(binary), 8):
        byte = binary[i : i + 8]  # take 8 bits
        char = chr(int(byte, 2))  # binary -> int -> char
        decoded_text += char

    print("\nDecoded text:")
    print(decoded_text)
