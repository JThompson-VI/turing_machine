import assert from "assert";
import { argv } from "process";
import fs from 'fs';

const program_config = {
  name: 'Untitled program',
  start_state: 'q0',
  accept_state: 'qAccept'
}

const config_pattern = /^(name|start_state|accept_state):.*/

const actions = {
  '>': (head_pos, tape) => {
    // move head right
    if (head_pos === tape.length - 1) {
      tape.push('_')
    }
    return head_pos + 1
  },
  '<': (head_pos, tape) => {
    // move head left
    if (head_pos === 0) {
      tape.unshift('_')
    }
    return 0
  },
  '-': () => {
    // hold/NOOP
  },
  'p': (head_pos, tape, symbol) => {
    // print symbol at the current position
    tape[head_pos] = symbol
    return head_pos
  }
}

function get_instructions() {
  let input_file = "debug_inst.txt"
  if (argv.length > 2) {
    input_file = argv[2]
  }
  let instructions = fs.readFileSync(input_file, 'utf8').split('\n')
  instructions = instructions.map((inst) => inst.trim()).filter((inst) => inst !== '')
  return instructions
}

function get_instruction_graph(instructions) {
  const machine_graph = {}
  for (let inst of instructions) {
    const tokens = inst.split(" ").filter((x) => x != "")
    if (tokens.length < 4) {
      console.error(`The instruction ${inst} is not valid.`)
    }
    if (!machine_graph[tokens[0]]) {
      machine_graph[tokens[0]] = {}
    }
    machine_graph[tokens[0]][tokens[1]] = {
      action: tokens[2],
      new_state: tokens[3]
    }
  }
  return machine_graph
}

function run_program(tape, instruction_graph, config) {
  let state = config.start_state
  let head_position = 0
  let action_obj = instruction_graph[state]?.[tape[head_position]]
  while (action_obj) {
    // TODO: impl run the program
    if (action_obj.action === '<') {

    } else if (action_obj.action === '>') {

    } else if (action_obj.action.startsWith('p')) {

    }
    break; // remove this
  }
  return tape
}

function main() {
  const instructions = get_instructions()
  const machine_graph = get_instruction_graph(instructions)
  const tape = ['1', '1', '0']
  run_program(tape, machine_graph, program_config)
  console.log(tape)
}

main();
