import { argv } from "process";
import fs from "fs";

const program_config = {
  name: "Untitled program",
  start_state: "q0",
  accept_state: "qAccept", // TODO: accept mulitple accept states
};

const config_pattern = /^[\w]+:.*/;
const comment_pattern = /^\/\//;

function parse_file(raw_program) {
  const program_lines = raw_program
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "" && !comment_pattern.test(line));

  let config_done = false;
  const instruction_lines = [];
  for (let line of program_lines) {
    if (config_pattern.test(line)) {
      if (config_done) {
        throw new Error(
          "Program must be configured before the first instruction.",
        );
      }
      const config_line = line.split(":");
      switch (config_line[0]) {
        case "name":
          program_config.name = config_line[1].trim();
          break;
        case "start_state":
          program_config.start_state = config_line[1].trim();
          break;
        case "accept_state":
          program_config.accept_state = config_line[1].trim();
          break;
        default:
          throw new Error(`'${config_line[0]}' is not a valid config option.`);
      }
    } else {
      config_done = true;
      instruction_lines.push(line);
    }
  }
  return instruction_lines;
}

function parse_instruction(instruction) {
  const tokens = instruction.split(" ").filter((token) => token !== "");
  if (tokens.length !== 4) {
    throw Error(`Instruction: ${instruction} is not a valid instruction.`);
  }
  if (
    tokens[1].length > 1 ||
    (tokens[2].startsWith("p") && tokens[2].length > 2)
  ) {
    throw Error("sybmols must be one character in length.");
  }
  return {
    state: tokens[0],
    symbol: tokens[1],
    action: tokens[2],
    new_state: tokens[3],
  };
}

function compile_instruction_graph(instruction_lines) {
  const graph = {};
  for (let instruction of instruction_lines) {
    const { state, symbol, action, new_state } = parse_instruction(instruction);
    if (!graph[state]) {
      graph[state] = {};
    }
    graph[state][symbol] = {
      action: action,
      new_state: new_state,
    };
  }
  return graph;
}

function report_compilation_error(raw_program, offending_instruction) {
  // TODO: returns the error text and the line of the instruction in the original program.
}

function get_program() {
  let input_file = argv[2];
  let instructions = fs.readFileSync(input_file, "utf8");
  return instructions;
}

function get_tape() {
  return argv[3].split("");
}

function run_program(tape, instruction_graph, config) {
  let { start_state } = config;
  let head_position = 0;
  let state = start_state;
  let action_obj = instruction_graph[state]?.[tape[head_position]];
  let timeout = 10000;
  while (action_obj) {
    if (action_obj.action === "<") {
      if (head_position === 0) {
        tape.unshift("_");
      } else {
        head_position -= 1;
      }
      if (head_position < 0) {
        throw Error("Read head fell off the infinite tape...");
      }
    } else if (action_obj.action === ">") {
      if (head_position === tape.length - 1) {
        tape.push("_");
      }
      head_position += 1;
    } else if (action_obj.action.startsWith("p")) {
      tape[head_position] = action_obj.action[1];
    } else if (action_obj.action === "-") {
      // NOOP
    } else {
      throw Error(`${action_obj.action} is an invalid action.`);
    }
    state = action_obj.new_state;
    action_obj = instruction_graph[state]?.[tape[head_position]];
    if (timeout < 1) {
      throw Error("Hit timeout, likely a non halting program.");
    }
    timeout -= 1;
  }
  return state;
}

function main() {
  const program = get_program();
  const tape = get_tape();
  console.log("INPUT");
  console.log(tape.join(""));

  const machine_graph = compile_instruction_graph(parse_file(program));
  const final_state = run_program(tape, machine_graph, program_config);
  const input_accepted = final_state === program_config.accept_state;

  console.log("OUTPUT");
  console.log(tape.join(""));

  console.log("FINAL STATE");
  console.log("exit status: " + input_accepted);
}

main();
