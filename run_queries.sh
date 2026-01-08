#!/bin/bash
curl http://localhost:9200/daily_temperature/_search -XPOST -H 'Content-Type: application/json' -d '{"aggs":{"2":{"histogram":{"field":"week_number","interval":1,"min_doc_count":1},"aggs":{"1":{"avg":{"field":"t_avg"}}}}}}' > client/src/static/weekly-avg.json
curl http://localhost:9200/daily_temperature/_search -XPOST -H 'Content-Type: application/json' -d '{"aggs":{"2":{"histogram":{"field":"month","interval":1,"min_doc_count":1},"aggs":{"1":{"avg":{"field":"t_avg"}}}}}}' > client/src/static/monthly-avg.json
curl http://localhost:9200/daily_temperature/_search -XPOST -H 'Content-Type: application/json' -d '{"aggs":{"2":{"histogram":{"field":"month","interval":1,"min_doc_count":1},"aggs":{"1":{"avg":{"field":"t_avg"}}}}},"sort":[{"date":{"order":"asc","unmapped_type":"boolean"}}],"query":{"bool":{"must":[{"range":{"date":{"format":"strict_date_optional_time","gte":"2020-12-31T23:00:00.000Z","lte":"now"}}}]}}}' > client/src/static/monthly-temperatures.json
curl http://localhost:9200/daily_temperature/_search -XPOST -H 'Content-Type: application/json' -d '{"size":2000,"sort":[{"date":{"order":"asc","unmapped_type":"boolean"}}],"query":{"bool":{"must":[{"range":{"date":{"format":"strict_date_optional_time","gte":"2020-12-31T23:00:00.000Z","lte":"now"}}}]}}}' > client/src/static/daily-temperatures.json

for year in {2015..2025}
do
  curl -s http://localhost:9200/daily_temperature/_search -XPOST -H 'Content-Type: application/json' -d "{\"size\":400,\"sort\":[{\"date\":{\"order\":\"asc\"}}],\"query\":{\"bool\":{\"must\":[{\"range\":{\"date\":{\"format\":\"dd-MM-yyyy\",\"gte\":\"01-01-$year\",\"lte\":\"31-12-$year\"}}}]}}}" > client/src/static/daily-temperatures-$year.json
  curl -s http://localhost:9200/daily_temperature/_search -XPOST -H 'Content-Type: application/json' -d "{\"aggs\":{\"2\":{\"histogram\":{\"field\":\"month\",\"interval\":1,\"min_doc_count\":1},\"aggs\":{\"1\":{\"avg\":{\"field\":\"t_avg\"}}}}},\"query\":{\"bool\":{\"must\":[{\"range\":{\"date\":{\"format\":\"dd-MM-yyyy\",\"gte\":\"01-01-$year\",\"lte\":\"31-12-$year\"}}}]}}}" > client/src/static/monthly-temperatures-$year.json
done
