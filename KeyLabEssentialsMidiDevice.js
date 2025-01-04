include_file("resource://com.presonus.musicdevices/sdk/midiprotocol.js");
include_file("resource://com.presonus.musicdevices/sdk/controlsurfacedevice.js");
include_file("KeyLabEssentialsProtocol.js");

class RgbColor {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
RgbColor.RED = new RgbColor(127,0,0);
RgbColor.BLACK = new RgbColor(0,0,0);
RgbColor.WHITE = new RgbColor(127,127,127);
RgbColor.WHITE_50PCT = new RgbColor(63,63,63);
RgbColor.YELLOW = new RgbColor(127,127,0);
RgbColor.YELLOW_50PCT = new RgbColor(63,63,0);

class TextHandler extends PreSonus.ControlHandler {
    constructor(name, control) {
        super();
        this.name = name;
        this.control = control;
    }
    sendValue(value, flags) {
        this.device.sendText(value, this.control);
    }
}
class RGBButtonHandler extends PreSonus.ControlHandler {
    constructor(name, control) {
        super();
        this.name = name;
        this.control = control;
    }
    sendValue(value, flags) {
        var color = new RgbColor(value, value, value);
        this.device.sendContextLEDValue(color, this.control);
    }
}
class ToggleButtonHandler extends PreSonus.ControlHandler {
    constructor(name, control, onColor, offColor) {
        super();
        this.name = name;
        this.control = control;
        this.onColor = onColor;
        this.offColor = offColor;
    }
    sendValue(value, flags) {
        var color = value == 0 ? this.offColor : this.onColor;
        this.device.sendContextLEDValue(color, this.control);
    }
}
class KnobHandler extends PreSonus.ControlHandler {
    constructor(name, control) {
        super();
        this.name = name;
        this.control = control;
    }
    sendValue(value, flags) {
        let knobValue = Math.floor(value * 127);
        this.device.sendKnobValue(this.control, knobValue);
        this.device.sendDisplayKnobValue(this.control, knobValue);
    }
    receiveMidi(status, data1, data2) {
        if (status != 0xB0)
            return false;
        if (data1 != this.control.midiControl)
            return false;
        let newValue = data2 / 127.0;
        this.device.sendDisplayKnobValue(this.control, data2);
        this.updateValue(newValue);
        return true;
    }
}

class KeyLabEssentialsMidiDevice extends PreSonus.ControlSurfaceDevice {
    constructor() {
        super();
        this.debugLog = false;
    }

    onInit(hostDevice) {
        super.onInit(hostDevice);
        this.debugLog = false;
        this.addHandler(new TextHandler("line1Text", KeyLabEssentialsProtocol.line1Text));
        this.addHandler(new TextHandler("line2Text", KeyLabEssentialsProtocol.line2Text));
        this.addHandler(new ToggleButtonHandler("contextLED1", KeyLabEssentialsProtocol.contextLED1, RgbColor.RED, RgbColor.BLACK));
        this.addHandler(new ToggleButtonHandler("loopLED", KeyLabEssentialsProtocol.loopLED, RgbColor.YELLOW, RgbColor.YELLOW_50PCT));
        this.addHandler(new ToggleButtonHandler("metronomeLED", KeyLabEssentialsProtocol.metronomeLED, RgbColor.WHITE, RgbColor.WHITE_50PCT));
        this.addReceiveHandler(new KnobHandler("knob1", KeyLabEssentialsProtocol.knob1));
        this.addReceiveHandler(new KnobHandler("knob2", KeyLabEssentialsProtocol.knob2));
        this.addReceiveHandler(new KnobHandler("knob3", KeyLabEssentialsProtocol.knob3));
        this.addReceiveHandler(new KnobHandler("knob4", KeyLabEssentialsProtocol.knob4));
        this.addReceiveHandler(new KnobHandler("knob5", KeyLabEssentialsProtocol.knob5));
        this.addReceiveHandler(new KnobHandler("knob6", KeyLabEssentialsProtocol.knob6));
        this.addReceiveHandler(new KnobHandler("knob7", KeyLabEssentialsProtocol.knob7));
        this.addReceiveHandler(new KnobHandler("knob8", KeyLabEssentialsProtocol.knob8));
        this.addReceiveHandler(new KnobHandler("knob9", KeyLabEssentialsProtocol.knob9));
    }

    onExit() {
        this.sendEndConnection();
    }

    onMidiOutConnected(state) {
        super.onMidiOutConnected(state);
        if (state) {
            this.sendMakeConnection();
            this.sendText("Studio One", KeyLabEssentialsProtocol.line2Text);
            this.setFooterForContextButtons();
            this.hostDevice.invalidateAll();
        }
    }
    sendMakeConnection() {
        this.sendSysex(KeyLabEssentialsProtocol.buildMakeConnectionSysex(this.sysexSendBuffer));
    }
    sendEndConnection() {
        this.sendSysex(KeyLabEssentialsProtocol.buildEndConnectionSysex(this.sysexSendBuffer));
    }
    setFooterForContextButtons() {
        this.sendSysex(KeyLabEssentialsProtocol.buildContextButtonsSysex(this.sysexSendBuffer));
    }
    sendText(text, control) {
        this.sendSysex(KeyLabEssentialsProtocol.buildTextSysex(this.sysexSendBuffer, control.lineNr, text));
    }
    sendContextLEDValue(rgbColor, control) {
        this.sendSysex(KeyLabEssentialsProtocol.buildRGBButtonSysex(this.sysexSendBuffer, control.buttonNr, rgbColor.r, rgbColor.g, rgbColor.b));
    }
    sendKnobValue(knob, value) {
        this.sendSysex(KeyLabEssentialsProtocol.buildSetKnobValueSysex(this.sysexSendBuffer, knob.sysExKnobIndex, value));
    }
    sendDisplayKnobValue(knob, value) {
        this.sendSysex(KeyLabEssentialsProtocol.buildDisplayKnobValueSysex(this.sysexSendBuffer, "Some knob", value));
    }
}
function createKeyLabEssentialsDeviceInstance() {
    return new KeyLabEssentialsMidiDevice();
}
