# MultiColumnIndex
- - - 
PostgreSQL 은 한 개의 테이블에서 한 개의 인덱스 밖에 타지 않는다.

```sql
EXPLAIN UPDATE gis.photo AS a
SET jm_code = b.jm_code
    , jm_name = b.jm_name
    , pnu = b.pnu
FROM gis.cadastral AS b
WHERE a.pt_count = 1
AND a.pt_year = 2022
AND b.year = 2022
AND ST_isvalid(a.geom) = 't'
AND ST_isvalid(b.geom) = 't'
AND ST_Contains(b.geom, ST_Centroid(a.geom));
```

```
Update on photo a  (cost=0.86..93.31 rows=1 width=325)
  ->  Nested Loop  (cost=0.86..93.31 rows=1 width=325)
        Join Filter: st_contains(b.geom, st_centroid(a.geom))
        ->  Index Scan using gis_photo_pt_year_idx on photo a  (cost=0.43..33.46 rows=1 width=290)
              Index Cond: (pt_year = 2022)
              Filter: ((pt_count = 1) AND st_isvalid(geom))
        ->  Index Scan using cadastral_year_idx on cadastral b  (cost=0.43..32.35 rows=1 width=308)
              Index Cond: (year = 2022)
              Filter: st_isvalid(geom)
```

photo 테이블의 인덱스
```sql
select * from pg_indexes where tablename = 'photo';
```

```sql
CREATE INDEX gis_photo_test_idx ON gis.photo USING gist (st_centroid(geom))
CREATE INDEX gis_photo_pt_count_idx ON gis.photo USING btree (pt_count)
CREATE INDEX gis_photo_pt_year_idx ON gis.photo USING btree (pt_year)
CREATE INDEX gis_photo_pt_code_idx ON gis.photo USING btree (pt_code)
CREATE INDEX gis_photo_geom_idx ON gis.photo USING gist (geom)
```