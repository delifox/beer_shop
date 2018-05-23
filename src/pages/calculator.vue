<template>
  <div class="calculator">
    <div class="expression">
      {{firstNumber}}{{action}}{{secondNumber}}
      <span v-if="result">={{result}}</span>
    </div>
    <div v-if="isShowMemory" class="memmory">
      <div v-for="(number, idx) in memory" :key="idx">
        {{number}}
        <button @click="memoryAdd(idx)">M+</button>
        <button @click="memorySubtract(idx)">M-</button>
        <button @click="memoryClear(idx)">MC</button>
      </div>
    </div>
    <div v-else class="buttons">
      <button @click="memoryAdd()">M+</button>
      <button @click="memorySubtract()">M-</button>
      <button @click="memoryStore()">MS</button>
      <button @click="memoryRecall()" :class="{disabled:isMemoryEmpty}">MR</button>
      <button @click="memoryClear()" :class="{disabled:isMemoryEmpty}">MC</button>
      <button @click="memoryAll()" :class="{disabled:isMemoryEmpty}">M
        <i class="fas fa-sort-down"></i>
      </button>
      <button v-for="n in numbers" @click="addNumber(n)" :key="n">{{n}}</button>
      <button v-for="a in actions" @click="setAction(a)" :key="a">{{a}}</button>
      <button @click="ce">CE</button>
      <button @click="c">C</button>
      <button @click="del">del</button>
      <button class="result-button" @click="calc()">=</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      actions: ['+', '-', '*', '/', '%'],
      firstNumber: '',
      action: '',
      secondNumber: '',
      result: '',
      memory: [],
      isShowMemory: false
    }
  },
  methods: {
    addNumber(n) {
      this.currentField += n
    },
    setAction(a) {
      this.action = a
    },
    ce() {
      this.secondNumber = ''
    },
    c() {
      this.firstNumber = ''
      this.action = ''
      this.secondNumber = ''
      this.result = ''
    },
    del() {
      this.currentField = this.currentField.slice(0, -1)
    },
    calc() {
      const a = parseInt(this.firstNumber, 10)
      const b = parseInt(this.secondNumber, 10)
      this.result = this.runAction(a, b)
    },
    runAction(a, b) {
      switch (this.action) {
        case '+':
          return a + b
        case '-':
          return a - b
        case '*':
          return a * b
        case '/':
          return a / b
        case '%':
          return a / 100 * b
      }
    },
    memoryAdd(idx) {
      if (this.isMemoryEmpty) this.memory.push(0)
      idx = idx || this.memory.length - 1
      this.$set(this.memory, idx, this.memory[idx] + parseInt(this.currentField, 10))
    },
    memorySubtract(idx) {
      if (this.isMemoryEmpty) this.memory.push(0)
      idx = idx || this.memory.length - 1
      this.$set(this.memory, idx, this.memory[idx] - parseInt(this.currentField, 10))
    },
    memoryStore() {
      this.memory.push(parseInt(this.currentField, 10))
    },
    memoryRecall() {
      if (this.isMemoryEmpty) return
      this.currentField = this.lastMemoryItem
    },
    memoryClear(idx) {
      if (idx) this.memory.slice(idx, 1)
      else this.memory = []
    },
    memoryAll() {
      if (this.isMemoryEmpty) return
      this.isShowMemory = !this.isShowMemory
    }
  },
  computed: {
    isMemoryEmpty() {
      return this.memory.length === 0
    },
    lastMemoryItem() {
      return this.memory[this.memory.length - 1]
    },
    currentField: {
      get() {
        if (this.result) return this.result
        return this.action ? this.secondNumber : this.firstNumber
      },
      set(v) {
        if (this.result) this.c()
        if (this.action) {
          this.secondNumber = v
        } else {
          this.firstNumber = v
        }
      }
    }
  }
}
</script>

<style lang="scss">
html {
  height: 100vh;
  background: #e9ebee;
}
body {
  background: transparent;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.calculator {
  background: #fff;
  transform: scale(1.4);
  width: 260px;
  text-align: center;
  border: 2px solid #ccc;
  .expression {
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 18px;
    height: 50px;
    padding: 8px;
    border-bottom: 2px solid #ccc;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 4px;
    padding: 4px;
    button {
      cursor: pointer;
      color: #666;
      background: #ececec;
      border: none;
      height: 36px;
      &:hover {
        background: black;
        color: #fff;
      }
      &.disabled {
        background: #fff;
        color: #999;
      }
    }
    .result-button {
      grid-column: 1 / 7;
    }
  }
  .memmory {
  }
}
</style>
