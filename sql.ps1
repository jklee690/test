$dataSource = "(local)"
$user = "opus_fms"
$pwd = "fms"
$database = "demofwdv401_test"
$connectionString = "Server=$dataSource;uid=$user; pwd=$pwd;Database=$database;Integrated Security=False;"

$query = get-content "c:\git\Patch.sql"

$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString
#$connection.ConnectionString = "Server=$dataSource;Database=$database;Integrated Security=True;"
$connection.Open()
$command = $connection.CreateCommand()
$command.CommandText = $query

$command.ExecuteNonQuery()


$connection.Close()