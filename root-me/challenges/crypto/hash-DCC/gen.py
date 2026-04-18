with open("w.txt", "a") as file:
    for i in range(1000):
        pwd = f"Mdp!{i}@"
        file.write(pwd + "\n")

