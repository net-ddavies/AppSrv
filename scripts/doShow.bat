@echo off
rem NB: This SET command does not seem to work unless it's at top level.
set /p TPID=<"%USERPROFILE%\src\js\AppSrv\AppSrv.pid"
if exist "%USERPROFILE%\src\js\AppSrv\AppSrv.pid" (
   echo Found AppSrv.pid PID file.  TASKLIST  output filtered on PID %TPID% is:
   tasklist /fi "pid eq %TPID%" /nh
) else (
   echo Did not find AppSrv.pid PID file.
   echo TASKLIST  output filtered on IMAGENAME node.xeis:
   tasklist /fi "imagename eq node.exe" /nh
)

rem Ends here.

