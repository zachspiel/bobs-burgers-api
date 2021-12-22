import json

file = open('data.json')
data = json.load(file)
fixed_characters = []

index = 1
for i in data['endCreditsSequence']:
    print(index)
    formatted_character = i
    formatted_character["id"] = index

    formatted_character["url"] = "http://bobs-burgers-api/endCreditsSequence/" + \
        str(index)
    fixed_characters.append(formatted_character)
    index += 1

file.close()

out_file = open("new2.json", "w")

json.dump(fixed_characters, out_file, indent=6)

out_file.close()
