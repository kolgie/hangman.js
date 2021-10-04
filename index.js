const wdata = require('./swdata.json')
const words = wdata.words
var states = [
    `






   `,

    `






---`,
    `

 |
 |
 |
 |
 |
---`,

    `
 -----
 |
 |
 |
 |
 |
---`,

    `
 -----
 |   |
 |
 |
 |
 |
---`,

    `
 -----
 |   |
 |   o
 |
 |
 |
---`,

    `
 -----
 |   |
 |   o
 |   |
 |
 |
---`,

    `
 -----
 |   |
 |   o
 |  /|
 |
 |
---`,

    `
 -----
 |   |
 |   o
 |  /|\\
 |
 |
---`,

    `
 -----
 |   |
 |   o
 |  /|\\
 |  /
 |
---`,

    `
 -----
 |   |
 |   o
 |  /|\\
 |  / \\
 |
---`
]


let dataStr = ""
let CurrentWord = ""
let GameOver = false
let AlreadyBlack = false
let Blacklist = []
let FoundPos = []
let CurrentState = 0
let CensoredString = ""
let WordCount = 0
let LetterCount = 1
let newgamed = false
words.forEach((v, i) => WordCount++);
//console.log(WordCount)
CurrentWord = words[Math.floor(Math.random() * WordCount)]
//console.log(CurrentWord)
console.log(states[CurrentState])
CurrentWord.split("").forEach((v, i) => CensoredString = CensoredString + "_");
console.log(CensoredString)
process.stdin.on('data', function (data) {
//    console.log(CurrentWord)
    if (GameOver == true) {
        GameOver = false
        AlreadyBlack = false
        Blacklist = []
        FoundPos = []
        CurrentState = 0
        CensoredString = ""
        newgamed = true
        LetterCount = 1
        CurrentWord = words[Math.floor(Math.random() * WordCount)]
        CurrentWord.split("").forEach((v, i) => CensoredString = CensoredString + "_")
        CurrentState = 0
        console.clear()
        console.log(states[CurrentState])
        console.log(Blacklist.toString())
        console.log(`\n`)
        console.log(CensoredString)
    }
    if (GameOver == false) {
        dataStr = data.toString().split("\n")[0]
        dataStr = dataStr.split("\r")[0]
        if (dataStr.includes(" ")) {
            console.log("no spaces")
            setTimeout(function () {
                console.clear()
                console.log(states[CurrentState])
                console.log(Blacklist.toString())
                console.log(`\n`)
                console.log(CensoredString)
            }, 500)
        } else {
            LetterCount = 0
            dataStr.split("").forEach((v, i) => LetterCount++);
            if (!dataStr) {
                if (newgamed == false) {
                console.log("no input detected")
                setTimeout(function () {
                    console.clear()
                    console.log(states[CurrentState])
                    console.log(Blacklist.toString())
                    console.log(`\n`)
                    console.log(CensoredString)
                }, 500)
                } else {
                    newgamed = false
                }
            }
            if (LetterCount > 1) {
                //                  console.log("word")
                if (dataStr == CurrentWord) {
                    console.clear()
                    console.log("you win\npress any key to restart")
                    console.log(states[CurrentState])
                    console.log(Blacklist.toString())
                    console.log(`\n`)
                    console.log(CurrentWord)
                    GameOver = true
                } else {
                    console.clear()
                    if (states[CurrentState + 2] == undefined) {
                        Blacklist.forEach((v, i) => function () {
                            if (dataStr == v) {
                                AlreadyBlack = true
                            }
                        }());
                        if (AlreadyBlack == false) {
                            Blacklist.push(dataStr)
                            CurrentState++
                            console.log("you lose\npress any key to restart")
                            console.log(states[10])
                            Blacklist.push(dataStr)
                            console.log(Blacklist.toString())
                            console.log(`\n`)
                            console.log(`the word was ${CurrentWord}`)
                            GameOver = true
                        } else {
                            AlreadyBlack = false
                            console.log(states[CurrentState])
                            console.log(Blacklist.toString())
                            console.log(`\n`)
                            console.log(CensoredString)
                        }

                    } else {
                        Blacklist.forEach((v, i) => function () {
                            if (dataStr == v) {
                                AlreadyBlack = true
                            }
                        }());
                        if (AlreadyBlack == false) {
                            Blacklist.push(dataStr)
                            CurrentState++
                        } else {
                            AlreadyBlack = false
                        }
                        console.log(states[CurrentState])
                        console.log(Blacklist.toString())
                        console.log(`\n`)
                        console.log(CensoredString)
                    }
                }
            } else if (LetterCount == 1) {
                //            console.log("letter")
                if (CurrentWord.includes(dataStr.toLowerCase(""))) {
                    //                console.log("right letter")
                    FoundPos = []
                    CurrentWord.split("").forEach((v, i) => function () { if (v == dataStr) { FoundPos.push(i) } }());
                    FoundPos.forEach((v, i) => function () {
                        CensoredString = CensoredString.split("")
                        CensoredString[v] = dataStr
                        CensoredString = CensoredString.join("")
                    }());
                    if (CensoredString == CurrentWord) {
                        console.clear()
                        console.log("you win\npress any key to restart")
                        console.log(states[CurrentState])
                        console.log(Blacklist.toString())
                        console.log(`\n`)
                        console.log(CurrentWord)
                        GameOver = true
                    } else {
                        console.clear()
                        console.log(states[CurrentState])
                        console.log(Blacklist.toString())
                        console.log(`\n`)
                        console.log(CensoredString)
                    }
                } else {
                    //                console.log("wrong letter")
                    console.clear()
                    if (states[CurrentState + 2] == undefined) {
                        Blacklist.forEach((v, i) => function () {
                            if (dataStr == v) {
                                AlreadyBlack = true
                            }
                        }());
                        if (AlreadyBlack == false) {
                            Blacklist.push(dataStr)
                            CurrentState++
                            console.log("you lose\npress any key to restart")
                            console.log(states[10])
                            Blacklist.push(dataStr)
                            console.log(Blacklist.toString())
                            console.log(`\n`)
                            console.log(`the word was ${CurrentWord}`)
                            GameOver = true
                        } else {
                            AlreadyBlack = false
                            console.log(states[CurrentState])
                            console.log(Blacklist.toString())
                            console.log(`\n`)
                            console.log(CensoredString)
                        }

                    } else {
                        Blacklist.forEach((v, i) => function () {
                            if (dataStr == v) {
                                AlreadyBlack = true
                            }
                        }());
                        if (AlreadyBlack == false) {
                            Blacklist.push(dataStr)
                            CurrentState++
                        } else {
                            AlreadyBlack = false
                        }
                        console.log(states[CurrentState])
                        console.log(Blacklist.toString())
                        console.log(`\n`)
                        console.log(CensoredString)
                    }
                }
            }
        }
    }
})
