import assert from "assert";
import { argv } from "process";

const state_pattern = /^q\d+$/;
const instructions = [">", "<", "p1", "p0"];

function validate_state(state) {
  assert(state_pattern.test(state), `state: ${state} is not valid.`)
}
function validate_input_symbol(symbol, alternate_alphabet_regex) {
  const alphabet = alternate_alphabet_regex || /[01]/
  assert(alphabet.test(symbol))
}
function parse_input(input) {
  let instruction = input.split();
  validate_state(instruction[0])
  return instruction
}
function load_input(debug_input = false) {
  // returns a tape with the input loaded
  if (debug_input) {
    // get input from the commandline
  }

  return [];
}

function execute_instruction(tape, instruction) {}

function main() {
  let tape = load_input();
  assert(state_pattern.test('qq2222'), "fail")
}

main()
