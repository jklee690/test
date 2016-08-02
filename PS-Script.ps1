function Extract-Zip
{
  param([string]$zipfilename, [string] $destination)

  if(test-path($zipfilename))
  {  
    $shellApplication = new-object -com shell.application
    $zipPackage = $shellApplication.NameSpace($zipfilename)
    $destinationFolder = $shellApplication.NameSpace($destination)
    $destinationFolder.CopyHere($zipPackage.Items(), 0x14)
  }
}

if(-Not (test-path -path "C:\chef_log") )
{
	write-output "no exist C:\chef_log"
	exit 0
}

New-Item C:\chef_log\log.txt -ItemType file
$logpath = "C:\chef_log\log.txt"


if(-Not (test-path -path "C:\git") )
{
	write-output "no exist C:\git"
	write-output $logpath
	exit 0
}




$tomcatname = Get-Service -DisplayName 'tomcat' -ErrorAction SilentlyContinue | select object-name -ExpandProperty DisplayName 
if($tomcatname -ne 'tomcat')
{
	write-output "no exist tomcat service"
	write-output $logpath
	exit 0

}
else
{
	write-output "tomcat service exist"
	Add-Content $logpath "tomcat service exist"
}


$tomcatStatus = Get-Service -DisplayName "tomcat" | select object-name -ExpandProperty Status

if($tomcatStatus -eq "Running")
{
  Stop-Service -DisplayName "tomcat"
}



$tomcatStatus = Get-Service -DisplayName "tomcat" | Where-Object {$_.Status -eq "Active"} | select object-name -ExpandProperty Status
if($tomcatStatus -eq "Active")
{
	write-output "not enable stop tomcat service"
	Add-Content $logpath  "not enable stop tomcat service"
	exit 0
}

if( test-path "C:\clt\OPUS_FWD_2014\WEB_MAIN\work")
{
    Remove-Item "C:\clt\OPUS_FWD_2014\WEB_MAIN\work" -Recurse
    Write-Output "remove tomcat work directory"
	Add-Content $logpath  "remove tomcat work directory"
}

$curdate = get-date -format yyMMdd

$rename_path = "C:\clt\OPUS_FWD_2014\WEB_MAIN_" + $curdate
$IsDir = test-path $rename_path

if($IsDir)
{
    Remove-Item $rename_path -Recurse
}

Rename-Item "C:\clt\OPUS_FWD_2014\WEB_MAIN" $rename_path



Copy-Item -path "C:\git\WEB_MAIN" -destination "C:\clt\OPUS_FWD_2014" -recurse



if( test-path "C:\clt\OPUS_FWD_2014\WEB_MAIN")
{
    Write-Output "create web_main directory"
	Add-Content $logpath  "create web_main directory"
}
else
{
    Write-Output "not create web_main directory"
	Add-Content $logpath  "not create web_main directory"
    exit 0
}

<#
Extract-Zip C:\git\WEB_MAIN_Patch.zip "C:\git"


$paths = get-childitem -path "c:\git\apps" -recurse | select FullName

foreach($item in $paths)
{
   	$filename = $item.FullName
   	if( $filename -match "(w+)*.js" )
	{
		$destname = $filename.Replace("C:\git", "C:\clt\OPUS_FWD_2014\WEB_MAIN")
        $destname = $destname.Replace("c:\git", "c:\clt\OPUS_FWD_2014\WEB_MAIN")
        
		Copy-Item $filename $destname -force 	
	}
}#>


Start-Service -DisplayName "tomcat"
$tomcatStatus = Get-Service -DisplayName "tomcat" | Where-Object {$_.Status -eq "Active"} | select object-name -ExpandProperty Status
if($tomcatStatus -eq "Stopped")
{
	write-output "not enable Active tomcat service"
	
}


