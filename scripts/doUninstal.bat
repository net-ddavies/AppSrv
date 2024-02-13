@echo off

call %USERPROFILE%\src\js\AppSrv\scripts\doStop.bat
call %USERPROFILE%\src\js\AppSrv\scripts\rmShortcut.bat
if exist ".\scripts" (
   rem    ren AppSrv AppSrv_PREVIOUS
   echo Left you in AppSrv install directory, you might want to rename or delete this to avoid confusion, just make sure you haven't changed anything you can't get back.
) else (
  echo "Left your installation directory in src/js/AppSrv, you might want to rename or delete that to avoid confusion, just make sure you haven't changed anything you can't get back.
)
rem Ends here.


