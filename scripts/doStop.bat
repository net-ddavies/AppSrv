@echo off
set /p TPID=<AppSrv.pid
if [%TPID%] == [] (
     echo No process Id could be found, AppSrv does not appear to be running.
) else (
   echo Killing process %TPID%
   taskkill /f /pid %TPID%
   del AppSrv.pid
)
rem Ends here.
