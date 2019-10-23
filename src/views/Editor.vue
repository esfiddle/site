<template>
  <div id="editor">
    <div v-for="(line, index) in lines" :id="i = index" :key="'line-'+i" class="row" v-on:click="focus">
      <div :title="i">{{i + 1}}</div>
      <div :title="i">
        <span v-for="(token, index) in line" :key="'line-'+i+'-token-'+(j=index)" :title="j" :class="token.type">
          {{token.content}}
        </span>
      </div>
    </div>
    <div id="caret" class="hidden">|</div>
    <button id="run" aria-label="run javascript program" v-on:click="run">
      <i nz-icon nzType="caret-right"></i>
    </button>
  </div>
</template>

<script>
import { Vue } from 'vue-property-decorator'
import { id, os, edit, line, index, token, tokens, keywords } from './utils'

const TOP = 21
const SPACE = 8.5
const LEFT_BASE = 35
// TODO: windows + firefox width = 8px
// TODO: linux + firefox width = 8.5px
const LEFT = os() === 1 ? 7.75 : 8.45

export default class Editor extends Vue {

  currentLine = 0;
  currentToken = 0;
  currentPosition = 0;

  caret = null;
  interval = null;

  state = tokens.NONE;
  open = '';

  lines = [
    [{
      type: tokens.NONE,
      content: '',
    }],
  ];

  mounted () {
    this.caret = document.getElementById('caret');
    this.count();
  }

  count = () => {
    const { caret, lines, currentLine, currentToken, currentPosition } = this;
    this.state = lines[currentLine][currentToken].type;

    let spaces = 0;
    let letters = 0;
    for (let y = 0; y < currentToken; y++) {
      const c = lines[currentLine][y].content;
      letters += c.length;
      spaces++;
    } letters += currentPosition;

    spaces = spaces * SPACE;
    letters = letters * LEFT;

    // TODO: update scroll to position of editor to caret
    const line = currentLine < 20 ? currentLine : currentLine % 20;

    caret.style.marginTop = `${line * TOP}px`;
    caret.style.marginLeft = `${letters + spaces + LEFT_BASE}px`;
  }

  copy = (arr = [], s = 0, e = arr.length, add = []) => {
    let copy = [];

    for (let i = s; i < e; i++) {
      let toke = {
        type: null,
        content: null,
      };

      toke.type = tokens.NONE;
      toke.content = arr[i].content;

      copy.push(toke);
    }

    for (let i = 0; i < add.length; i++) {
      let toke = {
        type: null,
        content: null,
      };

      toke.type = tokens.NONE;
      toke.content = add[i].content;

      copy.push(toke);
    }

    return copy;
  }

  range = () => {
    if (window.getSelection && window.getSelection().rangeCount > 0) {
      return window.getSelection().getRangeAt(0).cloneRange();
    } return null;
  }

  tokenize = () => {
    const { lines } = this;
    for (const line of lines) {
      for (const token of line) {
        token.content = token.content.trim();
        if (keywords[token.content]) {
          token.type = keywords[token.content];
        } else {
          const cont = token.content;
          if (cont && (cont[0] === '"' || cont[0] === "'")) {
            token.type = tokens.QUOTE;
          } else {
            token.type = tokens.NONE;
          }
        }
      }
    }
  }

  blur = () => {
    const { down } = this;

    document.removeEventListener('keydown', down);
    delete document.removeEditorListeners;

    clearInterval(this.interval);
    this.interval = null;

    const caret = document.getElementById('caret');
    if (!caret.classList.contains('hidden')) {
      caret.classList.add('hidden');
    }
  }

  run = (event) => {
    const { lines } = this;

    let code = '';
    for (const line of lines) {
      const prev = code;
      for (const token of line) {
        if (!token.content) continue;
        code += token.content + ' ';
      }

      if (prev !== code) code += '\n';
    }

    return eval(code)
  }

  focus = (event) => {
    event.preventDefault();

    const row = id(event.target) || 0;
    if (row < 0) return;

    const { blur, down, caret, lines, range } = this;
    const toke = Number(token(event.target) || lines[row].length - 1);

    this.currentLine = row;
    this.currentToken = toke;

    if (token(event.target)) {
      this.currentPosition = range().startOffset - 1;
    } else {
      this.currentPosition = lines[row][toke].content.length;
    }

    document.addEventListener('keydown', down);
    document.removeEditorListeners = blur;

    this.count();
    if (!this.interval) this.interval = setInterval(() => {
      if (caret.classList.contains('hidden')) {
        caret.classList.remove('hidden');
      } else {
        caret.classList.add('hidden');
      }
    }, 500);
  }

  down = (event) => {
    const { copy, caret, lines, tokenize } = this;

    // TODO: event.code does not exist on ms edge
    const i = this.currentLine;
    const t = this.currentToken;
    const p = this.currentPosition;

    switch (event.code) {
      case 'Fn':
      case 'End':
      case 'Home':
      case 'Insert':
      case 'PageUp':
      case 'Delete':
      case 'AltLeft':
      case 'AltRight':
      case 'CapsLock':
      case 'PageDown':
      case 'ShiftLeft':
      case 'ShiftRight':
      case 'ControlLeft':
      case 'ControlRight':
        event.preventDefault();
      break;

      case 'Tab':
        event.preventDefault();
      break;

      case 'ArrowUp':
        if (i) {
          this.currentLine--;
          if (t > lines[i - 1].length - 1) {
            this.currentToken = lines[i - 1].length - 1;
            this.currentPosition = lines[i - 1][this.currentToken].content.length;
          } else if (p > lines[i - 1][t].content.length - 1) {
            this.currentPosition = lines[i - 1][t].content.length;
          }
        }
      break;
      case 'ArrowDown':
        if (i < lines.length - 1) {
          this.currentLine++;
          if (t > lines[i + 1].length - 1) {
            this.currentToken = lines[i + 1].length - 1;
            this.currentPosition = lines[i + 1][this.currentToken].content.length;
          } else if (p > lines[i + 1][t].content.length - 1) {
            this.currentPosition = lines[i + 1][t].content.length;
          }
        }
      break;
      case 'ArrowRight':
        if (p < lines[i][t].content.length - 1) this.currentPosition++;
        else if (t < lines[i].length - 1) {
          this.currentToken++;
          this.currentPosition = 0;
        } else if (i < lines.length - 1) {
          this.currentLine++;
          this.currentToken = 0;
          this.currentPosition = 0;
        }
      break;
      case 'ArrowLeft':
        if (p) this.currentPosition--;
        else if (t) {
          this.currentToken--;
          this.currentPosition = lines[i][t - 1].content.length;
        } else if (i) {
          this.currentLine--;
          this.currentToken = lines[i - 1].length - 1;
          this.currentPosition = lines[i - 1][this.currentToken].content.length;
        }
      break;

      case 'Space':
        event.preventDefault();
        if (this.state === tokens.QUOTE) {
          const cont = lines[i][t].content;
          lines[i][t].content = cont.substring(0, p) + event.key + cont.substring(p);
        } else if (!p) {
          lines[i].splice(t, 0, {
            type: tokens.NONE,
            content: '',
          });
        } else if (t === lines[i].length - 1) {
          lines[i].push({
            type: tokens.NONE,
            content: '',
          });
        } else {
          const cont = lines[i][t].content;
          const start = cont.substring(0, p);
          const end = cont.substring(p);

          lines[i].splice(t, 0, {
            type: tokens.NONE,
            content: '',
          });

          lines[i][t].content = start;
          lines[i][t + 1].content = end;
        }

        if (this.state === tokens.QUOTE) {
          this.currentPosition++;
        } else {
          this.currentToken++;
          this.currentPosition = 0;
          tokenize();
        }

      break;

      case 'Backspace': {
        event.preventDefault();
        if (!p && !t && !i) return tokenize();
        const cont = lines[i][t].content;

        if (!cont) {
          lines[i].splice(t, 1);
          if (!lines[i].length) {
            lines.splice(i, 1);
          } if (!t) {
            this.currentLine--;
            this.currentToken = lines[i - 1].length - 1;
            this.currentPosition = lines[i - 1][this.currentToken].content.length;
          } else {
            this.currentToken--;
            this.currentPosition = lines[i][this.currentToken].content.length;
          }
        } else {
          if (!p && t) {
            this.currentPosition = lines[i][t - 1].content.length;
            lines[i][t - 1].content = lines[i][t - 1].content + cont;
            this.currentToken--;
            lines[i].splice(t, 1);
          } else if (!p && !t) {
            const last = lines[i - 1].length - 1;
            lines[i - 1] = copy(lines[i - 1], 0, lines[i - 1].length, lines[i]);
            lines.splice(i, 1);

            this.currentLine = i - 1;
            this.currentPosition = 0;
            this.currentToken = last + 1;
          } else {
            lines[i][t].content = cont.substring(0, p - 1) + cont.substring(p);
            this.currentPosition--;
          }

          const char = cont[!p ? p : p - 1];

          if (char === this.open) {
            this.state = tokens.NONE;
            this.open = '';
          } else if (char === '"' || char === "'"){
            this.state = tokens.NONE;
            this.open = '';
          }
        } tokenize();
      } break;

      case 'Enter':
      case 'NumpadEnter': {
        event.preventDefault();

        const cont = lines[i][t].content;
        const start = cont.substring(0, p);
        const end = cont.substring(p);

        const begin = copy(lines[i], 0, t, [{
          type: tokens.NONE,
          content: start,
        }]);

        const final = copy(lines[i], t);
        final[0].content = end;

        lines.splice(i, 0, []);
        lines[i] = begin;
        lines[i + 1] = final;

        tokenize();

        this.currentLine++;
        this.currentToken = 0;
        this.currentPosition = 0;
      } break;

      case 'Quote':
        if (this.open === event.key) {
          this.state = tokens.NONE;
          this.open = '';
        } else {
          this.state = tokens.QUOTE;
          this.open = event.key;
        } lines[i][t].type = this.state;
      default: {
        const cont = lines[i][t].content;

        if (event.keyCode > 64 && event.keyCode < 91) {
          const to = event.shiftKey ? event.key.toUpperCase() : event.key;
          lines[i][t].content = cont.substring(0, p) + to + cont.substring(p);
        } else {
          console.log(event.code, event.key, event.keyCode);
          lines[i][t].content = cont.substring(0, p) + event.key + cont.substring(p);
        }

        this.currentPosition++;
        tokenize();
      } break;
    }

    this.count();
  }
}
</script>

<style scoped>
#run {
  right: 25px;
  width: 50px;
  z-index: 10;
  bottom: 75px;
  float: right;
  height: 50px;
  font-size: 35px;
  position: absolute;
}

#caret {
  z-index: 10;
  color: white;
  display: block;
  position: absolute;
}

#caret.hidden {
  display: none;
}
#editor {
  color: white;
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  flex-direction: column;
  font-family: monospace;
  min-height: calc(100vh - 120px);
  background-color: var(--editor-bg);
}

#editor .row {
  width: 100%;
  display: flex;
  flex-direction: row;
}

#editor .row div:first-child {
  color: bisque;
  display: flex;
  min-width: 30px;
  border-right: 1px bisque solid;
}

#editor .row div:last-child {
  flex: 1 0;
  display: flex;
  margin-left: 10px;
  overflow-x: visible;
}

#editor .row div:last-child span {
  max-height: 21px;
  overflow-x: visible;
  white-space: nowrap;
  padding-right: 8.5px;
}

.OPEN, .CLOSE {
  color: lightsalmon;
}

.TYPE {
  color: orange;
}

.LITERAL, .QUOTE {
  color: lightgrey;
}

.ERROR {
  color: salmon;
}

.OUT {
  color: lightgreen;
}

.IN {
  color: cyan;
}

.MATH, .REFID {
  color: plum;
}

.ID {
  color: yellow;
}

.IF, .ENDIF, .WHILE, .ENDWHILE {
  color: skyblue;
}
</style>
