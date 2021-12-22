import json

file = open('data.json')
data = json.load(file)
fixed_characters = []

for i in data['characters']:
    formatted_character = {}
    formatted_character["id"] = i["id"]

    if "name" in i:
        formatted_character["name"] = i["name"]

    if "age" in i:
        formatted_character["age"] = i["age"]

    if "gender" in i:
        formatted_character["gender"] = i["gender"]

    if "hairColor" in i:
        formatted_character["hairColor"] = i["hairColor"]

    if "occupation" in i:
        formatted_character["occupation"] = i["occupation"]

    if "relatives" in i:
        formatted_character["relatives"] = i["relatives"]

    formatted_character["url"] = i["url"]
    fixed_characters.append(formatted_character)

file.close()
out_file = open("new.json", "w")
json.dump(fixed_characters, out_file, indent=6)
out_file.close()
