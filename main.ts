input.onPinPressed(TouchPin.P0, function () {
    I2C_LCD1602.BacklightOn()
    I2C_LCD1602.ShowString("TEMP.EXT:", 0, 0)
    I2C_LCD1602.ShowNumber(T, 10, 0)
    I2C_LCD1602.ShowString("C", 15, 0)
    I2C_LCD1602.ShowString("HUM. EXT:", 0, 1)
    I2C_LCD1602.ShowNumber(H, 10, 1)
    I2C_LCD1602.ShowString("%", 15, 1)
    basic.pause(5000)
    I2C_LCD1602.clear()
    I2C_LCD1602.BacklightOff()
})
input.onPinPressed(TouchPin.P1, function () {
    if (input.pinIsPressed(TouchPin.P0)) {
        TMIN = 60
        HMIN = 99
        TMAX = 0
        HMAX = 0
    }
    I2C_LCD1602.BacklightOn()
    I2C_LCD1602.ShowString("T.EXT.MAX:", 0, 0)
    I2C_LCD1602.ShowNumber(TMAX, 10, 0)
    I2C_LCD1602.ShowString("C", 15, 0)
    I2C_LCD1602.ShowString("T.EXT.MIN:", 0, 1)
    I2C_LCD1602.ShowNumber(TMIN, 10, 1)
    I2C_LCD1602.ShowString("C", 15, 1)
    basic.pause(3000)
    I2C_LCD1602.clear()
    I2C_LCD1602.ShowString("H.EXT.MAX:", 0, 0)
    I2C_LCD1602.ShowNumber(HMAX, 10, 0)
    I2C_LCD1602.ShowString("%", 15, 0)
    I2C_LCD1602.ShowString("H.EXT.MIN:", 0, 1)
    I2C_LCD1602.ShowNumber(HMIN, 10, 1)
    I2C_LCD1602.ShowString("%", 15, 1)
    basic.pause(3000)
    I2C_LCD1602.clear()
    I2C_LCD1602.BacklightOff()
})
let HMAX = 0
let TMAX = 0
let H = 0
let T = 0
let HMIN = 0
let TMIN = 0
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.BacklightOff()
basic.pause(500)
I2C_LCD1602.BacklightOn()
I2C_LCD1602.ShowString("ESTACION", 0, 0)
I2C_LCD1602.ShowString("METEOROLOGICA", 0, 1)
basic.pause(2000)
I2C_LCD1602.clear()
I2C_LCD1602.ShowString("PREPARADA!!!", 0, 0)
basic.pause(5000)
I2C_LCD1602.clear()
I2C_LCD1602.BacklightOff()
dht11_dht22.selectTempType(tempType.celsius)
TMIN = 60
HMIN = 99
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P9,
    true,
    false,
    true
    )
    basic.pause(5000)
    if (dht11_dht22.readDataSuccessful()) {
        T = dht11_dht22.readData(dataType.temperature)
        H = dht11_dht22.readData(dataType.humidity)
        if (T < TMIN) {
            TMIN = T
        }
        if (T > TMAX) {
            TMAX = T
        }
        if (H < HMIN) {
            HMIN = H
        }
        if (H > HMAX) {
            HMAX = H
        }
    }
})
