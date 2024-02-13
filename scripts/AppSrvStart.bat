@echo off

@echo off

set locase=for /L %%n in (1 1 2) do if %%n==2 ( for %%# in (a b c d e f g h i j k l m n o p q r s t u v w x y z) do set "result=!result:%%#=%%#!") ELSE setlocal enableDelayedExpansion ^& set result=

set "string=%COMPUTERNAME%"
%locase%%string%

PFRAG=\src\js
cd %USERPROFILE%%PFRAG%\AppSrv
>AppSrv.log (
  echo Starting AppSrv on %result% in directory %PWD%
  call scripts\doStart.bat %result%
)

rem Ends here.
