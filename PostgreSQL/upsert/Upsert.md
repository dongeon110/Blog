# Upsert
postgres upsert query
```sql
INSERT INTO table_name (column_name1, column_name2, column_name3)
VALUES (value1, value2, value3), (value2, value3, value4)
ON CONFLICT (column_name1)
DO UPDATE SET
column_name2 = EXCLUDED.column_name2,
column_name3 = EXCLUDED.column_name3
```