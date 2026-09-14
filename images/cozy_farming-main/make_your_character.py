# import demo_level1
# Skin tone list 
skin_tones_list = ["Pale skin","Fair skin","Medium skin","Olive skin","Naturally brown skin","Very dark"]

# Hair color:
hair_color_list = ["Blond","Brown","Black","Ginger"]

# Eye color:
eye_color_list = ["Blue","Green","Brown","Black","Grey"]

# Body type:
body_type_list = ["Muscular","Curvy","Skinny"]

# Accessoiries: 
accessories_list = ["Straw hat","Glasses","Ribbon","Fedora hat","Necklace","Bracelet","Earrings"]

# Empty list for the farmers choice
farmer_choice = []

# Function voor als de skin tone valid is
def skin_tone_valid(skin_tone):
    # met dit wordt gechecked of het nummer van skin_tone is in a valid range zoja dan returned het true zoniet returned het false
    if skin_tone.isdigit() and 0 <= int(skin_tone) < len(skin_tones_list):
        return True
    return False

# Function voor als de hair color valid is
def hair_color_valid(hair_color):
    # met dit wordt gechecked of het nummer van skin_tone is in a valid range zoja dan returned het true zoniet returned het false
    if hair_color.isdigit() and 0 <= int(hair_color) < len(hair_color_list):
        return True
    return False

# Function voor als de eye color valid is
def eye_color_valid(eye_color):
    # met dit wordt gechecked of het nummer van skin_tone is in a valid range zoja dan returned het true zoniet returned het false
    if eye_color.isdigit() and 0 <= int(eye_color) < len(eye_color_list):
        return True
    return False

# Function voor als de body type valid is
def body_type_valid(body_type):
    # met dit wordt gechecked of het nummer van skin_tone is in a valid range zoja dan returned het true zoniet returned het false
    if body_type.isdigit() and 0 <= int(body_type) < len(body_type_list):
        return True
    return False

# Function voor als de type accessories valid is
def accessories_is_valid(accessories):
    # met dit wordt gechecked of het nummer van skin_tone is in a valid range zoja dan returned het true zoniet returned het false
    if accessories.isdigit() and 0 <= int(accessories) < len(accessories_list):
        return True
    return False

# Function voor de skin tones
def choose_skin_tone():
    while True:
        # enumerate gives you the position of the item in the list starting from 0 and the value are the things in the list.
        for index, value in enumerate(skin_tones_list):
            print(f"{index}: {value}")
        
        skin_tone_question = input("Please select a skin tone by entering a number (0-5): ")

        if not skin_tone_valid(skin_tone_question):
            print("Not in the list, choose again :(! ")
        else:
            skin_tone = skin_tones_list[int(skin_tone_question)]
            print(f"You chose: {skin_tone}")
            # skin_tone_lockin = input("Are you sure that you want this skin color. yes or no : ").lower()
            farmer_choice.append(skin_tone)
            break
            # if skin_tone_lockin == "yes":
            #     print(f"Okay! you chose: {skin_tone}")
            #     farmer_choice.append(skin_tone)
            #     break
            # if skin_tone_lockin == "no":
            #     print("")
            #     print(f"Oh okay then, choose again.")
            #     return choose_skin_tone()


# Function voor de hair color
def choose_hair_color():
    while True:
        # enumerate gives you the position of the item in the list starting from 0 and the value are the things in the list.
        for index, value in enumerate(hair_color_list):
            print(f"{index}: {value}")
        
        hair_color_question = input("Please select a hair color by entering a number (0-3): ")

        if not hair_color_valid(hair_color_question):
            print("Not in the list, choose again :(! ")
        else:
            hair_color = hair_color_list[int(hair_color_question)]
            print(f"You chose: {hair_color}")
            # hair_color_lockin = input("Are you sure that you want this hair color. yes or no : ").lower()
            farmer_choice.append(hair_color)
            break
            # if hair_color_lockin == "yes":
            #     print(f"Okay! you chose: {hair_color}")
            #     farmer_choice.append(hair_color)
            #     break
            # if hair_color_lockin == "no":
            #     print("")
            #     print(f"Oh okay then, choose again.")
            #     return choose_hair_color()
            

# Function voor de eye color
def choose_eye_color():
    while True:
        # enumerate gives you the position of the item in the list starting from 0 and the value are the things in the list.
        for index, value in enumerate(eye_color_list):
            print(f"{index}: {value}")
        
        eye_color_question = input("Please select an eye color by entering a number (0-4): ")

        if not eye_color_valid(eye_color_question):
            print("Not in the list, choose again :(! ")
        else:
            eye_color = eye_color_list[int(eye_color_question)]
            print(f"You chose: {eye_color}")
            # eye_color_lockin = input("Are you sure that you want this eye color. yes or no : ").lower()
            farmer_choice.append(eye_color)
            break
            # if eye_color_lockin == "yes":
            #     print(f"Okay! you chose: {eye_color}")
            #     farmer_choice.append(eye_color)
            #     break
            # if eye_color_lockin == "no":
            #     print("")
            #     print(f"Oh okay then, choose again.")
            #     return choose_eye_color()


# Function voor de body types
def choose_body_type():
    while True:
        # enumerate gives you the position of the item in the list starting from 0 and the value are the things in the list.
        for index, value in enumerate(body_type_list):
            print(f"{index}: {value}")
        
        body_type_question = input("Please select a body type by entering a number (0-2): ")

        if not body_type_valid(body_type_question):
            print("Not in the list, choose again :(! ")
        else:
            body_type = body_type_list[int(body_type_question)]
            print(f"You chose: {body_type}")
            # body_type_lockin = input("Are you sure that you want this body type. yes or no : ").lower()
            farmer_choice.append(body_type)
            break
            # if body_type_lockin == "yes":
            #     print(f"Okay! you chose: {body_type}")
            #     farmer_choice.append(body_type)
            #     break
            # if body_type_lockin == "no":
            #     print("")
            #     print(f"Oh okay then, choose again.")
            #     return choose_body_type()
            

# Function voor de accessories
def choose_accessories():
    while True:
        # enumerate gives you the position of the item in the list starting from 0 and the value are the things in the list.
        for index, value in enumerate(accessories_list):
            print(f"{index}: {value}")
        
        accesorries_question = input("Please select an accesorries by entering a number (0-6): ")

        if not accessories_is_valid(accesorries_question):
            print("Not in the list, choose again :(! ")
        else:
            accessories = accessories_list[int(accesorries_question)]
            print(f"You chose: {accessories}")
            farmer_choice.append(accessories)
            break
            # accessories_lockin = input("Are you sure that you want this accesorries. yes or no : ").lower()
            # if accessories_lockin == "yes":
            #     print(f"Okay! you chose: {accessories}")
            #     farmer_choice.append(accessories)
            #     break
            # if accessories_lockin == "no":
            #     print("")
            #     print(f"Oh okay then, choose again.")
            #     return choose_accessories()
            

# # Choose a name 
# def choose_name():
#     while True:
#         name_question = input("Hey Farmer! what is your name? ").lower()

#         continue_name = input(f"Oh! {name_question} is such a nice name! do you want to continue? Yes or No: ").lower()
#         name = name_question
#         if continue_name == "No":
#             print("Oh choose again.")
#             return choose_name()
#         if continue_name == "Yes":
#             print("Girly that name slayed ")
#             farmer_choice.append(name)
#         break

# Hier roep ik de funtions aan
def main():
    choose_skin_tone()
    print("")
    choose_hair_color()
    print("")
    choose_eye_color()
    print("")
    choose_body_type()
    print("")
    choose_accessories()
    print("")
    # choose_name()
    # # print(farmer_choice)


main()