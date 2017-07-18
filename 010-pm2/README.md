# PM2 Samples.

## How to installl
```
$ npm install -g pm2
```

## Reference
* [http://pm2.keymetrics.io/](http://pm2.keymetrics.io/)
* [docs/usage/quick-start](http://pm2.keymetrics.io/docs/usage/quick-start/)

## Basic Usages
```
# 起動（フォークモード）
# pm2 start "スクリプト名" --name "名前"
$ pm2 start app.js --name myapp

# 起動（クラスターモード）
$ pm2 start app.js -i 0 --name myapp
[PM2] Starting /Users/munesadayohei/git/node-playground/010-pm2/app.js in cluster_mode (0 instance)
[PM2] Done.
┌──────────┬────┬─────────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────────┐
│ App name │ id │ mode    │ pid   │ status │ restart │ uptime │ cpu │ mem       │ watching │
├──────────┼────┼─────────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────────┤
│ myapp    │ 0  │ cluster │ 36145 │ online │ 0       │ 0s     │ 27% │ 27.2 MB   │ disabled │
│ myapp    │ 1  │ cluster │ 36146 │ online │ 0       │ 0s     │ 25% │ 27.0 MB   │ disabled │
│ myapp    │ 2  │ cluster │ 36147 │ online │ 0       │ 0s     │ 29% │ 26.6 MB   │ disabled │
│ myapp    │ 3  │ cluster │ 36148 │ online │ 0       │ 0s     │ 27% │ 27.3 MB   │ disabled │
└──────────┴────┴─────────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────────┘

# List
$ pm2 list

# Detail
$ pm2 describe myapp

# Monitoring.
$ pm2 monit

# 停止
$ pm2 stop myapp

# 再起動
$ pm2 restart myapp

# 削除
$ pm2 delete myapp

# ログの確認
$ pm2 logs myapp
[TAILING] Tailing last 15 lines for [myapp] process (change the value with --lines option)
/Users/munesadayohei/.pm2/logs/myapp-error-0.log last 15 lines:
/Users/munesadayohei/.pm2/logs/myapp-out-1.log last 15 lines:
1|myapp    | Express app starts, linstening port on 3000.

/Users/munesadayohei/.pm2/logs/myapp-error-1.log last 15 lines:
/Users/munesadayohei/.pm2/logs/myapp-out-2.log last 15 lines:
2|myapp    | Express app starts, linstening port on 3000.

/Users/munesadayohei/.pm2/logs/myapp-error-2.log last 15 lines:
/Users/munesadayohei/.pm2/logs/myapp-out-3.log last 15 lines:
3|myapp    | Express app starts, linstening port on 3000.

/Users/munesadayohei/.pm2/logs/myapp-error-3.log last 15 lines:
/Users/munesadayohei/.pm2/logs/myapp-out-0.log last 15 lines:
0|myapp    | Express app starts, linstening port on 3000.
0|myapp    | Express app starts, linstening port on 3000.
0|myapp    | Express app starts, linstening port on 3000.

[STREAMING] Now streaming realtime logs for [myapp] process

$ pm2 start app.js --name myapp --log-date-format "YYYY-MM-DD HH:mm Z"    # Log will be prefixed with custom time format
```

## 設定ファイルを用いた起動
### yamlで定義
```
name: myapp
script: app.js
exec_mode: "cluster"
instances: 0
log-date-format: "YYYY-MM-DD HH:mm Z"
```
### JSONで定義
```

```
### 起動方法
```
$ pm2 start pm2config.yml 
[PM2] Applying action restartProcessId on app [myapp](ids: 0)
[PM2] [myapp](0) ✓
┌──────────┬────┬─────────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────────┐
│ App name │ id │ mode    │ pid   │ status │ restart │ uptime │ cpu │ mem       │ watching │
├──────────┼────┼─────────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────────┤
│ myapp    │ 0  │ cluster │ 37309 │ online │ 1       │ 0s     │ 16% │ 25.5 MB   │ disabled │
└──────────┴────┴─────────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
 ```

 ## 環境変数の指定
 ```
$ pm2 start pm2config.json
$ pm2 start pm2config.json --env production

$ pm2 logs
3|myapp    | NODE_NEV: production
3|myapp    | SECRET_KEY: my-production-secret
3|myapp    | Express app starts, linstening port on 3000.
 ```