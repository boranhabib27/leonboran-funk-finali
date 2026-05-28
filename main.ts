// zeigt den text vom morse code
function showStringNow (theString: string) {
    basic.showString(theString, 0)
}
morse.onCodeSelected(function (code, sequence) {
    nachricht = "" + nachricht + code
    showStringNow(code)
})
// nachricht versenden
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    let code = ""
    radio.sendString(nachricht)
    showStringNow(code)
    nachricht = ""
    morse.resetTiming()
    morse.resetDecoding()
    basic.showLeds(`
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        `)
    music.ringTone(831)
    basic.pause(100)
    music.stopAllSounds()
    basic.clearScreen()
})
// morse code 
// lang und kurz
buttonClicks.onButtonUp(buttonClicks.AorB.A, function () {
    morse.keyUp()
    music.stopAllSounds()
})
// zeigt . oder - bei den leds
morse.onNewSymbol(function (newSymbol) {
    showStringNow(newSymbol)
})
buttonClicks.onButtonDown(buttonClicks.AorB.A, function () {
    morse.keyDown()
    music.ringTone(600)
})
radio.onReceivedString(function (receivedString) {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
    basic.showString(receivedString)
})
// leerzeichen zwischen den wörterb
input.onButtonPressed(Button.B, function () {
    nachricht = "" + nachricht + ""
})
input.onPinTouchEvent(TouchPin.P3, input.buttonEventValue(ButtonEvent.Up), function () {
    music.ringTone(165)
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    nachricht = nachricht.substr(0, nachricht.length - 2)
    basic.pause(100)
    basic.clearScreen()
})
let nachricht = ""
nachricht = ""
let stelle = 0
let morseSound = ""
radio.setGroup(69)
morse.setMaxDurationDotDash(
200,
1000
)
morse.setMaxSilenceBetweenSymbolsLetters(
500,
2000
)
