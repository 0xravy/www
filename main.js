// this my main Javascript file

console.clear();
console.log("hello from ravy");

class Terminal {
  constructor(input, output) {
    this.input = input;
    this.output = output;

    this.shell = (cmd) => `
			<span style="color: yellow">ravy</span
			><span style="color: red">@</span
			><span style="color: cyan">desktop</span
			><span style="color: white">:</span
			><span style="color: pink">~</span
			><span style="color: yellowgreen"> $ </span>
			${cmd}
		`;
    this.commands = [
      {
        name: "help",
        desc: "this gonna show you the list command",
        task: () => {
          let result = "<p>";
          for (let command of this.commands) {
            result += `<span style="display: inline-block;width: 200px;">${command.name}</span>
						<span style="color:gray">- ${command.desc}</span><br>`;
          }
          result += "</p>";
          return result;
        },
      },
      {
        name: "banner",
        desc: "this gonna show you the welcome text",
        task: () => "banner commmand",
      },
      {
        name: "social",
        desc: "this gonna show you the social link",
        task: () => `<a target="blank" href="#">socail</a> commmand`,
      },
      {
        name: "clear",
        desc: "this gonna clean the screen",
        task: () => {
          this.output.innerHTML = "";
        },
      },
    ];
  }
  show(value) {
    const shellStyle = (v) => {
      let view = document.createElement("p");
      view.innerHTML = this.shell(v);
      this.output.appendChild(view);
    };

    shellStyle(value);

    if (value == "") return;

    let replay = document.createElement("p");
    let checkCmd = false;

    for (let command of this.commands) {
      if (command.name == value) {
        replay.innerHTML = command.task();
        if (command.task()) this.output.appendChild(replay);

        return (checkCmd = true);
      }
    }
    if (checkCmd) return;
    // if the command not exsist
    replay.innerHTML = `ERROR: <span style="color: red">"${value}"</span>
							command is not from the list commands<br>
							Try Enter $ help`;
    this.output.appendChild(replay);
  }
  run() {
    this.input.onkeydown = (e) => {
      if (e.key === "Enter") {
        this.show(this.input.value.toLowerCase().trim());
        this.input.value = ""; // clear
      }
    };
  }
}

const elemInput = document.getElementById("termInput");
const elemOutput = document.getElementById("termOutput");
const myterm = new Terminal(elemInput, elemOutput);

window.onload = (_) => elemInput.focus();

myterm.run();
