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

$tomcatname = Get-Service -name "tomcat8" -ErrorAction SilentlyContinue | select object-name -ExpandProperty Name 
if($tomcatname -ne "tomcat8")
{
		$tomcatname = Get-Service -name "tomcat7" -ErrorAction SilentlyContinue | select object-name -ExpandProperty Name 
		if($tomcatname -ne "tomcat7")
		{
			write-output "no tomcat7 and tomcat 8 service"
			exit 0
		}
}

$tomcatStatus = Get-Service -name $tomcatname | select object-name -ExpandProperty Status

if($tomcatStatus -eq "Running")
{
  Stop-Service $tomcatname
}

$tomcatStatus = Get-Service -name $tomcatname | Where-Object {$_.Status -eq "Active"} | select object-name -ExpandProperty Status
if($tomcatStatus -eq "Active")
{
	write-output "not enable stop tomcat7 and tomcat 8 service"
	exit 0
}
$curdate = get-date -format yyMMdd

$rename_path = "C:\clt\OPUS_FWD_2014\WEB_MAIN_" + $curdate
$IsDir = test-path $rename_path

if($IsDir)
{
    Remove-Item $rename_path -Recurse
}


Rename-Item "C:\clt\OPUS_FWD_2014\WEB_MAIN" $rename_path

if($tomcatname -eq "tomcat8")
{
 if( test-path "C:\clt\Server\Tomcat 8.0\work")
 {
    Remove-Item "C:\clt\Server\Tomcat 8.0\work" -Recurse
    Write-Output "remove tomcat8 work directory"
  }
}
else
{
   if( test-path "C:\clt\Server\Tomcat 7.0\work")
   {
     Remove-Item "C:\clt\Server\Tomcat 7.0\work" -Recurse
     Write-Output "remove tomcat7 work directory"
   }
}


Extract-Zip C:\git\WEB_MAIN.zip "C:\clt\OPUS_FWD_2014"

if( test-path "C:\clt\OPUS_FWD_2014\WEB_MAIN")
{
    Write-Output "create web_main directory"
}
else
{
    Write-Output "not create web_main directory"
}

Start-Service $tomcatname
$tomcatStatus = Get-Service -name $tomcatname | Where-Object {$_.Status -eq "Active"} | select object-name -ExpandProperty Status
if($tomcatStatus -eq "Stopped")
{
	write-output "not enable Active tomcat7 and tomcat 8 service"
	exit 0
}