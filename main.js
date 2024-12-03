// this my main Javascript file

console.clear();
console.log("hello from ravy");

class Terminal {
  constructor(input, output) {
    this.input = input;
    this.output = output;

    this.replay = (type, value) => {
      let elem = document.createElement(type);
      elem.innerHTML = value;
      this.output.appendChild(elem);
    };

    this.shell = (cmd) => `
			<p class="shellStyle">
			  <span style="color: yellow">ravy</span
			  ><span style="color: red">@</span
			  ><span style="color: cyan">desktop</span
			  ><span style="color: white">:</span><span style="color: pink">~</span
			  ><span style="color: yellowgreen"> $ </span>
			</p>
			${cmd}
		`;

    this.commands = [
      {
        name: "help",
        desc: "this gonna show you the list command",
        task: () => {
          for (let command of this.commands) {
            let result = `<span style="display: inline-block;width: 200px;">${command.name}</span><span style="color:gray">- ${command.desc}</span><br>`;
            this.replay("p", result);
          }
        },
      },
      {
        name: "banner",
        desc: "this gonna show you the welcome text",
        task: () => {
          const asciiPenguins = [
            "           _o                  _                 _o_   o   o",
            "      o    (^)  _             (o)    >')         (^)  (^) (^)",
            "   _ (^) ('>~ _(v)_      _   //-\\\\   /V\\      ('> ~ __.~   ~",
            " ('v')~ // \\\\  /-\\      (.)-=_\\_/)   (_)>     (V)  ~  ~~ /__ /\\",
            "//-=-\\\\ (\\_/) (\\_/)      V \\ _)>~    ~~      <(__\\[     ](__=_')",
            "(\\_=_/)  ^ ^   ^ ^       ~  ~~                ~~~~        ~~~~~",
            "_^^_^^   __  ..-.___..---I~~~:_  .__...--.._.;-'I~~~~-.____...;-",
            " |~|~~~~~| ~~|  _   |    |  _| ~~|  |  |  |  |_ |      | _ |  |",
            "_.-~~_.-~-~._.-~~._.-~-~_.-~~_.-~~_.-~-~._.-~~._.-~-~_.-~~_.-~-~",
            "                            .                  .  ' .    .    .",
            "                 .  '.   ;    .         <(')-/|=-/ . '  : . '",
            "       _  .  '   .    .    .               ~~-==~\\  . '",
            "      (.)-/|=-\\ . '  : . '",
          ];

          asciiPenguins.forEach((line) => {
            this.replay("p", line);
            console.log(line);
          });
        },
      },
      {
        name: "social",
        desc: "this gonna show you the social link",
        task: () => {
          this.replay("p", `<a target="blank" href="#">socail</a> commmand`);
        },
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
      let view = document.createElement("div");
      view.className = "commandContainer";
      view.innerHTML = this.shell(v);
      this.output.appendChild(view);
    };

    shellStyle(value);

    if (value == "") return;

    let checkCmd = false;

    for (let command of this.commands) {
      if (command.name == value) {
        command.task();
        checkCmd = true;
        return;
      }
    }
    if (checkCmd) return;
    // if the command not exsist
    this.replay(
      "p",
      `ERROR: <span style="color: red">"${value}"</span>command is not from the list commands<br>Try Enter $ help`,
    );
  }

  run() {
    let checkCmd = false;
    // run the banner command then load the terminal
    this.commands[1].task();

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
myterm.run();

window.onload = (_) => elemInput.focus();

const myvideo = document.getElementById("myvideo");
myvideo.playbackRate = 0.5;
