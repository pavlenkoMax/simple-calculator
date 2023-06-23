<script setup>
import { ref } from "vue";
import useCalculate from "./composables/useCalculate";
import operations from "./config/operations";

const {
  currentNumber,
  currentOperation,
  clear,
  chooseOperation,
  calculate,
} = useCalculate();
const localCurrentNumber = ref(String(currentNumber.value));

function handleNumberClick(number) {
  if (localCurrentNumber.value === "0") {
    localCurrentNumber.value = String(number);
    return;
  }

  localCurrentNumber.value = localCurrentNumber.value + String(number);
}

function handleDotClick() {
  if (localCurrentNumber.value.includes(".")) {
    return;
  }

  if (localCurrentNumber.value === "0") {
    localCurrentNumber.value = "0.";
  } else {
    localCurrentNumber.value = localCurrentNumber.value + ".";
  }
}

function handleClearValue() {
  if (localCurrentNumber.value !== "0") {
    localCurrentNumber.value = "0";
  } else {
    clear();
  }
}

function handleChoseOperation(key) {
  chooseOperation(key);
  currentNumber.value = localCurrentNumber.value;
  localCurrentNumber.value = "0";
}

function handleCalculate(value) {
  const result = calculate(value);
  localCurrentNumber.value = result;
}
</script>

<template>
  <div class="numbers">
    {{ localCurrentNumber }} {{ currentOperation }} {{ currentNumber }}
  </div>
  <div class="calculator">
    <input name="value" v-model="localCurrentNumber" />

    <br />

    <button v-for="number in 10" :key="number" @click="handleNumberClick(number - 1)">
      {{ number - 1 }}
    </button>
    <button @click="handleDotClick('.')">.</button>

    <br />

    <button
      v-for="operation in operations"
      :key="operation.key"
      :class="{
        active: operation.key === currentOperation,
      }"
      :disabled="localCurrentNumber === '0' && currentNumber === '0'"
      @click="handleChoseOperation(operation.key)"
    >
      {{ operation.label }}
    </button>

    <br />

    <button :disabled="!currentOperation" @click="handleCalculate(localCurrentNumber)">
      =
    </button>
    <button @click="handleClearValue">Clear</button>
  </div>
</template>

<style scoped>
.numbers {
  color: white;
}
.calculator {
  width: 500px;
  margin: 200px auto 0;
  padding: 20px;
  text-align: center;
  border: 1px solid white;
  border-radius: 10px;
}

input {
  margin-bottom: 40px;
}

button {
  color: white;
  border: 1px solid #fff;
  padding: 10px 20px;
  margin: 0 20px 20px 0;
  font-size: 14px;
}

button.active {
  border-color: brown;
}

button:disabled {
  opacity: 0.5;
}
</style>
