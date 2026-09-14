import time

def stopwatch():
    start_time = time.time()  # Start tracking real time since the account creation
    hp = 100  # User starts with 100 HP
    
    while True:
        passed_time = time.time() - start_time  # Calculate the time passed since the stopwatch started
        hours, remainder = divmod(passed_time, 3600)  # Get number of full hours
        minutes, seconds = divmod(remainder, 60)  # Get minutes and seconds from the remainder

        # Print the current stopwatch time in the format HH:MM:SS
        print(f"Timer: {int(hours):02}:{int(minutes):02}:{int(seconds):02}", end="\r")
        time.sleep(1)  # Wait for 1 second before updating

        # Stop after 1 minute (60 seconds)
        if passed_time >= 60:
            print("\nOne minute has passed! Timer stopped.")
            break

# Run the stopwatch
stopwatch()
