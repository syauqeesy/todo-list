until mysqladmin ping -h localhost --silent; do
  sleep 2
done

mysql -u root -D todo_list -e "SOURCE /scripts/init.sql"
