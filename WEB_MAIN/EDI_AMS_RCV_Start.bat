echo off

rem Find current directory.

SET CURR_PATH=%cd%
set classpath=.
set classpath=%classpath%;WEB-INF\classes
set classpath=%classpath%;WEB-INF\lib\commons-net-3.1.jar
set classpath=%classpath%;WEB-INF\lib\log4j-1.2.13.jar
set classpath=%classpath%;WEB-INF\lib\sqljdbc4.jar
set classpath=%classpath%;WEB-INF\lib\jakarta-oro-2.0.3.jar
set classpath=%classpath%;WEB-INF\lib\ibatis-2.3.0.677.jar

cd C:\clt\OPUS_FWD_2014\WEB_MAIN
"%JAVA_HOME%\bin\java" -cp %classpath% com.clt.apps.fis.edi.ams.sea.basic.EdiAmsSeaReceive %1

rem Move to root folder
