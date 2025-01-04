class TextLine {
    constructor(lineNr, length) {
        this.lineNr = lineNr;
        this.length = length;
    }
}

class ContextLED {
    constructor(buttonNr) {
        this.buttonNr = buttonNr;
    }
}

class Knob {
    constructor(knobNr) {
        this.knobNr = knobNr;
        this.sysExKnobIndex = knobNr + 2;
        this.midiControl = 0x5F + knobNr;
    }
}

class KeyLabEssentialsProtocol {
    static buildMakeConnectionSysex(buffer) {
        buffer.begin(KeyLabEssentialsProtocol.sysexHeader);
        buffer.push(0x02);
        buffer.push(0x0F);
        buffer.push(0x40);
        buffer.push(0x5A);
        buffer.push(0x01);
        buffer.end();
        return buffer;
    }

    static buildEndConnectionSysex(buffer) {
        buffer.begin(KeyLabEssentialsProtocol.sysexHeader);
        buffer.push(0x02);
        buffer.push(0x0F);
        buffer.push(0x40);
        buffer.push(0x5A);
        buffer.push(0x00);
        buffer.end();
        return buffer;
    }

    static buildTextSysex(buffer, line, text) {
        buffer.begin(KeyLabEssentialsProtocol.sysexHeader);
        buffer.push(0x04);
        buffer.push(0x01);
        buffer.push(0x60);
        buffer.push(0x12);
        buffer.push(line);
        buffer.appendAscii(text);
        buffer.push(0x00);
        buffer.end();
        return buffer;
    }

    static buildContextButtonsSysex(buffer) {
        buffer.begin(KeyLabEssentialsProtocol.sysexHeader);
        buffer.push(0x04);
        buffer.push(0x01);
        buffer.push(0x60);
        buffer.push(0x03);
        buffer.push(0x22);
        buffer.push(0x42);
        buffer.push(0x00);
        buffer.push(0x32);
        buffer.push(0x23);
        buffer.push(0x00);
        buffer.push(0x42);
        buffer.push(0x24);
        buffer.push(0x00);
        buffer.end();
        return buffer;
    }

    static buildRGBButtonSysex(buffer, buttonId, r, g, b) {
        buffer.begin(KeyLabEssentialsProtocol.sysexHeader);
        buffer.push(0x04);
        buffer.push(0x01);
        buffer.push(0x16);
        buffer.push(buttonId);
        buffer.push(r);
        buffer.push(g);
        buffer.push(b);
        buffer.end();
        return buffer;
    }

    static buildSetKnobValueSysex(buffer, sysExKnobIndex, value) {
        buffer.begin(KeyLabEssentialsProtocol.sysexHeader);
        buffer.push(0x02);
        buffer.push(0x0F);
        buffer.push(0x40);
        buffer.push(sysExKnobIndex);
        buffer.push(value);
        buffer.end();
        return buffer;
    }
    static buildDisplayKnobValueSysex(buffer, name, value) {
        buffer.begin(KeyLabEssentialsProtocol.sysexHeader);
        //   00 02 (line_2) 00 03 (hw_value) 00 (transient)
        buffer.push(0x04);
        buffer.push(0x01);
        buffer.push(0x60);
        buffer.push(0x14);
        buffer.push(0x01);
        buffer.appendAscii("Knob: " + value.toString());
        buffer.push(0x00);
        buffer.push(0x02);
        buffer.appendAscii(name);
        buffer.push(0x00);
        buffer.push(0x03);
        buffer.push(value);
        buffer.push(0x01);
        buffer.end();
        return buffer;
    }
}

KeyLabEssentialsProtocol.line1Text = new TextLine(1, 18);
KeyLabEssentialsProtocol.line2Text = new TextLine(2, 18);
KeyLabEssentialsProtocol.loopLED = new ContextLED(0x10);
KeyLabEssentialsProtocol.metronomeLED = new ContextLED(0x13);
KeyLabEssentialsProtocol.contextLED0 = new ContextLED(0x18);
KeyLabEssentialsProtocol.contextLED1 = new ContextLED(0x19);
KeyLabEssentialsProtocol.contextLED2 = new ContextLED(0x1A);
KeyLabEssentialsProtocol.contextLED3 = new ContextLED(0x1B);
KeyLabEssentialsProtocol.knob1 = new Knob(1);
KeyLabEssentialsProtocol.knob2 = new Knob(2);
KeyLabEssentialsProtocol.knob3 = new Knob(3);
KeyLabEssentialsProtocol.knob4 = new Knob(4);
KeyLabEssentialsProtocol.knob5 = new Knob(5);
KeyLabEssentialsProtocol.knob6 = new Knob(6);
KeyLabEssentialsProtocol.knob7 = new Knob(7);
KeyLabEssentialsProtocol.knob8 = new Knob(8);
KeyLabEssentialsProtocol.knob9 = new Knob(9);

KeyLabEssentialsProtocol.sysexHeader = [
    0x00,
    0x20,
    0x6B,
    0x7F,
    0x42
];
