### notes about turing machines
The program will halt when there is no valid instruction for the current state symbol pair
The success or failure of the program is determined by the state an the time of halting
### dependancies
**typescript** because I need a build step anyway so why not
I will use **svelte** and **tailwind** for the UI
maybe **skeleton UI** depending on how complex the UI ends up being
Use **vite** for bulding the project and local development

### user input
the user will provide:
0) program name (optional)
1) the start value on the tape e.g. 111_01001
2) initial state and accept state
3) instructions

all this input will be a single string/file where newlines are delimiters 
- These will be before the instructions.
- name is optional (defalt name is untitled program)

name: Binary numbers divisible by 3
init: q1
accept: q1

instruction format is in quads of the form -> state symbol_being_read action state

### instruction details

- each instruction is should be seperated by a new line (maybe semi colon later)
- states can be any string so long as they have no spaces
- symbols must be 1 character in length
    - the underscore charater is reserved as the blank value
- actions are:
    move left one symbol: <
    move right one symbol: >
    hold: -
    print: this is represented by any valid symbol prefixed with a p e.g. p$ would print '$' to the tape

### creating the instruction object
after parsing the pre instruction configuation lines
goto first instruction
split the instruction by newline
instructions.trim() to remove whitespace
remove empty instructions i.e. inst == ''

for each instruction 
 str.split it 
 trim whitespace
 remove empty tokens
throw if any instruction is not 4 tokens
for each instruction 
  if obj at instruction[0] is undefined
    create it and it transitions object
    populate its transitions object with instruction[1] and the action inst[2], inst[3]
  other wise do the same but no need to create it 

should now have an object which can be used as a graph to inform the machine what to do at every valid state symbol pair
### representation

option 1:
```
instructions = {
    state: {
               reading_sybmol: {
                                   [action, end_state]
                               }
           }
}
```

option 2:
handroll an actual graph implementation LUL
