$dataSource = ".\SQLEXPRESS"
$user = "sa"
$pwd = "qwer123$"
$database = "test"
$connectionString = "Server=$dataSource;uid=$user; pwd=$pwd;Database=$database;Integrated Security=False;"

$query = "create table customer(name nvarchar(10), age nvarchar(10) )"

$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString
#$connection.ConnectionString = "Server=$dataSource;Database=$database;Integrated Security=True;"
$connection.Open()
$command = $connection.CreateCommand()
$command.CommandText = $query

$command.ExecuteNonQuery()


$connection.Close()