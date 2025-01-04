# PreSonus Studio One Device Configuration For Arturia KeyLab Essential mk3

The repo contain a PreSonus Studio One device definition for the Arturia KeyLab Essentials mk3 MIDI controller.
The development of this code is not affiliated with PreSonus or Arturia.
As there is no publicly available official API documentation provided by PreSonus, this code is inspired by device definitions for other devices.
The device definition is (to some extend) tested on Studio One 7.
It _might_ be compatible with other versions of Studio one.

## Installation

Clone this repo and place files into `<studio one user data path>/User Devices/Arturia`.
For Studio One 7 On Windows, this "studio one user data path" can usually be reached by going to the location `%AppData%\PreSonus\Studio One 7` in the file explorer.

Now start Studio One and add the device.

## Usage

Make sure the Arturia KeyLab Essentials mk3 MIDI controller is in "DAW" mode.
(Modes can be changed by pressing the "Prog" button.)
In other modes, the MIDI controller will not sent the MIDI events expected by this device definition.

### Buttons

| Button | Functionality |
|--------|---------------|
| Save | Saves the song. |
| Quant | Performs a quantization. |
| Undo | Invokes the "undo" operation. |
| Redo | Invokes the "redo" operation. |
| Loop | Toggles loop mode. (A loop start and end must have been defined in Studio One.) |
| << | Rewind. |
| >> | Forward. |
| Metronome | Toggles the metronome on/off. |
| Stop | Stops the transport. |
| Play | Starts the transport. |
| Record | Starts recording. |
| Tap | Sets the tempo by tapping. |
| Control button 1 (below screen) | - |
| Control button 2 (below screen) | Track arm toggle. |
| Control button 3 (below screen) | Previous track. |
| Control button 4 (below screen) | Next track. |

### Knobs and faders
The knobs and faders are not binded to any controls out of the box.
Assignments for these controls can be set-up in Studio One.

### Pads
Currently, the pads have not been set-up in the device configuration.
In DAW mode, these pads emit MIDI "note on" events.

## Enhancement ideas
Here's a list of ideas for future versions of this device configuration.
I’ve not verified the feasibility of these ideas, in terms of support by the Studio One API for devices.
- Bind pads to the Studio One Launcher.
E.g., use the pads to record/start/stop launcher clips.
- Switch between "modes". E.g., in one mode the knobs and faders control the mixer, in another mode the knobs and faders control some parameters setup by the user in Studio One. 