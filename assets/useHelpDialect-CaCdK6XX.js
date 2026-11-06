import{u as c}from"./useDeviceStatus-Dt2xnchG.js";import{b as l}from"./source-BHWcE_6w.js";function h(i){return i==="both"||i==="micropython"||i==="circuitpython"}function f(i,t){return i===void 0||i==="both"||t==="unknown"?!0:i===t}function P(i,t){return t!=="unknown"?"":i==="micropython"?"MicroPython":i==="circuitpython"?"CircuitPython":""}function u(i){return i==="micropython"?"circuitpython":i==="circuitpython"?"micropython":null}const g={auto:"Auto",micropython:"MicroPython",circuitpython:"CircuitPython"};function p(i,t){return i!=="auto"?i:t??"unknown"}function m(i,t){return i!=="auto"?"manual":t&&t!=="unknown"?"board":"none"}const s=[{id:"digital-out",title:"Digital output (an LED)",micropython:{modules:["machine"],symbols:["machine","pin"],snippet:`from machine import Pin

led = Pin(15, Pin.OUT)
led.value(1)`,article:"ref-pins"},circuitpython:{modules:["board","digitalio"],symbols:["digitalio","digitalinout","direction"],snippet:`import board
import digitalio

led = digitalio.DigitalInOut(board.D15)
led.direction = digitalio.Direction.OUTPUT
led.value = True`,article:"cp-digitalio"},note:"CircuitPython `value` is an attribute you assign, not a method you call."},{id:"digital-in",title:"Digital input (a button)",micropython:{modules:["machine"],symbols:["pull_up","pull_down"],snippet:`from machine import Pin

btn = Pin(14, Pin.IN, Pin.PULL_UP)
print(btn.value())`,article:"ref-pins"},circuitpython:{modules:["board","digitalio"],symbols:["pull"],snippet:`import board
import digitalio

btn = digitalio.DigitalInOut(board.D14)
btn.switch_to_input(pull=digitalio.Pull.UP)
print(btn.value)`,article:"cp-digitalio"}},{id:"analog-in",title:"Analogue input",micropython:{modules:["machine"],symbols:["adc","read_u16"],snippet:`from machine import ADC

pot = ADC(26)
print(pot.read_u16())`,article:"ref-pins"},circuitpython:{modules:["board","analogio"],symbols:["analogio","analogin"],snippet:`import board
import analogio

pot = analogio.AnalogIn(board.A0)
print(pot.value)`,article:"cp-analogio"},note:"Both read 0–65535, so a reading ported straight across still scales the same."},{id:"pwm",title:"PWM (dimming, servos, tones)",micropython:{modules:["machine"],symbols:["duty_u16"],snippet:`from machine import Pin, PWM

pwm = PWM(Pin(15))
pwm.freq(1000)
pwm.duty_u16(32768)`,article:"ref-pwm"},circuitpython:{modules:["board","pwmio"],symbols:["pwmio","pwmout","duty_cycle"],snippet:`import board
import pwmio

pwm = pwmio.PWMOut(board.D15, frequency=1000)
pwm.duty_cycle = 32768`,article:"cp-pwmio"},note:"Both take a 16-bit duty; `duty_u16(x)` is a call, `duty_cycle = x` is an attribute."},{id:"i2c",title:"I²C",micropython:{modules:["machine"],symbols:["softi2c"],snippet:`from machine import I2C, Pin

i2c = I2C(0, scl=Pin(5), sda=Pin(4))
print(i2c.scan())`,article:"ref-i2c"},circuitpython:{modules:["board","busio"],symbols:["busio","try_lock","unlock"],snippet:`import board
import busio

i2c = busio.I2C(board.SCL, board.SDA)
while not i2c.try_lock():
    pass
try:
    print(i2c.scan())
finally:
    i2c.unlock()`,article:"cp-busio"},note:"CircuitPython hands the bus to the display/USB stack too, so you must `try_lock()` before scanning and `unlock()` after."},{id:"spi",title:"SPI",micropython:{modules:["machine"],symbols:["softspi"],snippet:`from machine import SPI, Pin

spi = SPI(0, baudrate=1000000, sck=Pin(2), mosi=Pin(3), miso=Pin(4))`,article:"ref-spi"},circuitpython:{modules:["board","busio"],symbols:["configure"],snippet:`import board
import busio

spi = busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO)`,article:"cp-busio"}},{id:"uart",title:"UART (serial)",micropython:{modules:["machine"],symbols:[],snippet:`from machine import UART, Pin

uart = UART(0, 115200, tx=Pin(0), rx=Pin(1))`,article:"ref-uart"},circuitpython:{modules:["board","busio"],symbols:[],snippet:`import board
import busio

uart = busio.UART(board.TX, board.RX, baudrate=115200)`,article:"cp-busio"}},{id:"delay",title:"Waiting",micropython:{modules:["time"],symbols:["sleep_ms","sleep_us","ticks_ms","ticks_us","ticks_diff","ticks_add"],snippet:`import time

time.sleep_ms(500)
start = time.ticks_ms()`,article:"ref-timing"},circuitpython:{modules:["time"],symbols:["monotonic","monotonic_ns"],snippet:`import time

time.sleep(0.5)
start = time.monotonic()`,article:"cp-timing"},note:"CircuitPython has no `sleep_ms`/`ticks_ms` — `time.sleep()` takes seconds (a float) and `time.monotonic()` returns seconds."},{id:"pin-names",title:"Naming a pin",micropython:{modules:["machine"],symbols:[],snippet:`from machine import Pin

led = Pin(25, Pin.OUT)   # GPIO number`,article:"ref-pins"},circuitpython:{modules:["board"],symbols:["board"],snippet:`import board

print(dir(board))        # the names THIS board has
pin = board.D13`,article:"cp-board"},note:"MicroPython takes the GPIO number; CircuitPython takes an object from `board`, whose names are per-board — `dir(board)` lists them."},{id:"program-file",title:"The program that runs at boot",micropython:{modules:[],symbols:[],snippet:"# main.py runs after boot.py",article:"gs-run"},circuitpython:{modules:[],symbols:[],snippet:"# code.py runs, and re-runs on every save",article:"cp-code-py"},note:"CircuitPython auto-reloads: saving a file restarts `code.py` immediately."},{id:"libraries",title:"Installing a library",micropython:{modules:["mip"],symbols:["mip"],snippet:`import mip

mip.install('ssd1306')`,article:"gs-packages"},circuitpython:{modules:[],symbols:[],snippet:"# copy the .mpy from the Adafruit bundle into CIRCUITPY/lib/",article:"cp-libraries"},note:"CircuitPython has no `mip` — libraries are files copied from the Adafruit bundle into `/lib`."}];Object.fromEntries(s.map(i=>[i.id,i]));function a(i,t){return t==="micropython"?i.micropython:t==="circuitpython"?i.circuitpython:null}function d(i,t){const o=u(t);if(!o)return null;const n=(i??"").trim().toLowerCase();if(!n)return null;for(const e of s){const r=a(e,t);if(r&&(r.symbols.includes(n)||r.modules.includes(n)))return null}for(const e of s){const r=a(e,o);if(r&&(r.symbols.includes(n)||r.modules.includes(n)))return e}return null}function _(i,t){const o=d(i,t);return o?a(o,t)?.article??null:null}function w(){const i=c(),{helpDialect:t,setHelpDialect:o}=l(),n=i.state==="connected"?i.runtime?.dialect:void 0;return{dialect:p(t,n),preference:t,source:m(t,n),boardDialect:n,setPreference:o}}export{s as A,g as D,h as a,a as b,P as d,_ as f,f as i,u as o,w as u};
