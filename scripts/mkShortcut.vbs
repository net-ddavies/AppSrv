Set Shell = CreateObject("WScript.Shell")
userProf = Shell.ExpandEnvironmentStrings("%UserPROFILE%")
' "\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"
startUpPath = Shell.SpecialFolders("Startup")
linkPath = startUpPath & "\AppSrvStart.lnk"
Set link = Shell.CreateShortcut(linkPath)
' link.Arguments = ""
link.Description = "Automaticly start the AppSrv application service upon log in."
' link.HotKey = "CTRL+ALT+SHIFT+X"
' link.IconLocation = "app.exe,1"
link.TargetPath = userProf & "\src\js\AppSrv\scripts\AppSrvStart.vbs"
link.WindowStyle = 3
link.WorkingDirectory = userProf & "\src\js\AppSrv"
link.Save
WScript.Echo "Created automatic start up shortcut."
WScript.Echo "Shortcut path: " & linkPath
WScript.Echo "Target path: " & link.TargetPath
WScript.Echo "Working directory: " & link.WorkingDirectory

' Ends here.
