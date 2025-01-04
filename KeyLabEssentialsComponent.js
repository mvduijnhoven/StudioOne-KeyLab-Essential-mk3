include_file("resource://com.presonus.musicdevices/sdk/controlsurfacecomponent.js");
class KeyLabEssentialsComponent extends PreSonus.ControlSurfaceComponent {
    onInit(hostComponent) {
        super.onInit(hostComponent);
        this.debugLog = false;
    }
}
function createKeyLabEssentialsComponentInstance() {
    return new KeyLabEssentialsComponent();
}
