//
const getWindowsShortcutProperties = require('get-windows-shortcut-properties');

if (process.platform === 'win32') {
    //const fPath = "%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\AppSrvStart.lnk"
    //const fPath = '/cygdrive/c/Users/Raquel/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/AppSrvStart.lnk';
    const fPath = "C:\\Users\\Raquel\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\AppSrvStart.lnk"
    console.log("fPath is: " + fPath);
    const output = getWindowsShortcutProperties.sync(fPath);
    if (output) {
        console.log(output);
    }
    else {
        console.log('There was an error');
    }
}
