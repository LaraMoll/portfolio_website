import time
import make_your_character
# Cozy Farm - Simple Text-Based Game with Timer
riddle_tries = 3
# Choose a name  function 
# def choose_name():
#     while True:
#         name_question = input("Hey Farmer! what is your name? ").lower()

#         continue_name = input(f"Oh! {name_question} is such a nice name! do you want to continue? Yes or No: ").lower()
#         if continue_name == "no":
#             print("Oh choose again.")
#             return choose_name()
#         if continue_name == "yes":
#             print("Girly that name slayed ")
#             # start_game()
#             break


# Initialize player stats
player_hp = 100
farmers_name = []
def start_game():
    global player_hp
    global farmers_name
    # Record the start time
    start_time = time.time()
    
    
    print("Welcome to Cozy Farm!")
    farm_name = input("You are the proud owner of a new farm! What would you like to name your farm?\n")
    print(f"Wow, {farm_name} is a fantastic name for your farm!")

    
    print("\nYour first task is to get some tools. Why don't you visit Annie the blacksmith? She lives by the west lake.")
    # print("Type 'm' to open your map.")
    
    while True:
        map_choice = input("Where do you want to go? Type 'w' to walk west.\n")
        if map_choice.lower() == 'w':
            visit_blacksmith(start_time)
            break
        else:
            print("Try again, you need to head west!")

def visit_blacksmith(start_time):
    global player_hp
    global farmers_name
    print("\n--- You have arrived at the blacksmith ---")
    farmer_name = input("Annie: Well, look who it is! The new farmer! What's your name?\n")
    print(f"Annie: Nice to meet you, {farmer_name}! I have some old rusty tools for you, but I need a favor first.")
    farmers_name.append(farmer_name)
    
    while True:
        task_choice = input("Can you pick 5 apples for me? Type 'yes' or 'no'.\n").lower()
        if task_choice == 'no':
            print("Annie: Ah, what a shame, no tools for you then, haha!")
            break
        elif task_choice == 'yes':
            print("Annie: Great! You can find apples in the fruit tree forest, go pick some for me.")
            apple_quest(start_time)
            break
        else:
            print("Please type 'yes' or 'no'.")

def apple_quest(start_time):
    global player_hp
    global farmers_name
    print("\n--- On your way to the fruit tree forest, you encounter a riddle ---")
    print("\n--- You have 3 tries left. ---")
    riddle_tries = 3
    # First Riddle
    while riddle_tries > 0:
        riddle_answer = input("Riddle: 'I am tall when I am young, and short when I am old. What am I?'\n").lower()
        if riddle_answer == "candle":
            print("Correct! You may proceed.")
            player_hp += 30  # Increase HP for solving the riddle
            break
        else:
            riddle_tries -= 1
            if riddle_tries > 0:
                print(f"Unfortunately, that is not the right answer. you have {riddle_tries} tries left.")
            else: 
                print("Oh you dont have any tries left. the correct answer was 'candle'")
                break

    print("\n--- You have picked 5 apples and are heading back to Annie ---")
    
    # Second Riddle (Math Riddle)
    print("\n--- On your way back, you encounter another riddle ---")
    while riddle_tries > 0:
        math_riddle_answer = input("Riddle: 'If a farmer has 24 apples and wants to divide them equally into baskets, "
                                    "with each basket holding 6 apples, how many baskets will he need?'\n")
        if math_riddle_answer.isdigit() and int(math_riddle_answer) == 4:
            print("Correct! You've done well!")
            player_hp += 30  # Increase HP for solving the second riddle
            break
        else:
            riddle_tries -= 1
            if riddle_tries > 0:
                print(f"That's not quite right. Give it another shot!. you have {riddle_tries} tries left.")
            else: 
                print("Oh you dont have any tries left. the correct answer was '4'")
                break


    return_to_blacksmith(start_time)

def return_to_blacksmith(start_time):
    global player_hp
    global farmers_name
    print("\nYou are back at Annie's.")
    print("Annie: Thanks for the apples! Here are your tools. Good luck with your farm!")
    
    # Calculate playtime
    elapsed_time = time.time() - start_time
    elapsed_minutes = int(elapsed_time // 60)
    elapsed_seconds = int(elapsed_time % 60)
    
    print(f"\n--- Congratulations! You have completed the first quest and received your tools ---")
    print(f"You played for {elapsed_minutes} minutes and {elapsed_seconds} seconds.")
    print(f"Current HP: {player_hp}")
    print("Now head back to your farm to start planting crops. Good luck on your new adventure!")
    
    # Start the farming mini-game
    farming_game()

def farming_game():
    global player_hp
    global farmers_name
    print("\n--- Welcome to your farm! It's time to plant some crops. ---")
    crops_planted = 0

    while True:
        print("\nYou have the following crops to choose from:")
        print("1. Wheat")
        print("2. Carrot")
        print("3. Corn")
        print("4. Exit planting mode")
        
        crop_choice = input("What would you like to plant? (Type the number)\n")
        
        if crop_choice == '1':
            crops_planted += 1
            print("You planted some Wheat!")
        elif crop_choice == '2':
            crops_planted += 1
            print("You planted some Carrots!")
        elif crop_choice == '3':
            crops_planted += 1
            print("You planted some Corn!")
        elif crop_choice == '4':
            print(f"\nYou have planted a total of {crops_planted} crops. Great job!")
            break
        else:
            print("Please select a valid option.")

        # Ask if they want to continue planting
        if crop_choice in ['1', '2', '3']:
            more_crops = input("Would you like to plant more crops? (yes/no)\n").lower()
            if more_crops != 'yes':
                print("Exiting planting mode.")
                break

    print("Your farm is looking good! Keep planting and growing your crops to make your farm successful.")

    # Start the mini text-based game
    mini_text_game()

def mini_text_game():
    global player_hp
    global farmers_name
    print("\n--- Mini Text-Based Game: Guess the Number! ---")
    secret_number = 7  # Example number
    attempts = 0

    while riddle_tries > 0:
        guess = input("Guess the secret number between 1 and 10: ")
        
        if guess.isdigit():
            guess = int(guess)
            attempts += 1
            if guess < secret_number:
                print("Too low! Try again.")
            elif guess > secret_number:
                print("Too high! Try again.")
            else:
                print("Congratulations! You've guessed the number!")
                player_hp += 20  # Gain HP for completing the mini-game
                break
        else:
            print("Please enter a valid number.")

    print(f"Your current HP: {player_hp}")

    fishing_game_text()

# function for the fishing game text 
def fishing_game_text():
    global player_hp
    global farmers_name
    wrong_count = 3
    print("\n---  Now that you have watered and planted your crops.  ---")
    print("--- Let's try out fishing ---")

    # A wrong count if a user says the wrong for more than 3 times they get forced go to to that place. 
    while wrong_count > 0:
        map_choice = input("Where do you want to go?\n1. West lake\n2. Beach \n").lower()
        
        if map_choice == '2':
            print("Good choice! Let's head to the beach.")
            fishing_game()
            break
        
        elif map_choice == '1':
            wrong_count -= 1
            if wrong_count > 0:
                print("This is not the beach, choose again")
            else:
                print("I SAID GO TO THE BEACH! I'm done with you. You're forced to go to the beach now.")
                fishing_game()
                break 
        else:
            wrong_count -= 1
            if wrong_count > 0:
                print(f"Invalid choice. What's so hard about typing 1 or 2? ")
            else:
                print("Honestly, I'm done with you. You're going to the beach whether you like it or not.")
                fishing_game()
                break 

# Fishing game function
def fishing_game():
    global player_hp
    global farmers_name
    # wrong_count = 3
    print("\n--- You arrived at the beach and see a fish shop ---")
    # fish_shop = input("--- do you want to go to the shop, yes or no  ---").lower()
    
    # While loop to visit the fish shop.
    while True:
        fish_shop = input("do you want to go to the shop, yes or no\n").lower()
        # If player types in yes then the farmer goes to the fishshop
        if fish_shop == "yes":
            print("\n--- You walk towards the shop ---")
            break
        # If the player types in no, the player still goes to the fishshop < im not forcing or anything. but i am
        elif fish_shop == "no":
            print("\n--- Not gonna lie, you don't really have a choice. ---")
            break
        else:
            print("Thats not an option. ")
    
    print("--- Once you walk into the fish shop you see a middle aged man behind the counter ---")
    print(f"\nMiddle aged man: Oh who do we have here? {farmers_name[0]} I heard about you.\nAnyway what do you want? ")

    print(f"\n{farmers_name[0]}: I want a fishing rod so i can fish.\n")

    print(f"\nMiddle aged man: Oh oh, If you pass this riddle i'll give it to you. I'll even keep it simple for you.")
    print("--- You have 3 tries left. ---")
    riddle_tries = 3
    # First Riddle
    while riddle_tries > 0:
        riddle_answer = input("Riddle: 'I’m a fish that swims in the sea, but also a letter in the alphabet. What am I?'\n").lower()
        if riddle_answer == "c":
            print(f"\nMiddle aged man: See that was quite easy wasn't it. ")
            player_hp += 30  # Increase HP for solving the riddle
            break
        else:
            riddle_tries -= 1
            if riddle_tries > 0:
                print(f"Unfortunately, that is not the right answer. you have {riddle_tries} tries left.")
            else: 
                print("Oh you dont have any tries left. the correct answer was 'C'")
                print(f"\nMiddle aged man: Out of pity i'll just give you one. That was so sad to hear. ")
                break
    print("\n--- The middle aged man gave you fishing equipment.  ---")
    print("Middle aged man: By the way, I'm mark. See you around ")

    print("\n--- You walk out of the shop with your fishing equiptment. And you go to a place where you can fish. ---")

    while True:
        message_bottle = input("You stumble upon a message in a bottle in the sea. Do you pick it up. yes or no?  ").lower()
        
        if message_bottle == "yes":
            print("\n--- You pick it up and open the bottle to read whats inside the message ---")
            print("\n--- Oh you are very lucky to have stumbled upon me i've got a riddle for you ---")
            print("--- You have 3 tries left. ---")
            riddle_tries = 3
            # First Riddle
            while riddle_tries > 0:
                riddle_answer = input("Riddle: 'What has a head, a tail, but no body?'\n").lower()
                if riddle_answer == "fish hook" or riddle_answer == "fishhook":
                    print(f"\nWow that's correct! didn't expect that from you. ")
                    player_hp += 30  # Increase HP for solving the riddle
                    break
                else:
                    riddle_tries -= 1
                    if riddle_tries > 0:
                        print(f"Unfortunately, that is not the right answer. you have {riddle_tries} tries left.")
                        
                    else: 
                        print("Oh you dont have any tries left. the correct answer was 'Fish hook'")
                        break
            break
        elif message_bottle == "no":
            print("\n---You continue walking and go to your designated spot. ---")
            break

    
    print("\n--- You start fishing ---")
    print("  🦯")
    print("    |")
    print("    |")
    print("    |")
    print("    |    🐟")
    print("    |🐟")
    print("\n--- You did it! you caught your first fish ---")
    print("\n--- After hours of fishing you finally decide to go back to the farm. ---")


    # Farmers needs to go back to his farm because it's late
    wrong_count = 3
    while wrong_count > 0:
        map_choice = input("Where do you want to go?\n1. West lake\n2. Beach \n3. Farm \n").lower()     
        if map_choice == '1':
            wrong_count -= 1
            if wrong_count > 0:
                print("This is not the correct way to the farm, choose again")
            else:
                print("I SAID GO TO THE FARM! I'm done with you. You're forced to go to the farm now.")
                farmland()
                break 

        elif map_choice == '2':
            wrong_count -= 1
            if wrong_count > 0:
                print("This is not the correct way to the farm, choose again")
            else:
                print("I SAID GO TO THE FARM! I'm done with you. You're forced to go to the farm now.")
                farmland()
                break 
    
        elif map_choice == '3':
            print("Good choice! Let's head back to the farm.")
            farmland()
            break
        else:
            wrong_count -= 1
            if wrong_count > 0:
                print(f"Invalid choice. What's so hard about typing 1, 2 or 3? ")
            else:
                print("Honestly, I'm done with you. You're going to the farm whether you like it or not.")
                farmland()
                break 

# End of level 1. every player passes level 1.
def farmland():
    global player_hp
    global farmers_name
    print("\n---After a long day you finally arrived back to your farm. ---")
    print("\n---It's finally time to rest now. ---")

    while True:
        # It's late and the farmer needs energy for the next level. if the user types in no they lose hp, too exhausted if they type in yes they get hp because they're well rested.
        rest_now = input("Will you go to bed yes or no?. (No might give you some negative impact so choose wisely. ) ").lower()
        if rest_now == "no":
            player_hp - 50
            print("\n--- Ouch! wrong choice you pulled an all nighter and lost 50 hp because of that. ---")
            print(f"--- {player_hp} hp left now.  ---")
            break
        elif rest_now == "yes":
            player_hp + 30
            print("\n--- Good choice you feel refreshed the next day. +30 hp ---")
            print(f"--- you have {player_hp} hp. ---")
            break
                

def main():
# Start the game immediately
    start_game()

main()

