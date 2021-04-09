# MastermindGame

## Introduction ##
I built the game as a web app by using Spring Boot. I used Java to build the backend (setting difficulty level and getting the random number conbination). For the frontend, I use JSP page with some simple css styling as well as a JavaScript file to handle the game implementation logic (comparing the result, reducing the number of attempt, and checking if the user win).

## How to Run the App ##
Download the app with the command "git clone https://github.com/mubinbin/MastermindGame.git".

If you do not have JDK in your computer, please go to https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/index.html to install and set up environment variable accordingly. Any versions above **Java SE 11 (including Java SE 11)** should be good to run the project. Reboot you computer after finishing the setup. 

After rebooting, use the Shell or Command Prompt cd into the "**MastermindGame**" directory. And then run "**./mvnw spring-boot:run**" in Shell (or "**mvnw spring-boot:run**" in Windows Command Prompt). Make sure you are connecting the internet, since the command will check if you computer has Maven or not. If you don't, it will automatically download it for you. When the Spring Boot project is up and running, type in **http://localhost:8080/** in your web browser and you should be able to use the app. **Please connecting the internet all the time when using the app.**

## How to Play ##
You may select a difficuty level (Easy, Intermediate, or Hard) at the home page to start the game. Intermediate level will have 4 numbers to guess just as the default requirement of the coding challenge, while Easy level will have 3 numbers and Hard level will have 5 numbers, respectively. There will be instructions that will tell you about the rule of the game and what the result will be looked like. If you enter an invalid number (ex. leave the input box blank or enter a number outside the range from 0 to 7), there will be an alert poping up and prevent the game to move forward when you click the "**Check Your Answer**" button. If your input is valid, after clicking the "**Check Your Answer**" button, there will be a log showing details of your result and remaining attempts in the bottom box on the page.

If you lost, the page will give an alert, telling that you did not win and showing the correct answer. After you click "**OK**" on the alert, the page will refresh and will start a new game at the same difficulty level. If you won, similarly, there will be an alert showing the correct answer. And it will also refresh the page and restart the game at the same difficulty level after clicking the "**OK**" on the alert.

If you want to play with different difficulty level, simply click the "**Back to Homepage**" and select another level.

## Thought Process and Code Structure ##
I used the Random Number Generator API to generate the number combinations. Specifically, it is "**https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new**". However, instead of using "**num=4&min=0&max=7**", I made a function named getNumbers() and it returned a String array holding all the digits as String. It takes in 3 parameters, which are "**int num**", "**int min**", and "**int max**" so that they can be changed for different difficulty level. But, eventually, I only changed the "**num**" and kept min=0 and max=7 otherwise the game will be too difficult to play. I make a service class for this function since the main purpose for this class is to get the data from the data source. (the code is here: https://github.com/mubinbin/MastermindGame/blob/main/src/main/java/com/mb/masterMindGame/services/GameService.java)

