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

### parsing instructions

- each instruction is should be seperated by a new line (maybe semi colon later)
- states can be any string so long as they have no spaces
- symbols must be 1 character in length
    - the underscore charater is reserved as the blank value
- actions are:
    move left one symbol: <
    move right one symbol: >
    halt: -
    print: this is represented by any valid symbol prefixed with a p e.g. p$ would print '$' to the tape

### representation

option 1:
instructions = {
    state: {
               reading_sybmol: {
                                   [action, end_state]
                               }
           }
}

option 2:
handroll an actual graph implementation LUL
