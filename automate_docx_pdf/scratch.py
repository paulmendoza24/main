file = open("config.txt","r").read().split("<cut>")
TEMPLATE = file[0].strip()
CONTEXT = file[1].strip()
NAMES = file[2].strip().splitlines()
print(NAMES)

