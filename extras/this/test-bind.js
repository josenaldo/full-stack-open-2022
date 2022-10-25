this.name = 'Jhon'
this.age = 16

/**
 * A função hello acessa o objeto this global
 */
const hello = () => {
    const { name, age } = this
    console.log(name, age)
}

/**
 * No método pedro.hello, o objeto this é, inicialmente, o próprio objeto pedro
 */
const pedro = {
    name: 'Pedro',
    age: 18,

    hello() {
        const { name, age } = this
        console.log(name, age)
    },
}

/**
 * O objeto joana não possui um método
 */
const joana = {
    name: 'Joana',
    age: 20,
}

/**
 * Função acessória que imprime uma régia horizontal, pra facilitar a leitura da saída
 */
const hr = function () {
    console.log('-'.repeat(80))
}

// Quando chamamos hello
console.log('hello() is bounded to global object')
hello()
hr()

const boundhello = hello.bind(pedro)
console.log('Try bind hello to pedro, but hello still is bound to global')
boundhello()
hr()

console.log('pedro.hello() is naturally bound to pedro')
pedro.hello()
hr()

const unboudHello = pedro.hello
console.log("unboudHello() is Pedro's hello() unbound to anything")
unboudHello()
hr()

const globalBoudHello = pedro.hello.bind(this)
console.log("Global bound Pedro's hello")
globalBoudHello()
hr()

const boundJoanaHello = pedro.hello.bind(joana)
console.log("Joana Bound Pedro's hello")
boundJoanaHello()
hr()
