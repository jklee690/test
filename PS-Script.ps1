function Extract-Zip
{
  param([string]$zipfilename, [string] $destination)

  if(test-path($zipfilename))
  {  
    $shellApplication = new-object -com shell.application
    $zipPackage = $shellApplication.NameSpace($zipfilename)
    $destinationFolder = $shellApplication.NameSpace($destination)
    $destinationFolder.CopyHere($zipPackage.Items())
  }
}

Stop-Service tomcat8

Rename-Item C:\WEB_MAIN C:\WEB_MAIN_Today

Remove-Item C:\tomcat_work

New-Item C:\WEB_MAIN -type directory

Extract-Zip C:\git\WEB_MAIN.zip C:\WEB_MAIN

Start-Service tomcat8