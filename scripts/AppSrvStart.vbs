' This works better as a startup shortcut target than just targeting AppSrvStart.bat
' because it does not cause visible side effects on the desktop.
Set oShell = CreateObject ("Wscript.Shell")
Dim strArgs
' NB: The startup shortcut working directory is the installation root dir, not the scripts dir.
strArgs = "cmd /c ""%USERPROFILE%\src\js\AppSrv\scripts\AppSrvStart.bat"""
oShell.Run strArgs, 0, false

' Ends here.
