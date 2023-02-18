Sprint 2: Echo

Contributors: Grace Wan and Naicheng He

Estimated Time: 10hrs

Repository Link: https://github.com/cs0320-s2023/sprint-2-gwan1-nhe6

Design choices: Our program uses a "Command" type that works like an interface to represent each command entered into the repl. When a command is entered in the repl it is passed through a serious of if statements that check if the command entered is valid command . If the command exists and is entered properly the function that corresponds to the given command will then be called, and if the command is accompanied by the appropriate number of arguments the function will execute and information will be dispalyed on the screen. If a command is entered that does not exist in the program or if it is entered incorrectly, with the wrong number of arguments, an error message will be printed on the screen and the user will be prompted to enter a new command.

Classes/Interfaces: Each command entered in the repl is represented as an instance of the command interface.

Errors/Bugs: None that we are aware of.

Tests: There are two testing files in our project: main.test.ts and SearchData.test.ts. The main.test.ts file tests the interal functionality of our program, specifically the functionality of the various methods. The SearchData.test.ts file tests the functionality of mocked searching data that simulates backend input.

How to run tests:

Open a new terminal window
Run 'npm test'
How to build and run your program:

Open terminal window
Run the following commands
'npm install'
'npm install typescript'
'npx tsc -w'
If you would like to run the program in your browser
Control-Click on the index.html file in the public folder and select 'Open with Live Server'
