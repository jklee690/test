echo off

rem Find current directory.

SET CURR_PATH=%cd%
set classpath=.
set classpath=%classpath%;WEB-INF\classes
set classpath=%classpath%;WEB-INF\lib\commons-net-3.1.jar
set classpath=%classpath%;WEB-INF\lib\log4j-1.2.13.jar
set classpath=%classpath%;WEB-INF\lib\sqljdbc4.jar
set classpath=%classpath%;WEB-INF\lib\jakarta-oro-2.0.3.jar
set classpath=%classpath%;WEB-INF\lib\commons-io-1.3.1.jar


cd C:\clt\OPUS_FWD_2014\WEB_MAIN

"%JAVA_HOME%\bin\java" -cp %classpath%  com.clt.apps.fis.edi.isf.sei.receive.EdiIsfSeiReceive %1

"%JAVA_HOME%\bin\java" -cp %classpath%  com.clt.apps.fis.edi.ams.sea.basic.EdiAmsSeaReceive %1

"%JAVA_HOME%\bin\java" -cp %classpath%  com.clt.apps.fis.edi.ams.sea.basic.EdiAmsSeaBlockProcess %1

rem Move to root folder
