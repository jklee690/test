$dataSource = "(local)"
$user = "opus_fms"
$pwd = "fms"
$database = "demofwdv401_test"
$connectionString = "Server=$dataSource;uid=$user; pwd=$pwd;Database=$database;Integrated Security=False;"

$query = get-content "c:\git\Patch_Sql.sql"

$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString
#$connection.ConnectionString = "Server=$dataSource;Database=$database;Integrated Security=True;"
$connection.Open()
$command = $connection.CreateCommand()

 $ScriptList = [regex]::Split($query, '\bGO')

foreach ($sql in $ScriptList)
{
        
		$sql.Trim()
		
		if($sql){		
		
			$command.CommandText = $sql
			$command.ExecuteNonQuery()
			Write-Output $sql

			Write-Output 'SQL commit'
		}

}


$connection.Close()